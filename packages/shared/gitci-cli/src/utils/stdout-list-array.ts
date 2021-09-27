/**
 * Converts a stdout list to an array
 *
 * @param stdout - The stdout list string
 */
export const stdoutToArray = (stdout: string) => {
  return stdout.trim().split("\n").map(item => item.trim());
};