import GenerateResponseController from "@controllers/generate-response";
import express from "express";

const router = express.Router();
const controller = new GenerateResponseController();

router.post("/generate-response", controller.postGenerateResponse);

export default router;
