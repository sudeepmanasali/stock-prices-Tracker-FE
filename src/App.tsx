import { useEffect } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import StockCard from './component/StockCard';
import { API_REQUEST_ROUTES, SOCKET_CHANNEL_NAMES } from './common/constants';
import axios from 'axios';
import { handleModal, selectStocks, setStocks, storeDataIntoLocalStorage } from './common/state-management';
import { DataTable } from './component/StockInfo';
import Modal from '@mui/material/Modal';
import socket from './common/SocketManager';

function App() {
  const ReduxStocks = useSelector(selectStocks);
  const dispatch = useDispatch();

  const handleResponseData = (data: any) => {
    storeDataIntoLocalStorage(data)

    data.stocks.map((stock: any): void => {
      dispatch(setStocks({
        currency: stock.currency,
        symbol: stock.symbol,
        values: stock?.stockData
      }));
    });
  }

  const fetchStockData = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_API_URL}${API_REQUEST_ROUTES.GET_STOCK_DATA}`).then((response: any) => {
        const data = response.data;
        handleResponseData(data);
      });

    } catch (error) {
      // alert('Failed to fetch stock data');
      const localStorageStocks = localStorage.getItem('stocks');
      if (localStorageStocks) {
        handleResponseData(JSON.parse(localStorageStocks));
      }
    }
  };

  useEffect(() => {
    fetchStockData();
    socket.on(SOCKET_CHANNEL_NAMES.STOCK_DATA, (response) => {
      handleResponseData(response);
    });

    return () => {
      socket.off(SOCKET_CHANNEL_NAMES.STOCK_DATA);
    };
  }, []);

  const handleClose = () => {
    dispatch(handleModal(false));
  };


  return (
    <div className="main-container">
      <h2 className="header-name">Real Time Stock Prices </h2>

      <div className="boxes">
        <div className='stock-container'>
          {
            Array.from(ReduxStocks.stocks.keys()).map((stockName: any) => {
              return <StockCard stockName={stockName} />
            })
          }
        </div>

        <Modal
          className='modal'
          open={ReduxStocks.openModal}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description">
          <div className="modal-container">
            <DataTable />
          </div>
        </Modal>
      </div>
    </div >
  );
}

export default App;
