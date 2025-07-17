export const PORT = process.env.PORT || 3001;

const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;

export const MONGODB_URL = process.env.MONGODB_URL
  ? process.env.MONGODB_URL
  : `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@localhost:27018/?authSource=admin`;

export const API_V1 = "/api/v1";
