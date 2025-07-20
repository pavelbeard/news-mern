declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    MONGODB_URL: string;
    ALLOWED_ORIGINS: string;
  }
}
