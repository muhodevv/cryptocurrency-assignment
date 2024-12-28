import { Spot } from '@binance/connector-typescript';
import { IBinanceClient } from '../types';

class BinanceClient implements IBinanceClient {
  private client: Spot;

  constructor(apiKey: string, apiSecret: string, baseUrl: string) {
    this.client = new Spot(apiKey, apiSecret, { baseURL: baseUrl, timeout: 10000 });
  }

  async getTradingPairs(limit: number = 100): Promise<string[]> {
    try {
      const response = await this.client.exchangeInformation();

      return response.symbols
        .filter(code => code.status === 'TRADING')
        .slice(0, limit)
        .map(code => code.symbol);
    } catch (error:any) {
      console.error('Error fetching trading pairs:', error);
      throw error;
    }
  }
}

const API_KEY = process.env.BINANCE_API_KEY!;
const API_SECRET = process.env.BINANCE_API_SECRET!;
const BASE_URL = 'https://api.binance.com';

export const binanceClient = new BinanceClient(API_KEY, API_SECRET, BASE_URL);
