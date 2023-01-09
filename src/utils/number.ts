/** Normalize a value between two ranges */
export const normalize = (value: number, min: number, max: number) => (value - min) / (max - min);
