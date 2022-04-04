import { Command } from "commander";

import { initialise } from "./initialise";
import { publish } from "./publish";

const cli = new Command("gw-releases");

cli.description("CLI providing frontend release workflow utils");
cli.version("1.0.0");
cli.addCommand(initialise);
cli.addCommand(publish);
cli.parseAsync();