import {
  Flag as MeowFlag,
  Result
} from "meow";

import { Flag } from "../types";

export type VersionFlag = Record<Flag.VERSION, MeowFlag<"boolean", boolean>>;

/**
 * Shows the CLI version
 *
 * @param cli - A Meow instance
 */
export const version = (cli: Result<VersionFlag>): void => {
  cli.showVersion();
};