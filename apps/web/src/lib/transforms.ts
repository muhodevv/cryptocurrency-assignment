function transformString(str: any) {
    return String(str)
}

export function transformArray<T>(arr: any): T[] {
    return Array.isArray(arr) ? arr : []
}

export function transformPair(pair: any) {
    return {
        baseAsset: transformString(pair?.baseAsset),
        quoteAsset: transformString(pair?.quoteAsset),
        symbol: transformString(pair?.symbol),
        status: transformString(pair?.status),
    }
}