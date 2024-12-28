import { IBinanceClient } from "../types";
import { Spot, Interval } from '@binance/connector-typescript';

export class TradingService {
  constructor(private readonly binanceClient: IBinanceClient) {}

  async getTradingPairs(limit?: number): Promise<any> {
    try {
      const binanceClient = this.binanceClient.getClient();
      const exchangeInfo = await binanceClient.exchangeInformation();

      return exchangeInfo.symbols
        .filter(symbol => symbol.status === 'TRADING')
        .map(symbol => ({
          baseAsset: symbol.baseAsset,
          quoteAsset: symbol.quoteAsset,
          symbol: symbol.symbol,
          status: symbol.status,
        }))
        .slice(0, limit);
    } catch (error) {
      console.error('Error in TradingService.getTradingPairs:', error);
      throw error;
    }
  }

  async getKlineData(symbol: string): Promise<any> {
    try {
      const binanceClient = this.binanceClient.getClient();
      const klines = await binanceClient.uiklines(symbol, Interval["15m"], { limit: 96 });
      
      return klines.map((kline: any[]) => ({
        time: kline[0],
        open: Number(kline[1]),
        high: Number(kline[2]),
        low: Number(kline[3]),
        close: Number(kline[4]),
        volume: Number(kline[5])
      }));
    } catch (error) {
      console.error('Error fetching kline data:', error);
      throw error;
    }
  }
} 