export const hasProperty = (property: string) => (value: unknown): boolean => {
  return value !== null && value !== undefined && {}.hasOwnProperty.call(value, property) ? true : false;
};
