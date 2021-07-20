import FeedController from '@/controllers/FeedController';
import CRequest from "@/global/definitions/CRequest";
import { Response } from "express-serve-static-core";
import { Logger } from "winston";


const apiResponseMock = {
  generateAndSendWithStatus: jest.fn(),
  generateApiResponse: jest.fn(),
  generateApiErrorResponse: jest.fn(),
  generateAndSendErrorReponse: jest.fn()
}

const feedsMock = [{
  url: "https://www.elmundo.es/economia/2021/07/18/60f458a721efa0a9028b462b.ht...",
  title:
    "Plan de Recuperaci�n. Holanda pide supeditar los fondos a que España c...",
  site: "elPais",
  images: {
    default: "test",
  },
},{
  url: "https://www.elmundo.es/economia/2021/07/18/60f458a721efa0a9028b462b.ht...",
  title:
    "Plan de Recuperaci�n. Holanda pide supeditar los fondos a que España c...",
  site: "elPais",
  images: {
    default: "test",
  },
}]
const req = {
  logger: {} as Logger,
  query: {
    id: '43rf34rf'
  },
  body: feedsMock[0],
  params: {
    id: '43rf34rf'
  }
}
describe("Base Controller test", () => {

  beforeEach(() => {
   jest.clearAllMocks() 
  })
  it("recieves request to get all feeds", async () => {
    const controller = new FeedController(req as any, { send: () => { } } as Response)
    controller.feedService.find = jest.fn(() => feedsMock) as any
    controller.apiResponse = apiResponseMock as any
    await controller.getAllFeeds()

    expect(controller.feedService.find).toHaveBeenCalled()
    expect(apiResponseMock.generateAndSendWithStatus).toHaveBeenNthCalledWith(1, feedsMock)
  
  })
  it("recieves request to add a feed", async () => {
    const controller = new FeedController(req as any, { send: () => { } } as Response)
    controller.feedService.insert = jest.fn(() => feedsMock[0]) as any
    controller.apiResponse = apiResponseMock as any
    await controller.addFeed()

    expect(controller.feedService.insert).toHaveBeenNthCalledWith(1, feedsMock[0])
    expect(apiResponseMock.generateAndSendWithStatus).toHaveBeenNthCalledWith(1, feedsMock[0], {
      statusCode: 201,
    })
  })
  it("recieves request to delete a feed", async () => {
    const controller = new FeedController(req as any, { send: () => { } } as Response)
    controller.feedService.delete = jest.fn() as any
    controller.apiResponse = apiResponseMock as any
    await controller.deleteFeed()

    expect(controller.feedService.delete).toHaveBeenNthCalledWith(1, { "id": "43rf34rf" })
    expect(apiResponseMock.generateAndSendWithStatus).toHaveBeenNthCalledWith(1, null)
  })
  it("recieves request to update a feed", async () => {
    const controller = new FeedController(req as any, { send: () => { } } as Response)
    controller.feedService.update = jest.fn() as any
    controller.apiResponse = apiResponseMock as any
    await controller.updateFeed()

    expect(controller.feedService.update).toHaveBeenNthCalledWith(1, { "id": "43rf34rf" }, feedsMock[0])
    expect(apiResponseMock.generateAndSendWithStatus).toHaveBeenNthCalledWith(1, null)
  })
})