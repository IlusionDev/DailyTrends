import dotenv from "dotenv";
import { Request, Response } from "express-serve-static-core";
dotenv.config({ path: `./env.${process.env.mode}` });
import logger, { winstonMiddleware } from "@/config/winston";
import CRequest from "@/global/definitions/CRequest";
import routerLoader from "@/domain/services/RouterLoader";
import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cronLoader from "@/domain/services/CronLoader";
import ApiResponseService from "@/domain/services/ApiResponse";

cronLoader();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// @ts-ignore
app.use(winstonMiddleware);
routerLoader(app);
// catch 404 and forward to error handler
// @ts-ignore
app.use(function (req: CRequest, res: Response, next: Function) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: Function) {
  // set locals, only providing error in development
  const apiResponse = new ApiResponseService(req as CRequest, res);
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "dev" ? err : {};
  apiResponse.generateAndSendErrorReponse(err, {
    message: err.message,
    statusCode: 500,
  });
});

export default app;
