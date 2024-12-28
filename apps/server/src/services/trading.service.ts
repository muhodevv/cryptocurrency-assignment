import { IBinanceClient } from "../types";

export class TradingService {
  constructor(private readonly binanceClient: IBinanceClient) {}

  async getTradingPairs(limit?: number): Promise<string[]> {
    try {
      return await this.binanceClient.getTradingPairs();
    } catch (error) {
      console.error('Error in TradingService.getTradingPairs:', error);
      throw error;
    }
  }
} 