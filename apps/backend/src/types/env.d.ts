declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    MONGODB_URL: string;
    MONGODB_USER: string;
    MONGODB_PASSWORD: string;
  }
}
