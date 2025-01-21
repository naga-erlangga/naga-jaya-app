import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import fuzzysearch from "fuzzysearch-ts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const currencyFormat = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const checkText = (needle: string, haystack: string): boolean => {
  // in haystack check if needle in haystack
  let wordInHaystack = haystack
    .split(" ")
    .map((e) => e.toLowerCase())
    .includes(needle);

  // debug purposes
  // if (wordInHaystack) {
  //   console.log(haystack.split(" "));
  //   console.log(wordInHaystack);
  // }

  // if word in haystack and fuzzy search also agree with the value
  return fuzzysearch(needle, haystack.toLowerCase()) && wordInHaystack;
};

export const fuzzySearch = (needle: string, haystack: any[]) => {
  let filtered = [];

  for (let i = 0; i < haystack.length; i++) {
    if (checkText(needle, haystack[i].name)) {
      filtered.push(haystack[i]);
    }
  }

  return filtered;
};
