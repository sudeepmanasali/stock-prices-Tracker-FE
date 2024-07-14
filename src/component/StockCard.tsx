import { Paper, Typography, Box } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleModal, selectStock, selectStocks } from '../common/state-management';

const StockCard: React.FC<{ stockName: string }> = ({ stockName }) => {
  const ReduxStocks = useSelector(selectStocks);
  const stockData = ReduxStocks.stocks.get(stockName);
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(handleModal(true));
    dispatch(selectStock(stockData.symbol))
  };

  return (
    <Paper elevation={3} style={{ padding: 20, marginBottom: 10 }} onClick={handleOpen}>
      <Typography variant="h6" gutterBottom>
        Stock Name : {stockData.symbol}
      </Typography>
      <Box className='container'>
        <Typography className='data'>
          <div className="data-key"> Open:</div>
          <div className="data-value open">${stockData.values[0].open}</div>
        </Typography>
        <Typography className='data'>
          <div className="data-key"> Close:</div>
          <div className="data-value"> ${stockData.values[0].close}</div>
        </Typography>
        <Typography className='data'>
          <div className="data-key"> High:</div>
          <div className="data-value"> ${stockData.values[0].high}</div>
        </Typography>
        <Typography className='data'>
          <div className="data-key"> Low:</div>
          <div className="data-value"> ${stockData.values[0].low}</div>
        </Typography>
      </Box>
    </Paper>
  );
};

export default StockCard;
