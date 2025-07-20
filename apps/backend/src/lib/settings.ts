export const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "https://news-mern-backend.netlify.app/",
  "https://news-mern-frontend-brown.vercel.app/",
].concat(process.env?.ALLOWED_ORIGINS?.split(/,|\s/));
