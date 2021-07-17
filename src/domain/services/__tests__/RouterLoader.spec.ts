import path from 'path'
import fs from 'fs'
import routerLoader from '@/domain/services/RouterLoader'

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
    readdirSync: jest.fn((path,) => ["routerFile.ts"])
  }
})
  
const app = {use: jest.fn()} as any
describe('Router loader tests', () => {
  it('loads all routes into express', () => {
    routerLoader(app)

    expect(path.resolve).toHaveBeenNthCalledWith(1, expect.anything(), "../../", "routes")
    expect(fs.readdirSync).toHaveBeenNthCalledWith(1, "./__tests__/__mocks__")
    expect(app.use).toHaveBeenNthCalledWith(1, "/main", expect.anything())
  })
})