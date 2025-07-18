import { set } from "date-fns";

export const currentTime = (date: string | Date | number) => {
  const now = new Date();
  return set(new Date(date), {
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
    milliseconds: now.getMilliseconds(),
  });
};
