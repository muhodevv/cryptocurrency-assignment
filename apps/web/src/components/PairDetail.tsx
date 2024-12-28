import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { createChart, IChartApi } from 'lightweight-charts';
import { useEffect, useRef } from 'react';
import { getKlineDataService } from "@/services/tradingService";

interface PairDetailProps {
  isOpen: boolean;
  onClose: () => void;
  pair: string;
  data: {
    h: string;
    l: string;
    p: string;
    P: string;
  };
}

export function PairDetail({ isOpen, onClose, pair, data }: PairDetailProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  const klineQuery = useQuery({
    queryKey: ['kline', pair],
    queryFn: () => getKlineDataService(pair),
    enabled: isOpen && !!pair,
  })

  const klineData = klineQuery.data;

  useEffect(() => {
    if (!isOpen || !chartContainerRef.current || !klineData) return;

    const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { color: '#1a1a1a' },
          textColor: '#d1d4dc',
        },
        grid: {
          vertLines: { color: '#2c2c2c' },
          horzLines: { color: '#2c2c2c' },
        },
        width: chartContainerRef.current.clientWidth,
        height: 400,
        timeScale: {
          timeVisible: true,
          secondsVisible: false,
        },
      });

      const candlestickSeries = chart.addCandlestickSeries({
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderVisible: false,
        wickUpColor: '#26a69a',
        wickDownColor: '#ef5350',
      });

      const volumeSeries = chart.addHistogramSeries({
        color: '#26a69a',
        priceFormat: {
          type: 'volume',
        },
        priceScaleId: '', 
      });

      const formattedData = klineData.map((item: any) => ({
        time: item.time / 1000, 
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close
      }));

      const volumeData = klineData.map((item: any) => ({
        time: item.time / 1000,
        value: item.volume,
        color: item.close > item.open ? '#26a69a' : '#ef5350'
      }));

      candlestickSeries.setData(formattedData);
      volumeSeries.setData(volumeData);

      chart.timeScale().fitContent();

      chartRef.current = chart;

      const handleResize = () => {
        if (chartContainerRef.current && chart) {
          chart.applyOptions({
            width: chartContainerRef.current.clientWidth,
          });
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
      };
  }, [isOpen, pair, klineData]);

  if(!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
        if (!open) {
            onClose();
        }
    }}>
      <DialogContent className="max-w-full sm:max-w-[90vw]">
        <DialogHeader>
          <DialogTitle>{pair} Details</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 mt-4 w-full max-w-[90%]">
          <div className="p-4 rounded-lg border border-border">
            <div className="text-sm text-muted-foreground">24h High</div>
            <div className="text-lg font-semibold">${Number(data.h)}</div>
          </div>
          <div className="p-4 rounded-lg border border-border">
            <div className="text-sm text-muted-foreground">24h Low</div>
            <div className="text-lg font-semibold">${Number(data.l)}</div>
          </div>
          <div className="p-4 rounded-lg border border-border">
            <div className="text-sm text-muted-foreground">24h Change</div>
            <div className="text-lg font-semibold">${Number(data.p)}</div>
          </div>
          <div className="p-4 rounded-lg border border-border">
            <div className="text-sm text-muted-foreground">24h Change %</div>
            <div className={`text-lg font-semibold ${Number(data.P) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {Number(data.P).toFixed(2)}%
            </div>
          </div>
        </div>

        <div ref={chartContainerRef} className="mt-6 rounded-lg border border-border p-4 w-full max-w-[90%]" />
      </DialogContent>
    </Dialog>
  );
} 