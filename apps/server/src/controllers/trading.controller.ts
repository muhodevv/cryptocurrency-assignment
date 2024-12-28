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
            const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
            const pairs = await this.tradingService.getTradingPairs(limit);
            res.json({ pairs });
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch trading pairs' });
        }
    };
}