import serverlesshttp from "serverless-http";
import app from "../../index";

export const handler = serverlesshttp(app);
