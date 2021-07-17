import ApiResponse from "@/domain/services/ApiResponse";
import CRequest from "@/global/definitions/CRequest";
import { Response } from "express-serve-static-core";

jest.mock("@/config/winston");

const req = {
  logger: {error: jest.fn() as any},
};

const res = {
  send: jest.fn() as any,
  status: jest.fn(() => res) as any,
};

const apiResponse = new ApiResponse(req as CRequest, res as Response);

describe("Check api Response service", () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("generates an api response with data", () => {
    const response = apiResponse.generateApiResponse({ name: "Entity" });

    expect(response).toMatchSnapshot()
  });

  it("generates an api response with data and options", () => {
    const response = apiResponse.generateApiResponse({ name: "Entity" }, {message: 'Message test', statusCode: 400, error: true});

    expect(response).toMatchSnapshot()
  });

   it("generates an error api response with default options", () => {
    const response = apiResponse.generateApiErrorResponse({message: 'Message test'});

    expect(response).toMatchSnapshot()
  });
   it("generates an error api response with custom statusCode", () => {
    const response = apiResponse.generateApiErrorResponse({message: 'Message test', statusCode: 400});

    expect(response).toMatchSnapshot()
  });
   it("generates an api response and sends it to client", () => {
    apiResponse.generateAndSendWithStatus({ name: "Entity" },{message: 'Message test', statusCode: 400});

     expect(res.status).toHaveBeenNthCalledWith(1, 400)
     expect(res.send).toHaveBeenNthCalledWith(1, {
       "data": {
        "name": "Entity"
       },
       "error": false,
       "message": "Message test",
       "statusCode": 400,
     })
  });
   it("generates an api response and sends it to client with default options", () => {
    apiResponse.generateAndSendWithStatus({ name: "Entity" });

     expect(res.status).toHaveBeenNthCalledWith(1, 200)
     expect(res.send).toHaveBeenNthCalledWith(1, {
       "data": {
        "name": "Entity"
       },
       "error": false,
       "message": undefined,
       "statusCode": 200,
     })
  });
   it("generates an error api response and sends it to client with default options", () => {
     apiResponse.generateAndSendErrorReponse(true, { error: { stack: 'stack example' } });

     expect(res.status).toHaveBeenNthCalledWith(1, 500)
     expect(res.send).toHaveBeenNthCalledWith(1, {
       "data": undefined,
       "error": true,
       "message": undefined,
       "statusCode": 500,
     })
  });
});
