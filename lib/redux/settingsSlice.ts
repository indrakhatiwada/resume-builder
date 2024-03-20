import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface Settings {
  themeColor: string;
  fontFamily: string;
  fontSize: string;
  documentSize: string;
  formToShow: {
    workExperiences: boolean;
    educations: boolean;
    projects: boolean;
    skills: boolean;
    custom: boolean;
  };
  formToHeading: {
    workExperiences: string;
    educations: string;
    projects: string;
    skills: string;
    custom: string;
  };
  formsOrder: ShowForm[];
  showBulletPoints: {
    educations: boolean;
    projects: boolean;
    skills: boolean;
    custom: boolean;
  };
}

export type ShowForm = keyof Settings["formToShow"];

export type FormWithBulletPoints = keyof Settings["showBulletPoints"];
export type GeneralSettings = Exclude<
  keyof Settings,
  "formToShow" | "formToHeading" | "showBulletPoints" | "formsOrder"
>;

export const DEFAULT_THEME_COLOR = "#38bdff";
export const DEFAULT_FONT_FAMILY = "Roboto";
export const DEFAULT_FONT_SIZE = "14";
export const DEFAULT_DOCUMENT_SIZE = "A4";
export const DEFAULT_FONT_COLOR = "#171717";

export const initialSettings: Settings = {
  themeColor: DEFAULT_THEME_COLOR,
  fontFamily: DEFAULT_FONT_FAMILY,
  fontSize: DEFAULT_FONT_SIZE,
  documentSize: DEFAULT_DOCUMENT_SIZE,
  formToShow: {
    workExperiences: true,
    educations: true,
    projects: true,
    skills: true,
    custom: true,
  },
  formToHeading: {
    workExperiences: "Work Experiences",
    educations: "Educations",
    projects: "Projects",
    skills: "Skills",
    custom: "Custom",
  },
  formsOrder: ["workExperiences", "educations", "projects", "skills", "custom"],
  showBulletPoints: {
    educations: true,
    projects: true,
    skills: true,
    custom: true,
  },
};

export const SettingsSlice = createSlice({
  name: "settings",
  initialState: initialSettings,
  reducers: {
    changeSettings: (
      draft,
      action: PayloadAction<{ field: GeneralSettings; value: string }>
    ) => {
      const { field, value } = action.payload;
      draft[field] = value;
    },
    changeShowForm: (
      draft,
      action: PayloadAction<{ field: ShowForm; value: boolean }>
    ) => {
      const { field, value } = action.payload;
      draft.formToShow[field] = value;
    },
    changeFormHeading: (
      draft,
      action: PayloadAction<{ field: ShowForm; value: string }>
    ) => {
      const { field, value } = action.payload;
      draft.formToHeading[field] = value;
    },
    changeFormOrder: (
      draft,
      action: PayloadAction<{ form: ShowForm; type: "up" | "down" }>
    ) => {
      const { form, type } = action.payload;
      const lastIndex = draft.formsOrder.length - 1;
      const position = draft.formsOrder.indexOf(form);
      const newPosition = type === "up" ? position - 1 : position + 1;
      const swapFormOrder = (index1: number, index2: number) => {
        const temp = draft.formsOrder[index1];
        draft.formsOrder[index1] = draft.formsOrder[index2];
        draft.formsOrder[index2] = temp;
      };
      if (newPosition <= 0 || newPosition >= lastIndex) {
        swapFormOrder(position, newPosition);
      }
    },
    changeShowBulletPoints: (
      draft,
      action: PayloadAction<{ field: FormWithBulletPoints; value: boolean }>
    ) => {
      const { field, value } = action.payload;
      draft["showBulletPoints"][field] = value;
    },
    setSettings: (draft, action: PayloadAction<Settings>) => {
      return action.payload;
    },
  },
});

export const {
  changeSettings,
  changeShowForm,
  changeFormHeading,
  changeFormOrder,
  changeShowBulletPoints,
  setSettings,
} = SettingsSlice.actions;

export const selectSettings = (state: RootState) => state.settings;

export const selectThemeColor = (state: RootState) => state.settings.themeColor;
export const selectFontFamily = (state: RootState) => state.settings.fontFamily;
export const selectFontSize = (state: RootState) => state.settings.fontSize;
export const selectFormToShow = (state: RootState) => state.settings.formToShow;
export const selectFormToHeading = (state: RootState) =>
  state.settings.formToHeading;
export const selectFormsOrder = (state: RootState) => state.settings.formsOrder;
export const selectShowByForm = (form: ShowForm) => (state: RootState) =>
  state.settings.formToShow[form];

export const selectHeadingByForm = (form: ShowForm) => (state: RootState) =>
  state.settings.formToHeading[form];
export const selectIsFirstForm = (form: ShowForm) => (state: RootState) =>
  state.settings.formsOrder[0] === form;
export const selectIsLast = (form: ShowForm) => (state: RootState) =>
  state.settings.formsOrder[state.settings.formsOrder.length - 1] === form;

export const selectShowBulletPoints =
  (form: FormWithBulletPoints) => (state: RootState) =>
    state.settings.showBulletPoints[form];

export default SettingsSlice.reducer;
