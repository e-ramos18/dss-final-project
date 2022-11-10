import {CustomResponse} from '../types';

/**
 * Checks if not empty
 * @param {string} item
 * @param {string} name
 * @returns {boolean}
 */
export const isNotEmpty = (item: string, name: string): boolean => {
  if (!item || item?.trim() === '') throw new Error(`The ${name} is required.`);
  return true;
};

/**
 * Checks if not empty
 * @param {array} items
 * @param {string} name
 * @returns {boolean}
 */
export const arrayNotEmpty = (items: string, name: string): boolean => {
  if (!items || !items.length) throw new Error(`The ${name} is required.`);
  return true;
};

export const tryCatch = async (
  fn: () => Promise<any>,
  dataIfError: any,
  message: string,
): Promise<CustomResponse<{}>> => {
  try {
    const res = await fn();
    return {
      success: true,
      data: res,
      message,
    };
  } catch (error) {
    return {
      success: false,
      data: dataIfError,
      message: error ? error.message : 'Something went wrong.',
    };
  }
};
