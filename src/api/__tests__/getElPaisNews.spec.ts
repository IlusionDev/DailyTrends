import getElPaisNews from '@/api/getElPaisNews'
import getPage from '@/api/getPage'
jest.mock('@/api/getPage', () => jest.fn(() => ({})))

const PAGE_URL = "https://elpais.com/";
describe('getElPaisNews API call', () => {
  it('makes a specific url call', async () => {
    await getElPaisNews()

    expect(getPage).toHaveBeenNthCalledWith(1, PAGE_URL)
  })
})