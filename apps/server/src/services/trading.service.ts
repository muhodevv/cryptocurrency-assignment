import { IBinanceClient } from "../types";

export class TradingService {
  constructor(private readonly binanceClient: IBinanceClient) {}

  async getTradingPairs(limit?: number): Promise<any> {
    try {
      const binanceClient = this.binanceClient.getClient();
      const exchangeInformationRes = await binanceClient.exchangeInformation();

      return exchangeInformationRes.symbols.filter(symbol => symbol.status === 'TRADING').map(symbol => {
        return {
          baseAsset: symbol.baseAsset,
          quoteAsset: symbol.quoteAsset,
          symbol: symbol.symbol,
          status: symbol.status,
        }
      })
    } catch (error) {
      console.error('Error in TradingService.getTradingPairs:', error);
      throw error;
    }
  }
} 