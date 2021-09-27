import Fuse from "fuse.js";

import { PromptAnswer } from "../types";

/**
 * Perform a fuzzy search and filters out
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fuzzyFilter = (searchStr: string, haystack: Array<PromptAnswer<any>>): PromptAnswer[] => {
  const fuse = new Fuse<PromptAnswer>(haystack, {
    threshold: 0.5,
    keys: [
      {
        name: "name",
        weight: 0.33
      }
    ]
  });

  return searchStr ? fuse.search(searchStr).map(haystack => haystack.item) : haystack;
};