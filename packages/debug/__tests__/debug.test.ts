import { createDebug } from "../src";

const debug = createDebug("TEST:DEBUG");

describe("debug package tests", function () {
  test("Logging functions are callable", async function () {
    debug.log("Testing function: debug.log");
    debug.info("Testing function: debug.info");
    debug.error("Testing function: debug.error");
  });

  test("Non callable logging functions throw error", async function () {
    expect(() => {
      // @ts-expect-error - not allowed
      debug.blah("Testing function: debug.log");
      // @ts-expect-error - not allowed
      debug.foo("Testing function: debug.info");
      // @ts-expect-error - not allowed
      debug.loggy("Testing function: debug.error");
    }).toThrow();
  });
});
