import React from 'react';
import { Navbar, Stocks, Forex, Crypto, Homepage, Pairs} from './components';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
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
                    <Switch>
                        <Route exact path="/">
                            <Homepage />
                        </Route>
                        <Route exact path="/stocks">
                            <Stocks />
                        </Route>
                        <Route exact path="/forex">
                            <Forex />
                        </Route>
                        {/* <Route exact path="/crypto/:coinId">
                            <CryptoDetails />
                        </Route> */}
                        <Route exact path="/crypto">
                            <Crypto />
                        </Route>
                        <Route exact path="/pairs">
                            <Pairs />
                        </Route>
                    </Switch>
                </div>
            </Layout>
      </div>

      <div className='footer'>
        
      </div>
    </div>
  );
}

export default App
