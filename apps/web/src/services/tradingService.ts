import { apiClient } from "@/lib/apiClient";
import { transformArray, transformPair } from "@/lib/transforms";
import { Pair } from "@/types";

export async function getAllPairsService() {
    const response = await apiClient.get("/trading/pairs");

    return transformArray<Pair>(response.data?.pairs).map(transformPair)
}

export async function getKlineDataService(symbol: string) {
    const response = await apiClient.get(`/trading/kline/${symbol}`);
    return response.data?.klineData;
}
