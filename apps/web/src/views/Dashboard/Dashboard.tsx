import { getAllPairsService } from "@/services/tradingService"
import { useQuery } from "@tanstack/react-query"
import { PairList } from "./PairList"
import { useEffect, useState } from "react"
import { useSocketContext } from "@/context/SocketContext/hook"
import { transformArray } from "@/lib/transforms"

function JSONParse(data: string) {
    try {
        return JSON.parse(data);
    } catch {
        return ""
    }
}

export default function Dashboard() {
    const [selectedPairs, setSelectedPairs] = useState<string[]>([])
    const pairsQuery = useQuery({
        queryKey: ["pairs"],
        queryFn: getAllPairsService
    })

    const { socket } = useSocketContext();

    const { data, isLoading, error } = pairsQuery

    useEffect(() => {
      const persistedPairs = localStorage.getItem("pairs");
      if(persistedPairs) {
        setSelectedPairs(transformArray(JSONParse(persistedPairs)).map(pair => String(pair)));
      }
    }, [])

    useEffect(() => {
      if(!socket || !selectedPairs.length) return;

      socket.emit("subscribe_pairs", selectedPairs);
    },[selectedPairs])

    useEffect(() => {
      socket?.on("pairs_updates",(data) => {
        console.log(data);
      })
    },[])

    if (isLoading) return <div className="text-center mt-8">Loading...</div>
    if (error) return <div className="text-center mt-8 text-red-500">Error: {(error as Error).message}</div>
    
    return (
        <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#3861fb]">Cryptocurrency Dashboard</h1>
        <PairList pairsData={data || []} selectedPairs={selectedPairs} setSelectedPairs={setSelectedPairs} />
      </div>
    )
}