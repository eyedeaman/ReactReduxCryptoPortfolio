import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
//import promise from 'redux-promise';
import reduxThunk from "redux-thunk";
import "babel-polyfill";
import reducers from "./reducers";
import PortfolioSummary from "./components/portfolio_summary";
import CoinTable from "./components/coin_table";
import CoinDetails from "./components/coin_details/coin_details";
import Sidebar from "./components/sidebar";
import Topbar from "./components/topbar";
import HoldingPieChart from "./components/portfolio_charts/holdings_pie_chart";
import PortfolioCharts from "./components/portfolio_charts/portfolio_charts";
import AddCoin from "./components/add_coin";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <div className="wrapper">
      <Topbar />
      <Sidebar />
      <div className="main">
        <PortfolioCharts />
        {/* <CoinTable /> */}
        <CoinDetails />
      </div>
    </div>
  </Provider>,
  // This has to match the class in index.html
  document.querySelector(".wrapper")
);
