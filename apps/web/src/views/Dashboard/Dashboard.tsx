import { getAllPairsService } from "@/services/tradingService"
import { useQuery } from "@tanstack/react-query"
import { PairList } from "./PairList"
import { useState } from "react"

export default function Dashboard() {
    const [selectedPairs, setSelectedPairs] = useState<string[]>([])
    const pairsQuery = useQuery({
        queryKey: ["pairs"],
        queryFn: getAllPairsService
    })

    const { data, isLoading, error } = pairsQuery

    if (isLoading) return <div className="text-center mt-8">Loading...</div>
    if (error) return <div className="text-center mt-8 text-red-500">Error: {(error as Error).message}</div>
    
    return (
        <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#3861fb]">Cryptocurrency Dashboard</h1>
        <PairList pairsData={data || []} selectedPairs={selectedPairs} setSelectedPairs={setSelectedPairs} />
      </div>
    )
}