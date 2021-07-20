import axios from 'axios'
import getPage from '@/api/getPage'
jest.mock('axios')

const PAGE_URL = "urlTest";
describe('getElPaisNews API call', () => {
  it('makes a specific url call', async () => {
    await getPage(PAGE_URL)

    expect(axios.get).toHaveBeenNthCalledWith(1, PAGE_URL)
  })
})