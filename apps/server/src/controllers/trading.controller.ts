import { Request, Response } from "express";
import { TradingService } from "../services/trading.service";
import { binanceClient } from "../lib/binanceClient";

export class TradingController {
    private readonly tradingService: TradingService;

    constructor() {
        this.tradingService = new TradingService(binanceClient);
    }

    getTradingPairs = async (req: Request, res: Response): Promise<void> => {
        try {
            const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;
            const pairs = await this.tradingService.getTradingPairs(limit);
            res.json({ pairs });
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch trading pairs' });
        }
    };

    getKlineData = async (req: Request, res: Response): Promise<void> => {
        try {
            const { symbol } = req.params;
            const klineData = await this.tradingService.getKlineData(symbol);
            res.json({ klineData });
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch kline data' });
        }
    };
}