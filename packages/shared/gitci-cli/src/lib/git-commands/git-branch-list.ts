import { exec } from "../../utils";

/**
 * Performs a git branch to list the remote branches from the origin
 */
export const gitBranchList = async (): Promise<string> => {
  return await exec("git", [ "branch" ]);
};