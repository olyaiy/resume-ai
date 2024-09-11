

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
    id: string;
    collectionId: string;
    collectionName: string;
    created: string;
    updated: string;
    name: string;
    skills: Skill[];
    education_history: Education[];
    work_history: WorkExperience[];
    projects: Project[];
    field: string; // Assuming this is still a relation record ID
    resume_name: string;
  }