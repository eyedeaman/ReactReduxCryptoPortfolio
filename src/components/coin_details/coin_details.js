import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import ContainerDimensions from "react-container-dimensions";
import * as CurrencyFormat from "react-currency-format";

// Components
import CoinChart from "./coin_chart/coin_chart";
import DeleteCoin from "./delete_coin";

// Actions
import { fetchCoinChart } from "../../actions/index";

import "./coin_details.css";

class CoinDetails extends Component {
  render() {
    const { coinDetails, displayInBTC } = this.props;
    var CurrencyFormat = require("react-currency-format");

    if (_.isEmpty(coinDetails)) {
      return (
        <div className="card coin-details">
          <h5 className="card-title">Coin Details</h5>
          <p>
            <i>Select a coin to see details</i>
          </p>
        </div>
      );
    }
    return (
      <div className="card coin-details">
        <h5 className="card-title">
          <span>Coin Details: {coinDetails.ticker} </span>
          <span>
            {displayInBTC ? (
              // If displayInBTC is true show BTC %
              // If % change is > 0 text is green. < 0 it's red
              <span
                style={{
                  color:
                    coinDetails.btcPctChange24Hour < 0 ? "#ff6666" : "#66cc66" //text is green if > 0
                }}
              >
                ({_.round(coinDetails.btcPctChange24Hour)}%)
              </span>
            ) : (
              // If displayInBTC is false show USD %
              <span
                style={{
                  color:
                    coinDetails.usdPctChange24Hour < 0 ? "#ff6666" : "#66cc66" //text is green if > 0
                }}
              >
                ({_.round(coinDetails.usdPctChange24Hour)}%)
              </span>
            )}
          </span>
        </h5>
        <div className="details container">
          <div className="row">
            <div className="col-sm-6">
              <div className="col-sm-6">
                <span className="details_labels">Balance (BTC): </span>
              </div>
              <div className="col-sm-auto">
                <span className="details_values">
                  {_.round(coinDetails.holdingsBTC, 8)} BTC
                </span>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="col-sm-6">
                <span className="details_labels">Buy Price: </span>
              </div>
              <div className="col-sm-auto">
                <span className="details_values">
                  {_.round(coinDetails.buyPrice, 8)} BTC
                </span>
              </div>
            </div>

            <div className="w-100" />

            <div className="col-sm-6">
              <div className="col-sm-6">
                <span className="details_labels">Balance (USD): </span>
              </div>
              <div className="col-sm-auto">
                <span className="details_values">
                  <CurrencyFormat
                    value={coinDetails.holdingsUSD}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={0}
                  />
                </span>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="col-sm-6">
                <span className="details_labels">Current Price: </span>
              </div>
              <div className="col-sm-auto">
                <span className="details_values">
                  {_.round(coinDetails.currentPriceBTC, 8)} BTC
                </span>
              </div>
            </div>

            <div className="w-100" />

            <div className="col-sm-6">
              <div className="col-sm-6">
                <span className="details_labels">Amount: </span>
              </div>
              <div className="col-sm-auto">
                <span className="details_values">{coinDetails.amount}</span>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="col-sm-6">
                <span className="details_labels">Profit/Loss (BTC): </span>
              </div>
              <div className="col-sm-auto">
                <span className="details_values">
                  {_.round(coinDetails.profitLossBTC, 8)} BTC
                </span>
              </div>
            </div>

            <div className="w-100" />

            <div className="col-sm-6">
              <div className="col-sm-6">
                <span className="details_labels">Marketcap (USD): </span>
              </div>
              <div className="col-sm-auto">
                <span className="details_values">
                  <CurrencyFormat
                    value={coinDetails.usdMktCap}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={0}
                  />
                </span>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="col-sm-6">
                <span className="details_labels">Profit/Loss (%): </span>
              </div>
              <div className="col-sm-auto">
                <span className="details_values">
                  {_.round(coinDetails.profitLossBTCPercent)}%
                </span>
              </div>
            </div>
          </div>
        </div>
        <ContainerDimensions>
          <CoinChart />
        </ContainerDimensions>
        <div>
          <DeleteCoin
            coinKey={coinDetails.id}
            coinTicker={coinDetails.ticker}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    coinDetails: state.coinDetails,
    displayInBTC: state.displayInBTC
  };
}

export default connect(
  mapStateToProps,
  { fetchCoinChart }
)(CoinDetails);
