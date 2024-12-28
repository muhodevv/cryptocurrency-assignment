import { Router } from 'express';
import { TradingController } from '../controllers/trading.controller';

const router = Router();
const tradingController = new TradingController();

router.get('/pairs', tradingController.getTradingPairs);

export const tradingRoutes = router;