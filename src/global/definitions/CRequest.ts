import { Request } from "express-serve-static-core";
import { Logger } from "winston";

export default interface CRequest extends Request {
  logger: Logger;
}
