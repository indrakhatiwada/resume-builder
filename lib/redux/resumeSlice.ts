import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  FeaturedSkill,
  Resume,
  ResumeCustom,
  ResumeEducation,
  ResumeProfile,
  ResumeProject,
  ResumeSkills,
  ResumeWorkExperience,
} from "./types";

export const initialProfile: ResumeProfile = {
  name: "John Doe",
  email: "",
  phone: "",
  location: "",
  summary: "",
  url: "",
};

export const initialWorkexperience: ResumeWorkExperience = {
  company: "",
  description: [],
  jobTitle: "",
  startDate: "",
};

export const initialEducation: ResumeEducation = {
  degree: "",
  description: [],
  endDate: "",
  gpa: "",
  school: "",
  startDate: "",
};

export const initalProject: ResumeProject = {
  date: "",
  description: [],
  project: "",
};

export const initialFeaturedSkill: FeaturedSkill = {
  description: [],
  featuerdSkills: [],
  rating: "4",
};

export const initialFeaturedSkills: FeaturedSkill[] = Array(6).fill({
  ...initialFeaturedSkill,
});

export const initialSkills: ResumeSkills = {
  featuredSkills: initialFeaturedSkills,
  description: [],
};

export const initialCustom: ResumeCustom = {
  description: [],
};

export const initialResumeState: Resume = {
  profile: initialProfile,
  workExperiences: [initialWorkexperience],
  education: [initialEducation],
  projects: [initalProject],
  sills: initialSkills,
  custom: initialCustom,
};


export type createChangeActionWithDescription <T>
 = {
    index: number

 } & [
    field: Exclude<keyof T, "description">;
    value: string

 ] | {
    field: "description";
    value: string[];
 }
    
 
//resume Slice

export const resumeSlice = createSlice({
  name: "resume",
  initialState: initialResumeState,
  reducers: {
    changeProfile: (
      draft,
      action: PayloadAction<{ field: keyof ResumeProfile; value: string }>
    ) => {
      const { field, value } = action.payload;
      draft.profile[field] = value;
    },
    
  },
});
