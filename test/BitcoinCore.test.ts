import BitcoinCore from '../src/service/bitcoin/BitcoinCore'
import { parseQueryString } from '../src/service/bitcoin/BitcoinRouter'
import 'dotenv/config'
import axios from 'axios'
jest.mock('axios')
// eslint-disable-next-line max-len
// const randomMnemonic = 'creek joy sea brain gravity execute month two voyage process bind coffee ecology body depend artwork erode punch episode unfair alpha amount cart clip'
// eslint-disable-next-line max-len
const API_URL = process.env.BLOCKBOOK_URL
const vpub = 'vpub5Y3owbd2JX4bzwgH4XS5RSRzSnRMX6NYjqkd31sJEB5UGzqkq1v7iASC8R6vbxCWQ1xDDCm63jecwx3fkmv8FWHH5KeQeUyesrdJithe54K'

describe('BitcoinCore unit tests', () => {
  const bitcoinCoreInstance = new BitcoinCore(API_URL, axios)
  test('Fetch a bitcoin tesnet xpub information', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: {
        balance: 0, btc: 0, address: '', totalReceived: 0, totalSent: 0, txs: []
      }
    })
    const xpubData = await bitcoinCoreInstance.getXpubInfo(vpub)
    const properties = ['balance', 'btc', 'address', 'totalReceived', 'totalSent', 'txs']
    for (const prop of properties) {
      expect(xpubData).toHaveProperty(prop)
    }
  })
  test('Fetch a bitcoin tesnet xpub balance', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: {
        balance: 0, btc: 0, address: '', totalReceived: 0, totalSent: 0
      }
    })
    const xpubData = await bitcoinCoreInstance.getXpubBalance(vpub)
    const properties = ['balance', 'btc', 'address', 'totalReceived', 'totalSent']
    for (const prop of properties) {
      expect(xpubData).toHaveProperty(prop)
    }
  })
  test('Fetch a bitcoin tesnet xpub information with page = 1 and pageSize = 10', async () => {
    const queryMock = {
      page: 1,
      pageSize: 10
    };
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: {
        balance: 0, btc: 0, address: '', totalReceived: 0, totalSent: 0, txs: [], page: 1, itemsOnPage: 10
      }
    })

    const parsedQuery = parseQueryString(queryMock)
    const xpubData = await bitcoinCoreInstance.getXpubInfo(vpub, parsedQuery)
    const properties = ['balance', 'btc', 'address', 'totalReceived', 'totalSent', 'txs', 'page']
    for (const prop of properties) {
      expect(xpubData).toHaveProperty(prop)
    }
    expect(xpubData).toHaveProperty('page', 1)
    expect(xpubData).toHaveProperty('itemsOnPage', 10)
  })
})