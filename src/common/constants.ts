export const enum SOCKET_CHANNEL_NAMES {
    STOCK_DATA = "stockdata"
}

export const enum API_REQUEST_ROUTES {
    GET_STOCK_DATA = '/api/stocks',
}

export interface StockState {
    [symbol: string]: StockDataStructure[];
}

export interface StockDataStructure {
    symbol: string,
    currency: string,
    timeStamp: string,
    stockData: {
        open: string,
        close: string,
        low: string,
        high: string,
        valume: string,
        datetime: string
    }
}