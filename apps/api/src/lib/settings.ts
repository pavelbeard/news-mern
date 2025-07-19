export const ALLOWED_ORIGINS = ["http://localhost:5173"].concat(
  process.env?.ALLOWED_ORIGINS?.split(/,|\s/)
);
