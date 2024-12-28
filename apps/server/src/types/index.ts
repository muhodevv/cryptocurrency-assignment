export interface IBinanceClient {
    getTradingPairs(): Promise<string[]>;
}