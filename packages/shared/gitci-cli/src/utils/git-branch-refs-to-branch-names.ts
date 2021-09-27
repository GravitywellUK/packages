/**
 * Gets the simplified branch names from the given branch refs
 *
 * @param branchRefs - The branch refs to simplify
 */
export const gitBranchRefsToBranchNames = (branchRefs: string[]): string[] => {
  const branchNames = branchRefs.map(branchRef => branchRef.split("/").reverse()[ 0 ]);

  // Filter out duplicates
  return branchNames.filter((value, index, self) => self.indexOf(value) === index);
};