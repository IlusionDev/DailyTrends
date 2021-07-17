import job from '@/cron/tasks/newsScrapingJob';
import logger from "@/config/winston";

jest.mock("@/config/winston")

describe('Check if cron jobs works', () => {
  it('checks that task is executed', () => {
    job.cronTask()
    
    expect(logger.info).toHaveBeenNthCalledWith(1, "Executing Cron Task - NewsScraping")
  })
  
  it('checks that task execution time remains for each minute', () => {    
    expect(job.execPeriod).toEqual("*/1 * * * *")
  })
})