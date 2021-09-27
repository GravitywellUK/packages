import { exec } from "../../utils/exec";

/**
 * Performs a git branch to list the remote branches from the origin
 */
export const gitBranchListRemoteOrigin = async (): Promise<string> => await exec("git branch -r");