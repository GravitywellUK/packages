import { generateUniqueId } from "../src/generate-unique-id";

describe("generate-unique-id", () => {
  test("Can generate a unique id of default length", () => {
    const uniqueId = generateUniqueId({});

    expect(uniqueId.length).toBe(4);
  });

  test("Can generate a unique id of length 6", () => {
    const uniqueId = generateUniqueId({ length: 6 });

    expect(uniqueId.length).toBe(6);
  });

  test("Can generate a unique id using the default dictionary", () => {
    const uniqueId = generateUniqueId({});

    // Default dictionary only includes letters and digits 0-9
    expect(/^[A-Za-z0-9]*$/.test(uniqueId)).toBeTruthy();
  });

  test("Can generate a unique id not using the default dictionary", () => {
    // Dictionary only including letters
    const LETTERS_ONLY = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const uniqueId = generateUniqueId({ dictionary: LETTERS_ONLY });

    expect(/^[A-Za-z]*$/.test(uniqueId)).toBeTruthy();
  });

  test("Can generate a unique id using a dictionary with duplicates", () => {
    // Dictionary containing duplicates
    const CONTAINS_DUPLICATES = "AAAAABCDDDDDDDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const uniqueId = generateUniqueId({ dictionary: CONTAINS_DUPLICATES });

    expect(/^[A-Za-z]*$/.test(uniqueId)).toBeTruthy();
  });
});