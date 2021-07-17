import Controller from '@/controllers/Controller';
import CRequest from "@/global/definitions/CRequest";
import { Response } from "express-serve-static-core";
import { Logger } from "winston";

describe("Base Controller test", () => {
  it("checks if constructor has right options", () => {
    const controller = new Controller({ logger: {} as Logger } as CRequest, { send: () => { } } as Response )
    
    expect(controller.req.logger).toBeDefined()
    expect(controller.res.send).toBeDefined()
  })
})