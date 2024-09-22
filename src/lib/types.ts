

export interface Skill {
    [key: string]: string;
  }
  
export type SkillCategories = 'Languages' | 'Frameworks/ Libraries' | 'Developer Tools' | 'Other';
  
export type SkillsArray = {
    [K in SkillCategories]: string;
  }[];
  
  
export interface Education {
    institution: string;
    degree: string;
    date: string;
    description?: string;
  }
  
export interface WorkExperience {
    company: string;
    position: string;
    date: string;
    description: string;
    accomplishments: string[];
  }
  
export interface Project {
    name: string;
    description: string;
    accomplishments: string[];
    technologies: string[];
    url?: string;
  }
  
export interface Resume {
    collectionId: string;
    collectionName: string;
    created: string;
    education_history: Education[];
    user: string; 
    id: string;
    name: string;
    projects: Project[];
    resume_name: string;
    skills: Skill[];
    updated: string;
    work_history: WorkExperience[];
  }

  export interface UserProfile {

    id: string;
    collectionId: string;
    collectionName: string;

    username: string;
    verified: boolean;
    emailVisibility: boolean;
    email: string;
    created: string;
    updated: string;
    first_name: string;
    last_name: string;
    avatar: string;
    user: string[];
    skills: string;
    work_history: string[];
    education_history: string[];
    projects: string[];
    Linkedin?: string;
    Github?: string;
    Portfolio?: string;
  }

  export interface AuthError {
    type: string;
    message: string;
  }