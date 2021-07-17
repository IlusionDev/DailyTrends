import ApiResponseDto from "@/domain/dto/ApiResponseDto";
import CRequest from "@/global/definitions/CRequest";
import { plainToClass } from "class-transformer";
import GenerateApiResponseOptions from "@/domain/services/definitions/GenerateApiResponseOptions";
import GenerateAndSendErrorReponseOptions from "@/domain/services/definitions/GenerateAndSendErrorReponseOptions";
import { Response } from "express";
import { Error } from "mongoose";

export default class ApiResponseService {
  private req: CRequest;

  private res: Response;

  constructor(req: CRequest, res: Response) {
    this.req = req;
    this.res = res;
  }

  generateApiResponse<T>(
    data: T,
    options?: GenerateApiResponseOptions
  ): ApiResponseDto {
    const apiResponse: ApiResponseDto = new ApiResponseDto();
    if (data) {
      if (options?.sanitize) {
        apiResponse.data = plainToClass(options.sanitize, data);
      } else {
        apiResponse.data = data;
      }
    }
    apiResponse.error = options?.error ? options.error : false;
    options?.message ? (apiResponse.message = options?.message) : null;
    apiResponse.statusCode = options?.statusCode || 200;

    return apiResponse;
  }

  generateApiErrorResponse<T>(
    options?: GenerateApiResponseOptions
  ): ApiResponseDto {
    const apiResponse = this.generateApiResponse(null, {
      error: true,
      statusCode: 500,
      ...options,
    });

    return apiResponse;
  }

  generateAndSendWithStatus(data: any, options?: GenerateApiResponseOptions) {
    const statusCode = options?.statusCode ? options.statusCode : 200;
    const response = this.res
      .status(statusCode)
      .send(this.generateApiResponse(data, options));

    return response;
  }

  generateAndSendErrorReponse(
    error: any,
    options: GenerateAndSendErrorReponseOptions
  ) {
    const statusCode = options?.statusCode ? options.statusCode : 500;
    this.req.logger.error(
      options.error?.message || options.message,
      options.error?.stack || ""
    );

    return this.res.status(statusCode).send(
      this.generateApiResponse(null, {
        ...options,
        error: true,
        message: options?.message || options?.error?.message,
        statusCode,
        stackTrace: error.stack,
      })
    );
  }
}
