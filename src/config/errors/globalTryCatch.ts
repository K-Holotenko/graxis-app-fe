export function globalTryCatch<T>(fn: () => Promise<T>): () => Promise<T> {
  return async () => {
    try {
      return await fn();
    } catch (error) {
      console.error('Error Definition', error);
      throw error;
    }
  };
}
