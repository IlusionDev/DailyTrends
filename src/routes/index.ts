import { Request, Response } from "express";

const router = require("express").Router();
const path = "/main";

/* GET home page. */
router.get("/", function (req: Request, res: Response, next: Function) {});

export default { router, path };
