import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectStocks } from '../common/state-management';

export const DataTable = () => {
  const ReduxStocks = useSelector(selectStocks);
  let stockData = ReduxStocks.stocks.get(ReduxStocks.selectedStock);
  const [rows, setRows] = useState([]);

  let columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'datetime', headerName: 'Time Stamp', flex: 2 },
    { field: 'open', headerName: 'Open', flex: 2 },
    { field: 'close', headerName: 'Close', flex: 2 },
    { field: 'low', headerName: 'Low', flex: 2 },
    { field: 'high', headerName: 'High', flex: 2 },
    { field: 'volume', headerName: 'Volume', flex: 2 }
  ];

  useEffect(() => {
    if (!!stockData) {
      let data = stockData.values?.map((stk: any, index: number) => {
        let newStockData = stk;
        return { ...newStockData, id: index + 1 }
      });
      setRows(data);
    }
  }, [stockData]);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '20px' }}>
        <div className="stock-info-container">
          <div className="stock-header-info"> Stock Name: {stockData?.symbol}</div>
          <div className="stock-header-info"> Currency: <span className='currency'>{stockData?.currency}</span></div>
        </div>
        {
          (rows?.length > 0 && <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 6 },
              },
            }}
            pageSizeOptions={[6, 7]}
          />)
        }
      </div>
    </>
  );
}
