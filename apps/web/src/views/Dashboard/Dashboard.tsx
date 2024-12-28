import { getAllPairsService } from "@/services/tradingService";
import { useQuery } from "@tanstack/react-query";
import { SelectPairs } from "../SelectPairs/SelectPairs";
import { useEffect, useState } from "react";
import { useSocketContext } from "@/context/SocketContext/hook";
import { transformArray } from "@/lib/transforms";
import { PairsList } from "../PairsList/PairsList";
import { Button } from "@/components/ui/button";

function JSONParse(data: string) {
  try {
    return JSON.parse(data);
  } catch {
    return "";
  }
}

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPairs, setSelectedPairs] = useState<string[]>([]);
  const [pairsSet, setPairsSet] = useState<Record<string, any>>({});
  const pairsQuery = useQuery({
    queryKey: ["pairs"],
    queryFn: getAllPairsService,
  });

  const { socket } = useSocketContext();

  const { data, isLoading, error } = pairsQuery;

  useEffect(() => {
    const persistedPairs = localStorage.getItem("pairs");
    if (persistedPairs) {
      setSelectedPairs(
        transformArray(JSONParse(persistedPairs)).map((pair) => String(pair))
      );
    } else {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!socket || !selectedPairs.length) return;

    socket.emit("subscribe_pairs", selectedPairs);
  }, [selectedPairs]);

  useEffect(() => {
    socket?.on("ticker", (data) => {
      setPairsSet((prev) => ({
        ...prev,
        [data.s]: data,
      }));
    })
  }, []);

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (error)
    return (
      <div className="text-center mt-8 text-red-500">
        Error: {(error as Error).message}
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Cryptocurrency Dashboard
        </h1>
        <Button onClick={() => setIsOpen(true)}>Manage Pairs</Button>
      </div>
      <SelectPairs
        pairsData={data || []}
        selectedPairs={selectedPairs}
        setSelectedPairs={(_pairs) => {
          setSelectedPairs(_pairs);
          setIsOpen(false);
        }}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <PairsList selectedPairs={selectedPairs} pairsSet={pairsSet} />
    </div>
  );
}
