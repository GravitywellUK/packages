import chalk from "chalk";
import figlet from "figlet";
import { Result } from "meow";

import {
  help,
  HelpFlag,
  release,
  ReleaseFlag,
  version,
  VersionFlag
} from "../commands";
import { Flag } from "../types";

type CommandFlags = HelpFlag & VersionFlag & ReleaseFlag;

const cmdOpts = {
  [ Flag.HELP ]: (cli: Result<HelpFlag>) => help(cli),
  [ Flag.VERSION ]: (cli: Result<VersionFlag>) => version(cli),
  [ Flag.RELEASE ]: () => release()
};

/**
 * Finds the command that the user is trying to look for
 *
 * @param cli - A Meow instance
 * @param options -
 */
export const findCommand = async (cli: Result<CommandFlags>): Promise<void> => {
  // eslint-disable-next-line no-console
  console.log(
    chalk.whiteBright(
      figlet.textSync("gitci-cli", { horizontalLayout: "full" })
    )
  );

  // Get the given command flag
  const flags = cli.flags;
  const cmdFlag = Object.keys(flags).find(flag => !!flag);

  console.log(flags);

  switch (cmdFlag) {
    case Flag.VERSION:
      return cmdOpts[ Flag.VERSION ](cli);

    case Flag.RELEASE:
      return cmdOpts[ Flag.RELEASE ]();

    case Flag.HELP:
    default:
      return cmdOpts[ Flag.HELP ](cli);
  }
};