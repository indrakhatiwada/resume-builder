import { ResumeKey } from "../redux/types";
import { Line, Lines, ResumeSectionToLines, TextItem } from "./types";

export const PROFILE_SECTION: ResumeKey = "profile";
export const SECTION_TITLE_KEYWORDS_PRIMARY = [
  "experience",
  "education",
  "skills",
  "projects",
];

export const SECTION_TITLE_KEYWORDS_SECONDARY = [
  "job",
  "course",
  "extracurricular",
  "suimmary",
  "about",
];

const SECTION_TITLE_KEYWORDS = [
  ...SECTION_TITLE_KEYWORDS_PRIMARY,
  ...SECTION_TITLE_KEYWORDS_SECONDARY,
];

export const groupLinesIntoSection = (lines: Lines) => {
  let sections: ResumeSectionToLines = {};
  let sectionName: string = PROFILE_SECTION;
  let sectionLines: any = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const text = line[0]?.text.trim();
    if (isSectionTitle(line, i)) {
      sections[sectionName] = [...sectionLines];
      sectionName = text;
      sectionLines = [];
    } else {
      sectionLines.push(line);
    }
  }
  if (sectionLines.length > 0) {
    sections[sectionName] = [...sectionLines];
  }
};

const isSectionTitle = (line: Line, lineNumber: number) => {
  const isFirestTwoLines = lineNumber < 2;

  const hasMoreThanOneItemInLine = line.length > 1;
  const hasNoItemInLine = line.length === 0;
  if (isFirestTwoLines || hasMoreThanOneItemInLine || hasNoItemInLine) {
    return false;
  }

  const text = line[0];

  if (isBold(text) && hasLatterAndIsAllUpperCase(text)) {
    return true;
  }

  const textItem = text.text.trim();
  const textHasAtMostTwoWords =
    textItem.split(" ").filter((s) => s !== "&").length <= 2;
  const startsWithCapitalLetter = /[A-Z]/.test(textItem.slice(0, 1));

  if (
    textHasAtMostTwoWords &&
    hasOnlyLettersSpacesOrAmpersands(text) &&
    startsWithCapitalLetter &&
    SECTION_TITLE_KEYWORDS.includes(textItem.toLowerCase())
  ) {
    return true;
  }

  return false;
};

const isBold = (item: TextItem) => isTextItemBold(item.fontName);

const isTextItemBold = (fontName: string) =>
  fontName.toLocaleLowerCase().includes("bold");

export const hasLetter = (item: TextItem) => /[a-zA-Z]/.test(item.text);

export const hasLatterAndIsAllUpperCase = (item: TextItem) =>
  hasLetter(item) && item.text === item.text.toUpperCase();

export const hasOnlyLettersSpacesOrAmpersands = (item: TextItem) =>
  /^[A-Za-z/s&]+$/.test(item.text);
