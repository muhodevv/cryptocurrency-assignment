import { Spot } from '@binance/connector-typescript';

export interface IBinanceClient {
    getClient(): Spot;
}