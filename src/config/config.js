import dotenv from "dotenv";

import { program } from "../utils/commander.util.js";

dotenv.config({
  path: program.opts().env === "dev" ? "./.env.development" : "./.env.production",
});

export const config = {
  port: process.env.PORT || 8080,
  mongoDbUri: process.env.MONGODB_URI || null,
  secret: process.env.SECRET,
  ghClientId: process.env.GH_CLIENT_ID,
  ghClientSecret: process.env.GH_CLIENT_SECRET,
  ghAppId: process.env.GH_APP_ID,
};
