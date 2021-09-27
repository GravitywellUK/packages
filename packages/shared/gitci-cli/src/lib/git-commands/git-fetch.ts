import { exec } from "../../utils";

/**
 * Performs a git fetch
 *
 * @param branchRefs - The branch or refs to fetch
 */
export const gitFetch = async (branchRefs?: string[]): Promise<string> => {
  // If branchRefs are given, fetch only those branches or refs
  if (branchRefs && branchRefs.length > 0) {
    return await exec("git", [ "fetch", ...branchRefs ]);
  }

  return await exec("git", [ "fetch" ]);
};