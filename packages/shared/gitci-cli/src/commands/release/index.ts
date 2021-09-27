import { Flag as MeowFlag } from "meow";

import { fetchRemoteOriginBranches } from "./fetch-remote-branches";
import { releasePrompts } from "./release-prompts";
import { gitBranchRefsToBranchNames } from "../../utils";
import { Flag } from "../../types";
import { gitCheckoutBranch } from "../../lib/git-commands";

export type ReleaseFlag = Record<Flag.RELEASE, MeowFlag<"boolean", boolean>>;

/**
 * Release
 */
export const release = async (): Promise<void> => {
  const remoteBranchRefs = await fetchRemoteOriginBranches();
  // Compile the branch names
  const remoteBranches = gitBranchRefsToBranchNames(remoteBranchRefs);
  // Get only the "release-" branches
  const remoteReleaseBranches = remoteBranches.filter(branch => branch.match(/release-/g));
  // Show the release prompts
  const feedback = await releasePrompts(remoteReleaseBranches);

  // If the user selects to create a new release branch, automatically create one
  // following on from the last. Otherwise switch the the one that they have selected.
  if (feedback.nonExistingBranchCreation || feedback.existingBranchCreation) {
    await gitCheckoutBranch(`release-${remoteReleaseBranches.length + 1}`, true);
  } else if (feedback.switchBranch) {
    await gitCheckoutBranch(feedback.switchBranch);
  }
};