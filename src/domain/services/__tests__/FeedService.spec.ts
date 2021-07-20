import FeedService from '@/domain/services/FeedService'
import FeedModel from "@/domain/models/Feed";
import { mocked } from "ts-jest/utils";

jest.mock("@/domain/models/Feed")

const mockerFeedModel = mocked(FeedModel);

mockerFeedModel.mockImplementation(() => {
      return modelMock as any;
});

const modelMock = {
 find: jest.fn(() => feedMock),
 deleteMany: jest.fn(),
 findOne: jest.fn(),
 deleteOne: jest.fn(),
 create: jest.fn(),
 updateOne: jest.fn(),
 findById: jest.fn(() => feedMock)
}

const feedMock = { id: "324ed", site: "elMundo", title: "title", url: "url" }
const feedService = new FeedService()

describe("Feed Service", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('finds a model by site', async () => {
    await feedService.findFeedBySite(feedMock.site)
    
    expect(mockerFeedModel.find).toHaveBeenNthCalledWith(1, { site: feedMock.site })
  })
  it('tries to find a unexisting model', async () => {
    mockerFeedModel.mockImplementationOnce(() => ({ find: jest.fn(() => null) } as any));

    expect(await feedService.findFeedBySite(feedMock.site)).toThrow()
  })
  it('deletes one model by site', async () => {
    await feedService.deleteFeedBySite(feedMock.site)
    
    expect(mockerFeedModel.deleteMany).toHaveBeenNthCalledWith(1, { site: feedMock.site })
  })
})
