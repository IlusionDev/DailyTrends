import getElMundoNews from '@/api/getElMundoNews'
import getPage from '@/api/getPage'
jest.mock('@/api/getPage', () => jest.fn(() => ({})))

const PAGE_URL = "https://www.elmundo.es/";
describe('getElMundoNews API call', () => {
  it('makes a specific url call', async () => {
    await getElMundoNews()

    expect(getPage).toHaveBeenNthCalledWith(1, PAGE_URL)
  })
})