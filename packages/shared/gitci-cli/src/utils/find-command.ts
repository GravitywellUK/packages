import chalk from "chalk";
import figlet from "figlet";
import {
  AnyFlags,
  Result
} from "meow";

/**
 * Finds the command that the user is trying to look for
 * @param options
 */
export const findCommand = (cli: Result<AnyFlags>, options?: Record<string, unknown>) => {
  console.log(
    chalk.whiteBright(
      figlet.textSync("gitci-cli", { horizontalLayout: "full" })
    )
  );

  return cli.showHelp();
};