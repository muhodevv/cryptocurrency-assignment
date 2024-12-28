import { Router } from 'express';
import { TradingController } from '../controllers/trading.controller';

const router = Router();
const tradingController = new TradingController();

router.get('/pairs', tradingController.getTradingPairs);
router.get('/kline/:symbol', tradingController.getKlineData);

export const tradingRoutes = router;