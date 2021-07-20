import ModelService from '@/domain/services/ModelService'
import feedFactory from '@/domain/factories/feedFactory'

const modelMock = {
 find: jest.fn(),
 findOne: jest.fn(),
 deleteOne: jest.fn(),
 create: jest.fn(),
 updateOne: jest.fn(),
 findById: jest.fn(() => feedMock)
}
const feedMock = { id: "324ed", site: "elMundo", title: "title", url: "url" }
const modelService = new ModelService(modelMock as any)

describe("Model Service", () => {
  it('finds a model', async () => {
    await modelService.find(feedMock)
    
    expect(modelMock.find).toHaveBeenNthCalledWith(1, feedMock)
  })
  it('finds one model', async () => {
    await modelService.findOne(feedMock)
    
    expect(modelMock.findOne).toHaveBeenNthCalledWith(1, feedMock)
  })
  it('finds one model', async () => {
    await modelService.findOne(feedMock)
    
    expect(modelMock.findOne).toHaveBeenNthCalledWith(1, feedMock)
  })
  it('deletes one model', async () => {
    await modelService.delete(feedMock)
    
    expect(modelMock.findOne).toHaveBeenNthCalledWith(1, feedMock)
    expect(modelMock.findById).toHaveBeenNthCalledWith(1, feedMock.id)
    expect(modelMock.deleteOne).toHaveBeenNthCalledWith(1, feedMock)
  })

  it('inserts one model', async () => {
    await modelService.insert(feedMock as any)
    
    expect(modelMock.findOne).toHaveBeenNthCalledWith(1, feedMock)
    expect(modelMock.create).toHaveBeenNthCalledWith(1, feedMock)
  })
  it('update one model', async () => {
    await modelService.update(feedMock, feedMock as any)
    
    expect(modelMock.findById).toHaveBeenNthCalledWith(1, feedMock.id)
    expect(modelMock.updateOne).toHaveBeenNthCalledWith(1, {_id: feedMock.id}, { $set: { ...feedMock } })
  })
})