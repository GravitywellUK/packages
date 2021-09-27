import { Flag as MeowFlag } from "meow";

import { fetchRemoteOriginBranches } from "./fetch-remote-branches";
import { releasePrompts } from "./release-prompts";
import { gitBranchRefsToBranchNames } from "../../utils";
import { Flag } from "../../types";

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

  console.log(feedback);

  if (feedback.nonExistingBranchCreation) {
    console.log(`release-${remoteReleaseBranches.length + 1}`);
  }
};