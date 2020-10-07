import debug from "debug";

interface CreateDebugReturnObject {
  error: debug.Debugger,
  log: debug.Debugger,
  info: debug.Debugger
}
export const createDebug = (nameSpace: string): CreateDebugReturnObject => {
  debug.disable();

  if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "staging") {
    debug.enable("GRAVITYWELL:*");
  } else {
    debug.enable("GRAVITYWELL:*:INFO,TSF:*:ERROR");
  }

  // STDOUT Log
  const log = debug(`GRAVITYWELL:${nameSpace}:`);
  // Error Log
  const error = log.extend("ERROR");
  // Info Log
  const info = log.extend("INFO");

  return {
    error,
    log,
    info
  };
};
