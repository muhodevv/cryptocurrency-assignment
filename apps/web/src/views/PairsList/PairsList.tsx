import { Button } from "@/components/ui/button";
import { PairDetail } from "@/components/PairDetail";
import { useState } from "react";
import { Eye } from "lucide-react";

export function PairsList({selectedPairs, pairsSet}: {selectedPairs: string[], pairsSet: Record<string, any>}) {
    const [selectedPair, setSelectedPair] = useState<string | null>(null);

    return (
      <>
        {selectedPairs.length > 0 && (
          <div className="mt-8 overflow-x-auto rounded-lg">
            <table className="min-w-full bg-background border border-border">
              <thead>
                <tr className="border-b border-border bg-gray-50">
                  <th className="px-6 py-3 text-left text-sm font-semibold">Symbol</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">24h Change</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">24h Volume</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedPairs.map((pair) => {
                  const tickerData = pairsSet[pair];
                  return (
                    <tr key={pair} className="border-b border-border">
                      <td className="px-6 py-4 text-sm">{pair}</td>
                      <td className="px-6 py-4 text-sm">
                        {tickerData?.c || 'Loading...'}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={tickerData?.P >= 0 ? 'text-green-500' : 'text-red-500'}>
                          {tickerData?.P ? `${Number(tickerData.P).toFixed(2)}%` : 'Loading...'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {tickerData?.v ? Number(tickerData.v).toFixed(2) : 'Loading...'}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedPair(pair)}
                          disabled={!tickerData}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {selectedPair && pairsSet[selectedPair] && (
          <PairDetail
            isOpen={!!selectedPair}
            onClose={() => setSelectedPair(null)}
            pair={selectedPair}
            data={pairsSet[selectedPair]}
          />
        )}
      </>
    );
}