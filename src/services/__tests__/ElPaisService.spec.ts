import ElPaisService from '@/services/ElPaisService'
import getElPaisNews from "@/api/getElPaisNews";
import elPaisParser from "@/services/parsers/elPaisParser";

jest.mock('@/api/getElPaisNews', () => jest.fn(() => ({ test: 'test' })))
jest.mock('@/services/parsers/elPaisParser')

const elPaisService = new ElPaisService();

describe("alPaisService", () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('requests news page and saves its content', async () => {
    await elPaisService.requestPage()

    expect(getElPaisNews).toHaveBeenCalledTimes(1)
    expect(elPaisService.pageContent).toEqual({ test: 'test' })
  })
  it('generates models', () => {
    elPaisService.parseContent()

    expect(elPaisParser).toHaveBeenNthCalledWith(1, { test: 'test' })
  })
})