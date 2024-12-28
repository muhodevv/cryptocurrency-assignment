import { binanceClient } from '../lib/binanceClient';

export class TradingService {
  async getTradingPairs(limit?: number): Promise<string[]> {
    try {
      return await binanceClient.getTradingPairs(limit);
    } catch (error) {
      console.error('Error in TradingService.getTradingPairs:', error);
      throw error;
    }
  }
} 