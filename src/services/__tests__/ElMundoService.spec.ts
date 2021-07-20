import ElMundoService from '@/services/ElMundoService'
import getElMundoNews from "@/api/getElMundoNews";
import elMundoParser from "@/services/parsers/elMundoParser";

jest.mock('@/api/getElMundoNews', () => jest.fn(() => ({ test: 'test' })))
jest.mock('@/services/parsers/elMundoParser')

const elMundoService = new ElMundoService();

describe("alPaisService", () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('requests news page and saves its content', async () => {
    await elMundoService.requestPage()

    expect(getElMundoNews).toHaveBeenCalledTimes(1)
    expect(elMundoService.pageContent).toEqual({ test: 'test' })
  })
  it('generates models', () => {
    elMundoService.parseContent()

    expect(elMundoParser).toHaveBeenNthCalledWith(1, { test: 'test' })
  })
})