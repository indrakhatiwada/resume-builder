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
  descriptions: string[];
}

export interface ResumeEducation {
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  descriptions: string[];
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
  skill: string;
  rating: string;
}

export interface ResumeCustom {
  description: string[];
}

export interface Resume {
  profile: ResumeProfile;
  workExperiences: ResumeWorkExperience[];
  educations: ResumeEducation[];
  projects: ResumeProject[];
  skills: ResumeSkills;
  custom: ResumeCustom;
}

export type ResumeKey = keyof Resume;
