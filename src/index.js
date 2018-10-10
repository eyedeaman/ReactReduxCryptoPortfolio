import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
//import { BrowserRouter, Route, Switch } from 'react-router-dom';
//import promise from 'redux-promise';
import reduxThunk from 'redux-thunk';
import 'babel-polyfill';

import reducers from './reducers';
import PortfolioSummary from './components/portfolio_summary';
import CoinTable from './components/coin_table';
import CoinDetails from './components/coin_details';
import Display from './components/coin_chart/display';

// import './../style/style.css';
//import './style.css';


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <div>
      <PortfolioSummary />
      <CoinTable />
      <CoinDetails />
      <Display />
    </div>
  </Provider>
  , document.querySelector('.container'));
