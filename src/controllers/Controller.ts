import ApiResponseService from "@/domain/services/ApiResponse";
import CRequest from "@/global/definitions/CRequest";
import { Response } from "express-serve-static-core";

export default class Controller {
  res: Response;
  req: CRequest;
  apiResponse: ApiResponseService;

  constructor(req: CRequest, res: Response) {
    this.req = req;
    this.res = res;
    this.apiResponse = new ApiResponseService(this.req, this.res);
  }
}
