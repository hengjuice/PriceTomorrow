import React from 'react';
import { Navbar, Stocks, Forex, Crypto, Homepage} from './components';
import { Routes, Router, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './App.css';


const App = () => {
  return (
    
    <div className="app">
      <div className='navbar'>
        <Navbar />
      </div>

      <div className='main'>
      <Layout>
                <div className="routes">
                    <Routes>
                        <Route exact path="/" element={<Homepage/>}/>
                        <Route exact path="/" element={<Stocks/>}/>
                        <Route exact path="/" element={<Forex/>}/>
                        <Route exact path="/" element={<Crypto/>}/>
                        {/* <Route exact path="/crypto/:coinId">
                            <CryptoDetails />
                        </Route> */}
                        
                    </Routes>
                </div>
            </Layout>
      </div>

      <div className='footer'>
        
      </div>
    </div>
  );
}

export default App;
