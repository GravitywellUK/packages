#!/usr/bin/env node
import updateNotifier from "update-notifier";
import meow from "meow";

import { findCommand } from "./utils";
import { Flags } from "./types";
import { test } from "./commands";
import pkg from "../package.json";

updateNotifier({ pkg }).notify({ isGlobal: true });

const cli = meow(
  `
  Usage
    $ gitci
  Options
    --${Flags.RELEASE}, -rc    Interactively commit using the prompts
  Examples
    $ gitmoji -l
    $ gitmoji bug linter -s
`,
  {
    importMeta: import.meta,
    flags: {
      [ Flags.RELEASE ]: {
        type: "boolean",
        alias: "rc"
      }
    }
  }
);

export const options = { [ Flags.RELEASE ]: () => test() };

findCommand(cli, options);