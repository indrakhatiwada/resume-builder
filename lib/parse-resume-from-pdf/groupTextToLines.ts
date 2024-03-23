import { TextItem } from "pdfjs-dist/types/src/display/api";
import { Line, Lines, TextItems } from "./types";

export const groupTextItemsToLInes = (textItems: TextItems): Lines => {
  const lines: Lines = [];

  let line: Line = [];
  for (let item of textItems) {
    if (item.hasEOL) {
      if (item.text.trim() !== "") {
        line.push({ ...item });
      }
      lines.push(line);
      line = [];
    } else if (item.text.trim() !== "") {
      line.push({ ...item });
    }
  }
  if (line.length > 0) {
    lines.push(line);
  }
  const characterWidth = getCharachterWidth(lines.flat());

  for (let line of lines) {
    for (let i = line.length - 1; i > 0; i--) {
      const current = line[i];
      const leftItem = line[i - 1];
      const leftItemXEnd = leftItem.x + leftItem.width;
      const space = current.x - leftItemXEnd;

      if (space <= characterWidth) {
        if (shouldAddSpaceBetweenText(leftItem.text, current.text)) {
          leftItem.text += " ";
        }
        leftItem.text += current.text;

        const currentItemXEnd = current.x + current.width;
        leftItem.width = currentItemXEnd - leftItem.x;
        line.splice(i, 1);
      }
    }
  }
  return lines;
};

const shouldAddSpaceBetweenText = (left: string, right: string) => {
  const leftTextEnd = left[left.length - 1];
  const rightTextStart = right[0];
  const conditions = [
    [":", ",", "|", "."].includes(leftTextEnd) && rightTextStart !== " ",
    leftTextEnd !== " " && ["|"].includes(rightTextStart),
  ];

  return conditions.some((condition) => condition);
};

const getCharachterWidth = (textItems: TextItems): number => {
  textItems = textItems.filter((item) => item.text.trim() !== "");
  const heightToCount: { [height: number]: number } = {};
  let commonHeight = 0;
  let heightMaxCount = 0;
  const fontNameToCount: { [fontName: string]: number } = {};
  let commonFontName = "";
  let fontNameMaxCount = 0;

  for (let item of textItems) {
    const { text, height, fontName } = item;
    if (!heightToCount[height]) {
      heightToCount[height] = 0;
    }
    heightToCount[height]++;
    if (heightToCount[height] > heightMaxCount) {
      heightMaxCount = heightToCount[height];
      commonHeight = height;
    }

    if (!fontNameToCount[fontName]) {
      fontNameToCount[fontName] = 0;
    }
    fontNameToCount[fontName]++;
    if (fontNameToCount[fontName] > fontNameMaxCount) {
      fontNameMaxCount = fontNameToCount[fontName];
      commonFontName = fontName;
    }
  }

  const commonTextItem = textItems.filter(
    (item) => item.fontName === commonFontName && item.height === commonHeight
  );

  //aggregate totla with and number of characters

  const [totalWidth, totalChars] = commonTextItem.reduce(
    (acc, currrent) => {
      const [preWidth, preChars] = acc;
      return [preWidth + currrent.width, preChars + currrent.text.length];
    },
    [0, 0]
  );

  const characterWidth = totalWidth / totalChars;

  return characterWidth;
};
