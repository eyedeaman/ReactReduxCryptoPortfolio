import React, { Component } from "react";
import { connect } from "react-redux";
import "./sidebar.css";
import _ from "lodash";
import { ClipLoader } from "react-spinners";
import * as CurrencyFormat from "react-currency-format";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import AddCoin from "./add_coin";

import { fetchCoins, fetchCoinDetails } from "../actions";

class Sidebar extends Component {
  componentDidMount() {
    this.props.fetchCoins();
  }

  render() {
    const { coins, displayInBTC } = this.props;
    var CurrencyFormat = require("react-currency-format");

    // Shows loading spinner until coins are fetched
    if (!Array.isArray(coins)) {
      return (
        <div className="sidebar">
          <div className="loader">
            <ClipLoader
              sizeUnit={"px"}
              size={70}
              color={"#dcdcdc"}
              loading={true}
            />
          </div>
        </div>
      );
    }
    // Sort coins into USD descending. Need to do it here otherwise toggle messes up sort
    coins.sort((a, b) =>
      b.holdingsUSD > a.holdingsUSD ? 1 : a.holdingsUSD > b.holdingsUSD ? -1 : 0
    );
    // Maps through every coin in your portfolio and creates a card for each coin
    return (
      <BrowserRouter>
        <div className="sidebar">
          <Switch>
            <Route exact path="/new" component={AddCoin} />
            <Route
              path="/"
              render={props => (
                <div>
                  {coins.map(function(coin) {
                    return (
                      // Card for each coin
                      <div
                        className="coincard"
                        // Need to provide a key otherwise React throws an error
                        key={coin.id}
                        //onClick={this.props.onCoinSelect}
                        onClick={() => {
                          this.props.fetchCoinDetails(coin); // Select an individual coin
                        }}
                      >
                        {/* Coin ticker, bottom-left corner */}
                        <span className="ticker">{coin.ticker}</span>
                        {/* Coin image */}
                        <div>
                          <img
                            src={coin.image}
                            height={30}
                            style={{ borderRadius: 50, marginRight: 10 }}
                          />
                        </div>

                        {/* Labels for values, left aligned */}
                        <div className="coin_left">
                          <span className="coin_label">Balance:</span>
                          <br />
                          <span className="coin_label">Price:</span>
                          <br />
                          <span className="coin_label">24H Change:</span>
                          <br />
                        </div>

                        {/* Values, right aligned */}
                        <div className="coin_right">
                          {/* Balance */}
                          <span>
                            {displayInBTC ? (
                              // If dispalyInBTC is true show BTC value
                              <span>{_.round(coin.holdingsBTC, 2)} BTC</span>
                            ) : (
                              // If displayInBTC is false show USD value
                              <CurrencyFormat
                                value={coin.holdingsUSD}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                                decimalScale={0}
                              />
                            )}
                          </span>
                          <br />
                          {/* Current Price */}
                          <span>
                            {displayInBTC ? (
                              // If dispalyInBTC is true show BTC value
                              <span>
                                {_.round(coin.currentPriceBTC, 2)} BTC
                              </span>
                            ) : (
                              // If displayInBTC is false show USD value
                              <CurrencyFormat
                                value={coin.currentPriceUSD}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                                decimalScale={2}
                              />
                            )}
                          </span>
                          <br />
                          {/* 24H Change */}
                          <span>
                            {displayInBTC ? (
                              // If displayInBTC is true show BTC %
                              // If % change is > 0 text is green. < 0 it's red
                              <span
                                style={{
                                  color:
                                    coin.btcPctChange24Hour < 0
                                      ? "#ff6666"
                                      : "#66cc66" //text is green if > 0
                                }}
                              >
                                {_.round(coin.btcPctChange24Hour)}%
                              </span>
                            ) : (
                              // If displayInBTC is false show USD %
                              <span
                                style={{
                                  color:
                                    coin.usdPctChange24Hour < 0
                                      ? "#ff6666"
                                      : "#66cc66" //text is green if > 0
                                }}
                              >
                                {_.round(coin.usdPctChange24Hour)}%
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                    );
                    // passing in 'this' otherwise get errors with onClick event
                  }, this)}
                  <div className="add_coin">
                    <Link to="/new">
                      <button
                        type="button"
                        className="btn btn-secondary btn-block"
                      >
                        Add Coin
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    coins: state.coins,
    displayInBTC: state.displayInBTC
  };
}

export default connect(
  mapStateToProps,
  { fetchCoins, fetchCoinDetails }
)(Sidebar);
