import FeedService from '@/domain/services/FeedService'
import FeedModel from "@/domain/models/Feed";

const feedMock = { _id: "324ed", site: "elMundo", title: "title", url: "url" }
const feedService = new FeedService()
const findSpy = jest.spyOn(feedService, 'find')
const modelMock = {
 find: jest.fn(() => feedMock),
 deleteMany: jest.fn(),
 findOne: jest.fn(),
 deleteOne: jest.fn(),
 create: jest.fn(),
 updateOne: jest.fn(),
 findById: jest.fn(() => feedMock)
}
feedService.model = modelMock as any


describe("Feed Service", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('finds a model by site', async () => {
    await feedService.findFeedBySite(feedMock.site)
    
    expect(findSpy).toHaveBeenNthCalledWith(1, { site: feedMock.site })
  })
  it('tries to find a unexisting model', async () => {
    feedService.model.find = jest.fn(() => null) 

    await expect(feedService.findFeedBySite(feedMock.site)).rejects.toThrow('Feed not exists')
  })
  it('deletes one model by site', async () => {
    await feedService.deleteFeedBySite(feedMock.site)
    
    expect(feedService.model.deleteMany).toHaveBeenNthCalledWith(1, { site: feedMock.site })
  })
})
