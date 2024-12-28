import { Pair } from "@/types";
import { PairCard } from "./PairCard";
import { Button } from "@/components/ui/button";

export function PairList({
  pairsData,
  selectedPairs,
  setSelectedPairs,
}: {
  pairsData: Pair[];
  selectedPairs: string[];
  setSelectedPairs: (pairs: string[]) => void;
}) {
  const togglePair = (id: string) => {
    const newPairs = selectedPairs.includes(id)
      ? selectedPairs.filter((pair) => pair !== id)
      : [...selectedPairs, id];
    setSelectedPairs(newPairs);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 overflow-auto select-none">
      <div className="flex items-center justify-between px-4 py-4 bg-background border-b sticky top-0 z-50">
        <div>
          <h2 className="text-2xl font-semibold text-primary-foreground">My Pairs</h2>
        </div>
        <div>
          <p className="text-sm text-gray-400">
            {selectedPairs.length} / {pairsData.length} selected
          </p>
        </div>
        <div className="flex gap-2 items-start">
          <Button variant={"outline"} className="text-primary-foreground">Back</Button>
          <Button>Subscribe Pairs</Button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="rounded-lg shadow-lg p-6">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {pairsData.map((pair) => (
              <PairCard
                key={pair.symbol}
                pair={pair}
                isSelected={selectedPairs.includes(pair.symbol)}
                onSelect={() => togglePair(pair.symbol)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
