import { BACKEND_URL } from "@/lib/constants";

export const createUrl = (...urlComponents: string[]) => {
  return [BACKEND_URL].concat(urlComponents).join("/");
};
