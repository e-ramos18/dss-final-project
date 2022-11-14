import { CustomApiResponse } from "../types";

/**
 * Check if email is valid.
 * @param {string} value
 * @returns boolean
 */
export const validatEmail = (value: string): boolean => {
  let apos = value.indexOf("@"); // from beginning first item
  let dotpos = value.lastIndexOf("."); // from beginning last item
  return apos < 1 || dotpos - apos < 2;
};

/**
 * Check if password is valid.
 * @param {string|undefined} value
 * @param {string} field
 * @returns boolean
 */
export const validatePassword = (
  value: string | undefined,
  field: string
): boolean => {
  if (!value) throw new Error(`Please add ${field}.`);
  if (value.length < 8)
    throw new Error("Password should atleast be 8 characters.");
  return true;
};

/**
 * Get an item from localStorage
 * @param {string} item
 * @returns string
 */
export const getItem = (item: string): string => {
  const result = localStorage.getItem(item);
  if (!result) return "";
  return JSON.parse(result);
};

/**
 * Set an item in the local storage.
 * @param {string} key
 * @param {string} value
 */
export const setItem = (key: string, value: string | null) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const throwError = (payload: CustomApiResponse<{}>) => {
  if (payload.message.includes("E11000"))
    throw new Error("Email already taken.");
  if (!payload.success) throw new Error(payload.message);
  return true;
};

/**
 * Checks if a given field is empty
 * @param {string} text
 * @param {string} field
 * @returns {boolean}
 */
export const isNotEmpty = (text: string, field: string): boolean => {
  if (!text) throw new Error(`Please add ${field}.`);
  return true;
};
