export const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://news-mern-backend.netlify.app/",
  "https://news-mern-frontend.vercel.app/",
].concat(process.env?.ALLOWED_ORIGINS?.split(/,|\s/));
