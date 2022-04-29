// Todo: Move to generic utils

/**
 * Check and return true if an object is type of string.
 * @param { any } obj | Analyze has to object the function type.
 * @return { boolean } Result of analysis.
 */
export function isString(obj: any): boolean {
  return typeof obj === 'string';
}

/**
 * Check and return true if an object is type of number.
 * @param { any } obj | Analyze has to object the function type.
 * @return { boolean } Result of analysis.
 */
export function isNumber(obj: any): boolean {
  return typeof obj === 'number';
}

/**
 * Check and return true if an object is type of Function.
 * @param { any } obj | Analyze has to object the function type.
 * @return { boolean } Result of analysis.
 */
export function isFunction(obj: any): boolean {
  return typeof obj === 'function';
}
