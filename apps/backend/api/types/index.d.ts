export type StaticOrigin =
  | boolean
  | string
  | RegExp
  | Array<boolean | string | RegExp>;

declare namespace Request {
  interface Time {
    time: Date | string;
  }
}
