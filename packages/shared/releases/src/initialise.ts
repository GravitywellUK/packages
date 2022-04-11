import childProcess from "child_process";
import { promisify } from "util";

import Inquirer from "inquirer";
import { Command } from "commander";

import { cliHandler } from "./handler";

const exec = promisify(childProcess.exec);

interface InitialiseParams {
  type: "patch" | "minor" | "major" | "specific";
  version: string;
}

const initialiseRelease = cliHandler(async () => {
  const { type, version } = await Inquirer.prompt<InitialiseParams>([
    {
      name: "type",
      type: "list",
      message: "What type of release do you want to initialise?",
      choices: [
        {
          name: "Patch (x.x.Y)",
          value: "patch"
        },
        {
          name: "Minor (x.Y.0)",
          value: "minor"
        },
        {
          name: "Major (Y.0.0)",
          value: "major"
        },
        {
          name: "Choose a specific version",
          value: "specific"
        }
      ]
    },
    {
      name: "version",
      type: "input",
      when: async ({ type }) => type === "specific",
      message: "Release version:",
      validate: version => (
        /^\d+\.?\d*\.\d+$/.test(version) || "Release version must be in semver format (x.x.x)"
      )
    }
  ]);

  // get all publised releases on github
  const { stdout: releaseLog } = await exec("gh release list");
  // get each published release tag
  const releaseTags = releaseLog.match(/^v?\S+/gm) as string[];
  // update package.json version
  const { stdout: versionOutput } = await exec(`npm version ${version || type} --git-tag-version false`);
  // remove trailing newline
  const newVersion = versionOutput.trim().match(/v[\d.]+$/)?.[ 0 ];

  if (!newVersion) {
    throw new Error("Release version could not be determined! Please check you have specified a valid version");
  }

  if (releaseTags.includes(newVersion)) {
    throw new Error("A release has already been published for this version. Please try again with a new version!");
  }

  const newReleaseBranchCommand = [
    // create and checkout new release branch
    `git checkout -b release/${newVersion}`,
    // stage version update
    "git add .",
    // commit version update and push new release branch
    `git commit -m "Initialise release ${newVersion}" && git push -u origin HEAD`
  ].join(" && ");

  await exec(newReleaseBranchCommand);
});

export const initialise = new Command("init");

initialise.description("Initialise a new release branch");
initialise.action(initialiseRelease);