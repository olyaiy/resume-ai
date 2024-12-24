export interface WorkExperience {
  company: string;
  position: string;
  location: string;
  start_date: string;
  end_date: string | null;
  current: boolean;
  description: string[];
  technologies?: string[];
}

export interface Education {
  school: string;
  degree: string;
  field: string;
  location: string;
  start_date: string;
  end_date: string | null;
  current: boolean;
  gpa?: number;
  achievements?: string[];
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github_url?: string;
  start_date: string;
  end_date: string | null;
  highlights: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date_acquired: string;
  expiry_date?: string;
  credential_id?: string;
  url?: string;
}

export interface Job {
  id: string;
  user_id: string;
  company_name: string;
  position_title: string;
  job_url?: string;
  description?: string;
  location?: string;
  salary_range?: {
    min?: number;
    max?: number;
    currency?: string;
  };
  status: 'active' | 'applied' | 'interviewing' | 'offered' | 'rejected' | 'archived';
  requirements?: string[];
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface SectionConfig {
  visible: boolean;
  max_items?: number | null;
  style?: 'grouped' | 'list' | 'grid';
}

export interface Resume {
  id: string;
  user_id: string;
  job_id?: string;
  is_base_resume: boolean;
  name: string;
  
  // Basic Information
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  location?: string;
  website?: string;
  linkedin_url?: string;
  github_url?: string;
  professional_summary?: string;
  
  // Complex fields
  work_experience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  
  // Section ordering and configuration
  section_order: string[];
  section_configs: {
    [key: string]: SectionConfig;
  };
  
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone_number: string | null;
  location: string | null;
  website: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  professional_summary: string | null;
  work_experience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  created_at: string;
  updated_at: string;
}