export const toFixedWithoutRounding = (n: number, fixed: number): number =>
  ~~(Math.pow(10, fixed) * n) / Math.pow(10, fixed);
