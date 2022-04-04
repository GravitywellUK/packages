import { promisify } from "util";
import childprocess from "child_process";

const exec = promisify(childprocess.exec);

export const checkMinimumNodeVersion = (requiredMajor: number): void => {
  const nodeMajor = Math.floor(parseFloat(process.versions.node));

  if (
    // node version is odd (non-LTS)
    nodeMajor % 2 === 1 ||
    // or older than required major version
    nodeMajor < requiredMajor
  ) {
    throw new Error(`Ensure your Node.JS installation is an LTS version >= ${requiredMajor}`);
  }
};

const checkGithubCliInstalled = async () => {
  try {
    await exec("gh  --version");
  } catch (e) {
    throw new Error("You must have the GitHub CLI installed. Try running `brew install gh`");
  }
};

const checkWorkingTreeClean = async () => {
  const { stdout: diff } = await exec("git diff --quiet || echo dirty");

  if (diff.trim() === "dirty") {
    throw new Error("Working tree is dirty. Commit your changes to continue!");
  }
};

export const validateRequirements = async (): Promise<void> => {
  checkMinimumNodeVersion(16);
  await checkWorkingTreeClean();
  await checkGithubCliInstalled();
};