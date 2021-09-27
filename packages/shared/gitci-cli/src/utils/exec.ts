import execa from "execa";

/**
 * Executes the given shell command using an async/await promise
 *
 * @param cmd - The shell command to execute
 * @param args - The shell command arguments
 * @param pipe - Whether to pipe the child process stdout to the parent
 * @returns The stdout of the execution
 */
export const exec = async (cmd: string, args?: string[], pipe = false): Promise<string> => {
  const { stdout, stderr } = await execa(cmd, args, pipe ? {
    buffer: false,
    stdio: "inherit"
  } : {});

  // If there is a stderr, throw it
  if (stderr) {
    throw stdout;
  }

  return stdout;
};