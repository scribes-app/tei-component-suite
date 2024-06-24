/**
 * Check if two objects are equal (this is the fastest way with JSON.stringify do not use lodash anymore)
 */
export const isEqual = (base: any, comp: any) => {
  return JSON.stringify(base) === JSON.stringify(comp);
}
