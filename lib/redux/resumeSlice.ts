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
import { ShowForm } from "./settingsSlice";
import { RootState } from "./store";

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
  descriptions: [],
  jobTitle: "",
  startDate: "",
};

export const initialEducation: ResumeEducation = {
  degree: "",
  descriptions: [],
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
  skill: "",
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
  educations: [initialEducation],
  projects: [initalProject],
  skills: initialSkills,
  custom: initialCustom,
};

export type CreateChangeActionWithDescriptions<T> = {
  index: number;
} & (
  | {
      field: Exclude<keyof T, "descriptions">;
      value: string;
    }
  | {
      field: "descriptions";
      value: string[];
    }
);

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
    changeWorkExperiences: (
      draft,
      action: PayloadAction<
        CreateChangeActionWithDescriptions<ResumeWorkExperience>
      >
    ) => {
      const { index, field, value } = action.payload;
      const workExperience = draft.workExperiences[index];
      workExperience[field] = value as any;
    },
    changeEducations: (
      draft,
      action: PayloadAction<CreateChangeActionWithDescriptions<ResumeEducation>>
    ) => {
      const { index, field, value } = action.payload;
      const education = draft.educations[index];
      education[field] = value as any;
    },
    changeSkills: (
      draft,
      action: PayloadAction<
        | { field: "descriptions"; value: string[] }
        | {
            field: "featuredSkills";
            index: number;
            skill: string;
            rating: string;
          }
      >
    ) => {
      const { field } = action.payload;
      if (field === "descriptions") {
        const { value } = action.payload;
        draft.skills.description = value;
      } else {
        const { index, skill, rating } = action.payload;
        const featuredSkill = draft.skills.featuredSkills[index];
        featuredSkill.skill = skill;
        featuredSkill.rating = rating;
      }
    },

    changeCustom: (
      draft,
      action: PayloadAction<{ field: "descriptions"; value: string[] }>
    ) => {
      const { value } = action.payload;
      draft.custom.description = value;
    },
    addSectionInForm: (draft, action: PayloadAction<{ form: ShowForm }>) => {
      const { form } = action.payload;
      switch (form) {
        case "workExperiences": {
          draft.workExperiences.push(structuredClone(initialWorkexperience));
          return draft;
        }
        case "educations": {
          draft.educations.push(structuredClone(initialEducation));
          return draft;
        }
        case "projects": {
          draft.projects.push(structuredClone(initalProject));
          return draft;
        }
      }
    },
    moveSectionInForm: (
      draft,
      action: PayloadAction<{
        form: ShowForm;
        index: number;
        direction: "up" | "down";
      }>
    ) => {
      const { form, index, direction } = action.payload;
      if (form !== "skills" && form !== "custom") {
        if (
          (index === 0 && direction === "up") ||
          (index === draft[form].length - 1 && direction === "down")
        ) {
          const section = draft[form][index];
          if (direction === "up") {
            draft[form][index] = draft[form][index - 1];
            draft[form][index - 1] = section;
          } else {
            draft[form][index] = draft[form][index + 1];
            draft[form][index + 1] = section;
          }
        }
      }
    },

    deleteSectionInFormByIndex: (
      draft,
      action: PayloadAction<{ form: ShowForm; index: number }>
    ) => {
      const { form, index } = action.payload;
      if (form !== "skills" && form !== "custom") {
        draft[form].splice(index, 1);
      }
    },
    setResume: (draft, action: PayloadAction<Resume>) => {
      return action.payload;
    },
  },
});

export const {
  changeCustom,
  changeEducations,
  changeProfile,
  changeSkills,
  changeWorkExperiences,
  deleteSectionInFormByIndex,
  moveSectionInForm,
  addSectionInForm,
  setResume,
} = resumeSlice.actions;

export const selectResume = (state: RootState) => state.resume;
export const selectProfile = (state: RootState) => state.resume.profile;
export const selectWorkExperiences = (state: RootState) =>
  state.resume.workExperiences;
export const selectEducations = (state: RootState) => state.resume.educations;
export const selectProjects = (state: RootState) => state.resume.projects;
export const selectSkills = (state: RootState) => state.resume.skills;
export const selectCustom = (state: RootState) => state.resume.custom;

export default resumeSlice.reducer;