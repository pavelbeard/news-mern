export function appErrorHandler<T>(
  handler: (...args: T[]) => Promise<T>
): (...args: T[]) => Promise<T> {
  return async (...args) => {
    try {
      return await handler(...args);
    } catch (e: unknown) {
      console.error("Something went wrong: ", e);
      return Promise.reject({ message: e });
    }
  };
}
