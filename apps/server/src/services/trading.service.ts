import { IBinanceClient } from "../types";

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
} 