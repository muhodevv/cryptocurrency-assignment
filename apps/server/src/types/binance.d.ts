declare global {
  interface IBinanceClient {
    getTradingPairs(limit?: number): Promise<string[]>;
  }
}

export {}; 