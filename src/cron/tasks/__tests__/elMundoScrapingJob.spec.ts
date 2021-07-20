jest.doMock("@/services/ElMundoService", () => jest.fn(() => elMundoServiceMock))
jest.doMock("@/domain/services/FeedService", () => jest.fn(() => feedServiceMock))
const feedModelMock = {
  insertMany: jest.fn()
}
jest.doMock("@/domain/models/Feed", () => feedModelMock)

import Feed from "@/domain/models/Feed";
import job from '@/cron/tasks/elMundoScrapingJob';
import logger from "@/config/winston";
import ElMundoService from "@/services/ElMundoService";
import FeedService from "@/domain/services/FeedService";

jest.mock("@/config/winston")
jest.mock("@/domain/models/Feed")

const elMundoServiceMock = {
  start: jest.fn(() => [{
    test: 'test'
  }])
}
const feedServiceMock = {
  deleteFeedBySite: jest.fn(() => new Promise((resolv) => { resolv(true)}))
}
describe('Check if cron jobs works', () => {
  it('checks that task is executed', async () => {
    await job.cronTask()

    expect(logger.info).toHaveBeenNthCalledWith(1, "Executing Cron Task - ElMundo - Scraping")
    expect(ElMundoService).toHaveBeenCalledTimes(1)
    expect(FeedService).toHaveBeenCalledTimes(1)
    expect(elMundoServiceMock.start).toHaveBeenCalledTimes(1)
    expect(feedServiceMock.deleteFeedBySite).toHaveBeenCalledTimes(1)
    expect(feedModelMock.insertMany).toHaveBeenNthCalledWith(1, [{ test: 'test' }])
  })
  
})