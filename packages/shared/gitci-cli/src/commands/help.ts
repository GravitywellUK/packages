import {
  Flag as MeowFlag,
  Result
} from "meow";

import { Flag } from "../types";

export type HelpFlag = Record<Flag.HELP, MeowFlag<"boolean", boolean>>;

/**
 * Shows the CLI help
 *
 * @param cli - A Meow instance
 */
export const help = (cli: Result<HelpFlag>): void => {
  cli.showHelp();
};