export interface ResumeProfile {
  email: string;
  name: string;
  phone: string;
  url: string;
  location: string;
  summary: string;
}

export interface ResumeWorkExperience {
  company: string;
  jobTitle: string;
  startDate: string;
  description: string[];
}

export interface ResumeEducation {
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string[];
  gpa: string;
}

export interface ResumeProject {
  project: string;
  date: string;
  description: string[];
}

export interface ResumeSkills {
  featuredSkills: FeaturedSkill[];
  description: string[];
}

export interface FeaturedSkill {
  featuerdSkills: FeaturedSkill[];
  rating: string;
  description?: string[];
}

export interface ResumeCustom {
  description: string[];
}

export interface Resume {
  profile: ResumeProfile;
  workExperiences: ResumeWorkExperience[];
  education: ResumeEducation[];
  projects: ResumeProject[];
  sills: ResumeSkills;
  custom: ResumeCustom;
}

export type ResumeKey = keyof Resume;
