import { getSchemaContents } from "@db/helperFunctions";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send({ message: "Success" });
});

export default router;
