/**
 * Extracts properties from a source object that are present in the keysToExtract array.
 */
export function extractPropertiesToUpdate<T>(
  source: Partial<T>,
  keysToExtract: (keyof T)[]
) {
  const result: Partial<T> = {};

  for (const key of keysToExtract) {
    if (source.hasOwnProperty(key)) {
      result[key] = source[key];
    }
  }

  return result;
}
