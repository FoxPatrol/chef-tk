import MatchesController from "@controllers/matches";
import express from "express";

const router = express.Router();
const controller = new MatchesController();

router.get(
  "/:region/matches/by-riot-id/:name/:tag",
  controller.getMatchesByRiotId
);

export default router;
