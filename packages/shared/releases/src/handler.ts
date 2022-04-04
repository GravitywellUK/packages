import { validateRequirements } from "./check";

type Handler = (...params: unknown[]) => Promise<void>;

export const cliHandler = (handler: Handler) => async (...params: unknown[]): Promise<void> => {
  try {
    await validateRequirements();
    await handler(...params);
  } catch (e) {
    console.error(`ERROR: ${e.message}`);
  }
};