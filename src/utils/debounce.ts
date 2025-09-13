export const debounce = <T extends (arg: string) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;

  return (arg: string) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(arg), delay);
  };
};
