import { Flag as MeowFlag } from "meow";
import inquirer from "inquirer";
import inquirerAutocomplete from "inquirer-autocomplete-prompt";

import { Flag } from "../../types";

export type ReleaseFlag = Record<Flag.RELEASE, MeowFlag<"boolean", boolean>>;

// Registers a new prompt-type.
inquirer.registerPrompt("autocomplete", inquirerAutocomplete);

const answers = [
  {
    name: "new",
    value: "new"
  },
  {
    name: "existing",
    value: "existing"
  }
];

/**
 * Release
 */
export const release = async (): Promise<void> => {
  console.log("RELEASE");

  await inquirer.prompt([
    {
      type: "autocomplete",
      name: "releaseType",
      message: "Select a state to travel from",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      source: (_answersSoFar: any, input: string) => {
        return answers;
      }
    }
  ]);
};