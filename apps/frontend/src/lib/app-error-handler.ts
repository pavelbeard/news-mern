export function withErrorHandler<T>(
  // oxlint-disable
  handler: (...args: any[]) => Promise<T>
): (...args: any[]) => Promise<T> {
  return async (...args) => {
    try {
      return await handler(...args);
    } catch (error) {
      throw error;
    }
  };
}
