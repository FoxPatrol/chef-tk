import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const prefix = "api";

// Dynamically import all route files
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file !== "index.ts" &&
      file !== "index.js" &&
      (file.endsWith(".js") || file.endsWith(".ts"))
  )
  .forEach((file) => {
    const innerRouter = require(path.join(__dirname, file)).default;
    router.use(`/${prefix}`, innerRouter);

    for (const route of innerRouter.stack) {
      console.log(
        `[${Object.keys(route.route.methods).join(", ")}] ${prefix}${
          route.route.path
        } `
      );
    }
  });

export default router;
