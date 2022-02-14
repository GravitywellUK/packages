#!/usr/bin/env node

import path from "path";
import cp from "child_process";
import https from "https";
import { URL } from "url";

/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const { name, version } = require(path.join(process.cwd(), "package.json"));

const {
  hostname,
  port,
  pathname
} = new URL(process.argv[ 2 ]);

cp.exec(`npm info ${name}@${version}`, (err, stdout) => {
  if (stdout.length) {
    const req = https.request({
      hostname,
      path: pathname,
      port,
      method: "POST",
      headers: { "Content-Type": "application/json" }
    }, res => {
      res.on("data", data => {
        process.stdout.write(data);
      });
    });

    req.write(JSON.stringify({
      package: name,
      version
    }));
    req.end();
  }
});