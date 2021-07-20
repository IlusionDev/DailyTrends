jest.doMock('@/domain/factories/feedFactory', () => jest.fn(() => feedMock))

import PageServiceBase from '@/services/PageServiceBase'
import feedFactory from '@/domain/factories/feedFactory'

const feedMock = {
  _id:'60f5434878f16a08c331dcfe',
  url:"https://www.elmundo.es/economia/2021/07/18/60f458a721efa0a9028b462b.ht...",
  title:"Plan de Recuperaci�n. Holanda pide supeditar los fondos a que Espa�a c...",
  site: "elPais",
  images: {
    default: 'test'
  }
}

const newsMock = [{
  url:"https://www.elmundo.es/economia/2021/07/18/60f458a721efa0a9028b462b.ht...",
  title:"Plan de Recuperaci�n. Holanda pide supeditar los fondos a que Espa�a c...",
  site: "elPais",
  images: {
    default: 'test'
  }
}]

const pageServiceBase = new PageServiceBase();
const generateModels = jest.spyOn(pageServiceBase, 'generateModels')
const parseContent = jest.spyOn(pageServiceBase, 'parseContent')
const requestPage = jest.spyOn(pageServiceBase, 'requestPage')

describe("PageServiceBase", () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('generates models', () => {
    pageServiceBase.news = newsMock
    pageServiceBase.generateModels()

    
    expect(feedFactory).toHaveBeenCalledTimes(1)
    expect(pageServiceBase.models[0].images).toEqual({
      default: 'test'
    })
    expect(pageServiceBase.models[0].site).toEqual(newsMock[0].site)
    expect(pageServiceBase.models[0].url).toEqual(newsMock[0].url)
    expect(pageServiceBase.models[0].title).toEqual(newsMock[0].title)
  })

  it('starts process and executes all needed procedures', async () => {
    pageServiceBase.news = newsMock
    await pageServiceBase.start()

    expect(generateModels).toHaveBeenCalledTimes(1)
    expect(parseContent).toHaveBeenCalledTimes(1)
    expect(requestPage).toHaveBeenCalledTimes(1)
  })
})