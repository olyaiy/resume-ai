-- Enable UUID extension
create extension if not exists "uuid-ossp" with schema extensions;

-- Create updated_at trigger function
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$;

-- Create jobs table
create table public.jobs (
    id uuid not null default extensions.uuid_generate_v4(),
    company_name text not null,
    position_title text not null,
    job_url text null,
    description text null,
    location text null,
    salary_range text null,
    created_at timestamp with time zone not null default timezone('utc'::text, now()),
    updated_at timestamp with time zone not null default timezone('utc'::text, now()),
    keywords text[] null default array[]::text[],
    work_location text null,
    employment_type text null,
    is_active boolean not null default true,
    user_id uuid not null,
    constraint jobs_pkey primary key (id),
    constraint jobs_user_id_fkey foreign key (user_id) references auth.users(id) on update cascade on delete cascade,
    constraint jobs_employment_type_check check (
        employment_type = any (array['full_time'::text, 'part_time'::text, 'co_op'::text, 'internship'::text, 'contract'::text])
    ),
    constraint jobs_work_location_check check (
        work_location = any (array['remote'::text, 'in_person'::text, 'hybrid'::text])
    )
);

-- Create jobs updated_at trigger
create trigger update_jobs_updated_at
    before update on jobs
    for each row
    execute function update_updated_at_column();

-- Create profiles table
create table public.profiles (
    user_id uuid not null,
    first_name text null,
    last_name text null,
    email text null,
    created_at timestamp with time zone not null default timezone('utc'::text, now()),
    updated_at timestamp with time zone not null default timezone('utc'::text, now()),
    phone_number text null,
    location text null,
    website text null,
    linkedin_url text null,
    github_url text null,
    work_experience jsonb null default '[]'::jsonb,
    education jsonb null default '[]'::jsonb,
    skills jsonb null default '[]'::jsonb,
    projects jsonb null default '[]'::jsonb,
    certifications jsonb null default '[]'::jsonb,
    constraint profiles_pkey primary key (user_id),
    constraint profiles_user_id_key unique (user_id),
    constraint profiles_user_id_fkey foreign key (user_id) references auth.users(id) on update cascade on delete cascade
);

-- Create profiles updated_at trigger
create trigger update_profiles_updated_at
    before update on profiles
    for each row
    execute function update_updated_at_column();

-- Create resumes table
create table public.resumes (
    id uuid not null default extensions.uuid_generate_v4(),
    user_id uuid not null,
    job_id uuid null,
    is_base_resume boolean null default false,
    name text not null,
    first_name text null,
    last_name text null,
    email text null,
    phone_number text null,
    location text null,
    website text null,
    linkedin_url text null,
    github_url text null,
    professional_summary text null,
    work_experience jsonb null default '[]'::jsonb,
    education jsonb null default '[]'::jsonb,
    skills jsonb null default '[]'::jsonb,
    projects jsonb null default '[]'::jsonb,
    certifications jsonb null default '[]'::jsonb,
    section_order jsonb null default '["professional_summary", "work_experience", "skills", "projects", "education", "certifications"]'::jsonb,
    section_configs jsonb null default '{
        "skills": {"style": "grouped", "visible": true},
        "projects": {"visible": true, "max_items": 3},
        "education": {"visible": true, "max_items": null},
        "certifications": {"visible": true},
        "work_experience": {"visible": true, "max_items": null}
    }'::jsonb,
    created_at timestamp with time zone not null default timezone('utc'::text, now()),
    updated_at timestamp with time zone not null default timezone('utc'::text, now()),
    resume_title text null,
    target_role text null,
    document_settings jsonb null default '{
        "header_name_size": 24,
        "skills_margin_top": 2,
        "document_font_size": 10,
        "projects_margin_top": 2,
        "skills_item_spacing": 2,
        "document_line_height": 1.5,
        "education_margin_top": 2,
        "skills_margin_bottom": 2,
        "experience_margin_top": 2,
        "projects_item_spacing": 4,
        "education_item_spacing": 4,
        "projects_margin_bottom": 2,
        "education_margin_bottom": 2,
        "experience_item_spacing": 4,
        "document_margin_vertical": 36,
        "experience_margin_bottom": 2,
        "skills_margin_horizontal": 0,
        "document_margin_horizontal": 36,
        "header_name_bottom_spacing": 24,
        "projects_margin_horizontal": 0,
        "education_margin_horizontal": 0,
        "experience_margin_horizontal": 0
    }'::jsonb,
    has_cover_letter boolean not null default false,
    cover_letter jsonb null,
    constraint resumes_pkey primary key (id),
    constraint resumes_job_id_fkey foreign key (job_id) references jobs(id) on update cascade on delete cascade,
    constraint resumes_user_id_fkey foreign key (user_id) references auth.users(id) on update cascade on delete cascade
);

-- Create resumes updated_at trigger
create trigger update_resumes_updated_at
    before update on resumes
    for each row
    execute function update_updated_at_column();
