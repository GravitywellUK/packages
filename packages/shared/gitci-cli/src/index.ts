#!/usr/bin/env node
import updateNotifier from "update-notifier";
import meow from "meow";

import { findCommand } from "./utils";
import { Flag } from "./types";
import pkg from "../package.json";

updateNotifier({ pkg }).notify({ isGlobal: true });

// Create and configure a new meow CLI instance
const cli = meow(
  `
  Usage
    $ gitci
  Options
    --${Flag.HELP}, -h       Shows the help menu.
    --${Flag.VERSION}, -v    Shows the version of the CLI.
    --${Flag.RELEASE}, -r   Interactively create or switch to a release branch.
  Examples
    $ gitci -r
    $ gitci --help
`,
  {
    importMeta: import.meta,
    flags: {
      [ Flag.HELP ]: {
        type: "boolean",
        alias: "h"
      },
      [ Flag.VERSION ]: {
        type: "boolean",
        alias: "v"
      },
      [ Flag.RELEASE ]: {
        type: "boolean",
        alias: "r"
      }
    }
  }
);

// Finds the command that the user is trying to look for
findCommand(cli);