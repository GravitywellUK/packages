import { Flag as MeowFlag } from "meow";

import { Flag } from "../types";

export type ReleaseFlag = Record<Flag.RELEASE, MeowFlag<"boolean", boolean>>;

/**
 * Release
 */
export const release = (): void => {
  console.log("RELEASE");
};