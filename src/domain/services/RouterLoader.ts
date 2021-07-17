import { Application } from "express-serve-static-core";
import fs from "fs";
import RouterFile from "@/domain/services/definitions/RouterFile";
import path from "path";
import logger from "@/config/winston";

const DIR_ROUTE = path.resolve(__dirname, "../../", "routes");

export default function (app: Application): void {
  const files = fs.readdirSync(DIR_ROUTE);
  if (!files) {
    logger.error("No routes files found");
    return;
  }
  files.forEach((routeFile: String) => {
    const {
      default: { router, path },
    }: RouterFile = require(`${DIR_ROUTE}/${routeFile}`);
    app.use(path, router);
  });
}
