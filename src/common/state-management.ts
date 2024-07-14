import { configureStore, createSlice } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';

enableMapSet();

interface StockState {
  stocks: Map<string, any>;
  selectedStock: string,
  openModal: boolean
}

const initialState: StockState = {
  stocks: new Map(),
  selectedStock: "",
  openModal: false
};
type StockDataType = { currency: any; symbol: any; values: any; };
const stocksSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    setStocks(state, action) {
      console.log(action)
      const { symbol, currency, values } = action.payload;
      const updatedStocks = new Map(state.stocks);
      updatedStocks.set(symbol, { symbol, currency, values });
      state.stocks = updatedStocks;
    },
    selectStock(state, action) {
      state.selectedStock = action.payload;
    },
    handleModal(state, action) {
      state.openModal = action.payload;
    }
  },
});

export const { setStocks, selectStock, handleModal } = stocksSlice.actions;

export const selectStocks = (state: { stocks: StockState }) => state.stocks;

export const store = configureStore({
  reducer: {
    stocks: stocksSlice.reducer,
  },
});

export const storeDataIntoLocalStorage = (data: any) => {
  // Update localStorage when stocks state changes
  console.log(data)
  localStorage.setItem('stocks', JSON.stringify(data));
};