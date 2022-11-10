import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const ArgusTable = (props) => {
	const containerStyle = useMemo(() => ({ width: '60%', minHeight: '55vh' }), []);
  const gridStyle = useMemo(() => ({ height: '50vh', width: '100%' }), []);
	const [rowData, setRowData] = useState([]);
	const [columnDefs, setColumnDefs] = useState([]);

	const defaultColDef = useMemo(() => {
		return {
		  sortable: true,
		  resizable: true,
		  filter: true,
		};
	  }, []);

    const onGridReady = () => {
		setColumnDefs(props.columnDefs)
        setRowData(props.rowData)
    }
    return (
        <>

        <div style={containerStyle}>
            <div style={gridStyle} className="ag-theme-alpine">

                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                ></AgGridReact>
            </div>

        </div>
        
        </>
      
    );
  };

export default ArgusTable