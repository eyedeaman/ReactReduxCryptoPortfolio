import React, { Component } from 'react';
import { connect } from 'react-redux';
import './topbar.css';
import { ClipLoader } from 'react-spinners';
import * as CurrencyFormat from 'react-currency-format';

import {updateBtcToggle} from '../actions';


class Topbar extends Component {
    render() {
        const btcTotal = this.props.portfolioTotals.btc;
        const usdTotal = this.props.portfolioTotals.usd;
        const { displayInBTC } = this.props;

        const btcImage = '../../../assets/bitcoin_logo_png.png'
        const usdImage = '../../../assets/dollar_sign_png.png'
        
        // Not sure why I have to import like this
        var CurrencyFormat = require('react-currency-format');

        // Shows loading spinner until portfolio sum is calculated
        if(!btcTotal || !usdTotal) {
            return (
            <section className="topbar">
                <div className="banner">
                    <span>TOTAL: </span> 
                    <ClipLoader 
                                sizeUnit={'px'}
                                size={15}
                                color={'#dcdcdc'}
                                loading={true}
                            />
                </div>
                <div className="menu"></div>
            </section>
            );
        }
        // Shows sum of portfolio (USD or BTC) based on what currency is toggled 
        return ( 
            <section className="topbar">
                <div className="banner">
                    <div className="coin_left"> 
                        <img 
                            src={displayInBTC ? btcImage: usdImage} 
                            height={30} 
                            style={{borderRadius:50, marginRight:10}}
                            onClick={() => {
                                this.props.updateBtcToggle(!displayInBTC); // Switch currency display
                            }}
                        />
                        <span>TOTAL: </span> 
                    </div>
                    <div className="coin_right">
                        {displayInBTC ? 
                        // If dispalyInBTC is true it shows BTC total
                        <span>{_.round(btcTotal,2)} BTC</span>
                        : 
                        // If displayInBTC is false it shows USD total
                        <CurrencyFormat 
                            value={usdTotal}
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'$'} 
                            decimalScale={0}
                        />}   
                    </div>
                </div>
                <div className="menu"></div>
            </section>
        );
    };
}


function mapStateToProps(state) {
    return {
        portfolioTotals: state.portfolioTotals,
        displayInBTC: state.displayInBTC,
    };
 }
 
export default connect(mapStateToProps,{updateBtcToggle})(Topbar);
