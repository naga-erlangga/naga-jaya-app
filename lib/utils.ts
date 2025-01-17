import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import fuzzysearch from "fuzzysearch-ts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const currencyFormat = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
});

export const fuzzySearch = (needle : string, haystack : any[]) => {
  let filtered = [];

  for (let i = 0; i < haystack.length; i++) {
    if (fuzzysearch(needle, haystack[i].name.toLowerCase())) {
      filtered.push(haystack[i])
    }
  }

  return filtered;
}