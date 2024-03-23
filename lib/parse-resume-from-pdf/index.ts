//parse resume from pdf

import { groupLinesIntoSection } from "./groupLinesIntoSections";
import { groupTextItemsToLInes } from "./groupTextToLines";
import { readPdf } from "./read-pdf";

export const parseResumeFromPdf = async (fileUrl: string) => {
  //step1. Read Pdf into Text Item
  const textItems = await readPdf(fileUrl);

  //step2. Group Text Items into Lines
  const lines = groupTextItemsToLInes(textItems);

  //step3: Group Lines into Paragraphs
  const sections = groupLinesIntoSection(lines);

  //!step4: Parse Section into Resume
};
