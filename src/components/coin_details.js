import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {getCoinChart} from '../services/coin-price-service';

class CoinDetails extends Component {
    render() {
        const { coinDetails } = this.props;
        if (_.isEmpty(coinDetails)) {
            return (
                <div>
                    <h1 className="display-4">Coin Details</h1>
                        <p><i>Select a coin to see details</i></p>
                </div>
            );
        }
        getCoinChart(coinDetails.ticker, 30);
        return (   
            <div>
                <h1 className="display-4">Coin Details: {coinDetails.ticker}</h1>
                {/* <div className="coin-detail-container">
                    <div className="coin-detail-row">
                        <span className="coin-detail-column">Ticker </span>
                        <span className="coin-detail-column">{coinDetails.ticker}</span>
                    </div>
                    <div className="coin-detail-row">
                        <span className="coin-detail-column">Holdings(BTC) </span>
                        <span className="coin-detail-column">{_.round(coinDetails.holdingsBTC,3)} BTC</span>
                    </div>
                    <div className="coin-detail-row">
                        <span className="coin-detail-column">Holdings(USD) </span>
                        <span className="coin-detail-column">{_.round(coinDetails.holdingsUSD)} USD</span>
                    </div>
                    <div className="coin-detail-row">
                        <span className="coin-detail-column">Amount </span>
                        <span className="coin-detail-column">{_.round(coinDetails.amount,2)}</span>
                    </div>
                    <div className="coin-detail-row">
                        <span className="coin-detail-column">Profit(%) </span>
                        <span className="coin-detail-column">{coinDetails.profitLossBTCPercent.toFixed(1)} %</span>
                    </div>
                </div> */}
            </div>
        );
    }
}

function mapStateToProps(state) {
   return {
        coinDetails: state.coinDetails
   };
}

export default connect(mapStateToProps)(CoinDetails);