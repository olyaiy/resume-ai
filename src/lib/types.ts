

export interface Skill {
    name: string;
  }
  
export interface Education {
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    description?: string;
  }
  
export interface WorkExperience {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }
  
export interface Project {
    name: string;
    description: string;
    technologies: string[];
    url?: string;
  }
  
export interface Resume {
    collectionId: string;
    collectionName: string;
    created: string;
    education_history: Education[];
    field: string; // Assuming this is still a relation record ID
    id: string;
    name: string;
    projects: Project[];
    resume_name: string;
    skills: Skill[];
    updated: string;
    work_history: WorkExperience[];
  }