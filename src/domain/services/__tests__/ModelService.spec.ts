import ModelService from '@/domain/services/ModelService'
import feedFactory from '@/domain/factories/feedFactory'
import { model } from 'mongoose'

const modelMock = {
 find: jest.fn(),
 findOne: jest.fn(),
 deleteOne: jest.fn(),
 create: jest.fn(),
 updateOne: jest.fn(),
 findById: jest.fn(() => feedMock)
}
const feedMock = { id: "324ed", site: "elMundo", title: "title", url: "url" }
let modelService = new ModelService(modelMock as any)

describe("Model Service", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    modelService = new ModelService(modelMock as any)
  })

  it('finds a model', async () => {
    await modelService.find(feedMock)
    
    expect(modelMock.find).toHaveBeenNthCalledWith(1, feedMock)
  })
  it('finds one model', async () => {
    await modelService.findOne(feedMock)
    
    expect(modelMock.findOne).toHaveBeenNthCalledWith(1, feedMock)
  })
  it('deletes one model', async () => {
    await modelService.delete(feedMock)
    
    expect(modelMock.findById).toHaveBeenNthCalledWith(1, feedMock.id)
    expect(modelMock.deleteOne).toHaveBeenNthCalledWith(1, feedMock)
  })

  it('deletes one model but fails', async () => {
    modelMock.findById = jest.fn(() => null)
    await expect(modelService.delete(feedMock)).rejects.toThrow('Feed not exists')
  })

  it('inserts one model', async () => {
    await modelService.insert(feedMock as any)
    
    expect(modelMock.findOne).toHaveBeenNthCalledWith(1, {
        "site": "elMundo",
        "title": "title",
        "url": "url",
      })
    expect(modelMock.create).toHaveBeenNthCalledWith(1, feedMock)
  })
  it('update one model', async () => {
    modelMock.findById = jest.fn(() => feedMock)
    await modelService.update(feedMock, feedMock as any)

    expect(modelMock.findById).toHaveBeenNthCalledWith(1, feedMock.id)
    expect(modelMock.updateOne).toHaveBeenNthCalledWith(1, {_id: feedMock.id}, { $set: { ...feedMock } })
  })
  it('update one model but fails', async () => {
    modelMock.findById = jest.fn(() => null)
    await expect(modelService.update(feedMock, feedMock as any)).rejects.toThrow('Feed not exists')
  })
})