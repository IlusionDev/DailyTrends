import FeedController from "@/controllers/FeedController";
import { Request, Response } from "express";

const router = require("express").Router();
const path = `${process.env.BASE_URL}/feed`;

/* GET home page. */
router.get("/", function (req: Request, res: Response, next: Function) {
  const feedController = new FeedController(req, res);
  feedController.getAllFeeds();
});

router.post("/", function (req: Request, res: Response, next: Function) {
  const feedController = new FeedController(req, res);
  feedController.addFeed();
});

router.delete("/:id", function (req: Request, res: Response, next: Function) {
  const feedController = new FeedController(req, res);
  feedController.deleteFeed();
});

router.put("/:id", function (req: Request, res: Response, next: Function) {
  const feedController = new FeedController(req, res);
  feedController.updateFeed();
});

export default { router, path };
