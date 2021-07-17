import path from 'path'
import fs from 'fs'
import cronLoader from '@/domain/services/CronLoader'
import cron from 'cron'
import logger from "@/config/winston";

jest.mock('path', () => {
  return {
    resolve: jest.fn(() => "./__tests__/__mocks__"),
  }
}) 

jest.mock('@/config/winston', () => {
  return {
    logger: {error:jest.fn()}
  }
}) 

jest.mock('fs', () => {
  return {
    readdir: jest.fn((path, cb) => cb(false, ["cronTask.ts"]))
  }
})


jest.mock('cron', () => {
  return {
    CronJob: jest.fn(() => ({}))
  }
})


describe('Cron tests', () => {
  it('loads all cron tasks and executes', async () => {
   await cronLoader()
    expect(path.resolve).toHaveBeenNthCalledWith(1, expect.anything(), "../../", "cron/tasks")
    expect(fs.readdir).toHaveBeenNthCalledWith(1, "./__tests__/__mocks__", expect.anything())
    expect(cron.CronJob).toBeCalledTimes(1)
  })
})