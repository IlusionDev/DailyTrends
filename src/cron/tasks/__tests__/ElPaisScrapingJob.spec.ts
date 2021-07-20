const elPaisServiceMock = {
  start: jest.fn(() => [{
    test: 'test'
  }])
}
const feedServiceMock = {
  deleteFeedBySite: jest.fn(() => new Promise((resolv) => { resolv(true)}))
}

jest.doMock("@/services/ElPaisService", () => jest.fn(() => elPaisServiceMock))
jest.doMock("@/domain/services/FeedService", () => jest.fn(() => feedServiceMock))
const feedModelMock = {
  insertMany: jest.fn()
}
jest.doMock("@/domain/models/Feed", () => feedModelMock)

import Feed from "@/domain/models/Feed";
import job from '@/cron/tasks/elPaisScrapingJob';
import logger from "@/config/winston";
import ElPaisService from "@/services/ElPaisService";
import FeedService from "@/domain/services/FeedService";

jest.mock("@/config/winston")
jest.mock("@/domain/models/Feed")


describe('Check if cron jobs works', () => {
  it('checks that task is executed', async () => {
    await job.cronTask()

    expect(logger.info).toHaveBeenNthCalledWith(1, "Executing Cron Task - ElPais - Scraping")
    expect(ElPaisService).toHaveBeenCalledTimes(1)
    expect(FeedService).toHaveBeenCalledTimes(1)
    expect(elPaisServiceMock.start).toHaveBeenCalledTimes(1)
    expect(feedServiceMock.deleteFeedBySite).toHaveBeenCalledTimes(1)
    expect(feedModelMock.insertMany).toHaveBeenNthCalledWith(1, [{ test: 'test' }])
  })
  
})