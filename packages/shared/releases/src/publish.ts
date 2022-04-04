import childProcess from "child_process";
import { promisify } from "util";

import { Command } from "commander";

import { cliHandler } from "./handler";

const exec = promisify(childProcess.exec);

const publishRelease = cliHandler(async () => {
  const releaseVersion = process.env.npm_package_version;

  await exec(`gh release create v${releaseVersion} --generate-notes`);
});

export const publish = new Command("publish");

publish.action(publishRelease);