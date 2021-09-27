import ora from "ora";
import logSymbols from "log-symbols";

import { stdoutToArray } from "../../utils";
import {
  gitBranchListRemoteOrigin,
  gitFetch
} from "../../lib/git-commands";

/**
 * Fetches the remote origin branches
 */
export const fetchRemoteOriginBranches = async (): Promise<string[]> => {
  const gitFetchSpinner = ora({ text: "Fetching remote branches" }).start();
  let remoteBranches = "";

  // Perform a git fetch
  try {
    await gitFetch([ "origin" ]);
  } catch (error) {
    gitFetchSpinner.stopAndPersist({ symbol: logSymbols.error });
    throw error;
  }

  // List the git branches from the remote origin
  try {
    remoteBranches = await gitBranchListRemoteOrigin();
  } catch (error) {
    gitFetchSpinner.stopAndPersist({ symbol: logSymbols.error });
    throw error;
  }

  // Stop and persist the fetch spinner
  gitFetchSpinner.stopAndPersist({ symbol: logSymbols.success });

  return stdoutToArray(remoteBranches);
};