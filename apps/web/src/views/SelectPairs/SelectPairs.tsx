import { Pair } from "@/types";
import { PairCard } from "./PairCard";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SelectPairs({
  pairsData,
  selectedPairs,
  setSelectedPairs,
  isOpen,
  onClose
}: {
  pairsData: Pair[];
  selectedPairs: string[];
  setSelectedPairs: (pairs: string[]) => void;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [currentPairs, setCurrentPairs] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const togglePair = (id: string) => {
   const newPairs = currentPairs.includes(id) ? currentPairs.filter((pair) => pair !== id) : [...currentPairs, id];

   setCurrentPairs(newPairs);
  }

  const onSubscribe = () => {
    setSelectedPairs(currentPairs);
  }

  useEffect(() => {
    setCurrentPairs(selectedPairs)
  }, [selectedPairs])

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    setCurrentPairs([]);
  }

  const filteredPairs = pairsData.filter((pair) =>
    searchQuery ? pair.symbol.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 overflow-auto select-none z-50 bg-gray-50">
      <div className="flex items-center justify-between px-4 py-4 border-b sticky top-0 z-50 bg-white">
        <div>
          <h2 className="text-2xl font-semibold">My Pairs</h2>
        </div>
        <div>
          <p className="text-sm text-gray-400">
            {selectedPairs.length} / {pairsData.length} selected
          </p>
        </div>
        <div className="flex gap-2 items-start">
          <Button variant={"outline"} onClick={handleClose}>Back</Button>
          <Button onClick={onSubscribe}>Subscribe Pairs</Button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-4">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="py-4">
            <div className="w-full max-w-[400px] px-4 flex justify-center items-center bg-gray-50 rounded-lg border-2 border-gray-200 focus-within:border-primary">
              <Search className="w-6 h-6 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search pairs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-lg border-none bg-transparent !ring-0 !ring-offset-0"
              />
            </div>
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPairs.map((pair) => (
              <PairCard
                key={pair.symbol}
                pair={pair}
                isSelected={currentPairs.includes(pair.symbol)}
                onSelect={() => togglePair(pair.symbol)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
