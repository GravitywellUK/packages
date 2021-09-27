import chalk from "chalk";
import inquirer from "inquirer";
import inquirerAutocomplete from "inquirer-autocomplete-prompt";

import { fuzzyFilter } from "../../utils";
import { PromptAnswer } from "../../types";

interface ReleasePromptAnswer {
  nonExistingBranchCreation?: boolean;
  existingBranchCreationOrSwitch?: "create" | "switch";
  switchBranch?: string;
}

// Registers a new prompt-type.
inquirer.registerPrompt("autocomplete", inquirerAutocomplete);

const nonExistingBranchCreationAnswers: Array<PromptAnswer<boolean>> = [
  {
    name: "Yes",
    value: true
  },
  {
    name: "No",
    value: false
  }
];

const existingBranchCreationOrSwitchAnswers: PromptAnswer[] = [
  {
    name: "Create new branch",
    value: "create"
  },
  {
    name: "Switch to an existing branch",
    value: "switch"
  }
];

/**
 * Generates the release command prompts
 *
 * @param releaseBranches - The existing release-* branches
 */
export const releasePrompts = async (releaseBranches?: string[]): Promise<ReleasePromptAnswer> => {
  // Create the release prompt answers
  const remoteBranchReleasePromptAnswers: PromptAnswer[] = releaseBranches?.map(branch => {
    return {
      name: branch,
      value: branch
    };
  }) || [];

  // Create the CLI prompts
  return await inquirer.prompt<ReleasePromptAnswer>([
    // If a release-* branch doesn't exist
    {
      type: "autocomplete",
      name: "nonExistingBranchCreation",
      message: `Would you like to create a new ${chalk.cyanBright("release-*")} branch?`,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      source: (_answersSoFar: any, input: string) => fuzzyFilter(input, nonExistingBranchCreationAnswers),
      when: () => !releaseBranches || releaseBranches.length === 0
    },
    // If an existing release-* branch exists
    {
      type: "autocomplete",
      name: "existingBranchCreationOrSwitch",
      message: `Do you want to create a new ${chalk.cyanBright("release-*")} branch or switch to an existing one?`,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      source: (_answersSoFar: any, input: string) => fuzzyFilter(input, existingBranchCreationOrSwitchAnswers),
      when: () => releaseBranches && releaseBranches.length > 0
    },
    {
      type: "autocomplete",
      name: "switchBranch",
      message: "Which branch would you like to switch to?",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      source: (_answersSoFar: ReleasePromptAnswer, input: string) => fuzzyFilter(input, remoteBranchReleasePromptAnswers),
      when: (answersSoFar: ReleasePromptAnswer) => releaseBranches && releaseBranches.length > 0 && answersSoFar.existingBranchCreationOrSwitch === "switch"
    }
  ]);
};