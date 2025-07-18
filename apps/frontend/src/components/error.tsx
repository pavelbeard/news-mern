import { AxiosError } from "axios";
import { UNSAFE_ErrorResponseImpl, useRouteError } from "react-router-dom";

enum ErrorStatus {
  "BAD REQUEST" = 400,
  "NOT FOUND" = 404,
  "INTERNAL SERVER ERROR" = 500,
}

enum AxiosErrorMessage {
  "Bad request" = 400,
  "News not found" = 404,
}

enum AppErrorMessage {
  "Page not found" = 404,
}

export default function Error() {
  const error = useRouteError() as Error;

  function status(error: unknown) {
    if (error instanceof AxiosError) {
      return ErrorStatus[error.status as number];
    }

    if (error instanceof UNSAFE_ErrorResponseImpl) {
      return ErrorStatus[error.status as number];
    }

    return "Application error";
  }

  function message(error: unknown) {
    if (error instanceof AxiosError) {
      return AxiosErrorMessage[error.status as number];
    }

    if (error instanceof UNSAFE_ErrorResponseImpl) {
      return AppErrorMessage[error.status as number];
    }

    console.log(error);

    return "Something went wrong...";
  }

  return (
    <div className="flex flex-col gap-y-4 items-center justify-center min-h-screen bg-black/20">
      <h1 className="text-2xl font-bold text-red-600">{status(error)}</h1>

      <p className="text-lg font-semibold text-white">{message(error)}</p>
      <button
        onClick={() => (window.location.href = "/")}
        className="mt-4 px-4 py-2 bg-amber-300 text-black hover:bg-amber-300/80 rounded"
      >
        Try Again
      </button>
    </div>
  );
}
