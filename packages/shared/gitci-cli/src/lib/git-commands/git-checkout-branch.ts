import { exec } from "../../utils";

/**
 * Either checkout a new or existing branch
 *
 * @param branchRef - The branch ref to checkout
 * @param newBranch - Whether to attempt to checkout a new branch
 */
export const gitCheckoutBranch = async (branchRef: string, newBranch = false): Promise<string> => {
  // If a new branch has been requested
  if (newBranch) {
    return await exec("git", [
      "checkout",
      "-b",
      branchRef
    ], true);
  }

  return await exec("git", [ "checkout", branchRef ], true);
};