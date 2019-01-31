import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as CurrencyFormat from 'react-currency-format';

import { setPortfolioTotals } from '../actions/index';

class PortfolioSummary extends Component {
    render() {
        const btcTotal = this.props.portfolioTotals.btc;
        const usdTotal = this.props.portfolioTotals.usd;
        var CurrencyFormat = require('react-currency-format'); // Library for makign numbers look good

        // I'm guessing this can be cleaned up to not duplicate JSX
        if(!btcTotal || !usdTotal) {
            return (
                <div>
                    <h1 className="display-4">Summary</h1>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="card">
                                <h5 className="card-title">Portfolio Value (BTC)</h5>
                                <p className="card-text">Loading...</p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="card">
                                <h5 className="card-title">Portfolio Value (USD)</h5>
                                <p className="card-text">Loading...</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <h1 className="display-4">Summary</h1>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="card">
                            <h5 className="card-title">Portfolio Value (BTC)</h5>
                            <p className="card-text">{_.round(btcTotal,2)}</p>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card">
                            <h5 className="card-title">Portfolio Value (USD)</h5>
                                <p className="card-text">
                                    {<CurrencyFormat 
                                        value={usdTotal} 
                                        displayType={'text'} 
                                        thousandSeparator={true} 
                                        prefix={'$'} 
                                        decimalScale={2}
                                    />}
                                </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        portfolioTotals: state.portfolioTotals
    };
 }
 
export default connect(mapStateToProps, { setPortfolioTotals })(PortfolioSummary);
