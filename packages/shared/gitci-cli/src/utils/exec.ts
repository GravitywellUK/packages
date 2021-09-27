import util from "util";
import { exec as execNonPromise } from "child_process";

// Promisify the exec function
const execPromise = util.promisify(execNonPromise);

/**
 * Executes the given shell command using an async/await promise
 *
 * @param cmd - The shell command to execute
 * @returns The stdout of the execution
 */
export const exec = async (cmd: string): Promise<string> => {
  const { stdout, stderr } = await execPromise(cmd);

  // If there is a stderr, throw it
  if (stderr) {
    throw stderr;
  }

  return stdout;
};