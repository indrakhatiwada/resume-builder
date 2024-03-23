import { text } from "stream/consumers";
import { TextItem } from "../types";
import { ResumeSectionToLines } from "../types";

//Name

export const matchOnlYLetterSpaceOrPeriod = (item: TextItem) =>
  item.text.match(/^[a-zA-Z\s.]+$/);

//Email
export const matchEmail = (item: TextItem) =>
  item.text.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);

const hasAt = (item: TextItem) => item.text.includes("@");

//phone
export const matchPhone = (item: TextItem) =>
  item.text.match(/(\+\d+[-\s])?(\d{2,3}[-\s]?){4}\d{2,3}/);

export const hasParenthesis = (item: TextItem) => /\([0-9] +\)/.test(item.text);

//Location

export const matchCityAndState = (item: TextItem) =>
  item?.text.match(/^[a-zA-Z\s]+,\s[a-zA-Z\s]+$/);

//URL
export const matchUrl = (item: TextItem) =>
  //onlycheck for something like abcd.com or www.abcd.com
  item.text.match(/(http(s?):\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/);

const matchUrlHTTPWwwFallback = (item: TextItem) =>
  item?.text?.match(/(http(s?):\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/);

const matchHttpOnlyFallback = (item: TextItem) => item.text.match(/http:\/\//);

const hasSlash = (item: TextItem) => item.text.includes("/");

//Summary

const hasFourOrMoreWords = (item: TextItem) => item.text.split(" ").length >= 4;

export const extractProfile = (sections: ResumeSectionToLines) => {
  const lines = sections.profile || [];
  const textItems = lines.flat();
};
