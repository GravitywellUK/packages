import { exec } from "../../utils/exec";

/**
 * Performs a git fetch
 *
 * @param branchRefs - The branch or refs to fetch
 */
export const gitFetch = async (branchRefs?: string[]): Promise<string> => {
  const baseCmd = "git fetch";

  // If branchRefs are given, fetch only those branches or refs
  if (branchRefs && branchRefs.length > 0) {
    return await exec(`${baseCmd} ${branchRefs.join(" ")}`);
  }

  return await exec(baseCmd);
};