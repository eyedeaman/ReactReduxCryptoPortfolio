import React, { Component } from 'react';
import { connect } from 'react-redux';

import HoldingPieChart from './holdings_pie_chart';

class TopBotPerformers extends Component {
    render() {
        // Type should either be top or bot, passed in as props 
        const { coins, displayInBTC, type } = this.props;
        // Wait until coins are fetched
        if(!Array.isArray(coins)) {
            return (   
                <div></div>
            );
        }
        // Display different coins based on what type of chart is passed in
        switch (type) {
            case 'top': {
                // Sort coins into usdPctChange24Hour desc
                coins.sort((a,b) => (b.usdPctChange24Hour > a.usdPctChange24Hour) ? 1 : ((a.usdPctChange24Hour > b.usdPctChange24Hour) ? -1 : 0)); 
                // Take top 3 coins to display
                const topPerformers = coins.slice(0,3);
                // Creates li for each coin
                const listItems = topPerformers.map((performer) => 
                    <li key={performer.id}>
                        {/* coin ticker */}
                        <span>{performer.ticker} </span> 
                        {/* coin usdPctChange24Hour */}
                        {displayInBTC ? 
                        // If displayInBTC is true show BTC %
                        // If % change is > 0 text is green. < 0 it's red
                        <span style={{
                            color: performer.btcPctChange24Hour < 0 ? '#ff6666' : '#66cc66' //text is green if > 0
                        }}>({performer.btcPctChange24Hour.toFixed(2)}%)</span>
                        : 
                        // If displayInBTC is false show USD %
                        <span style={{
                            color: performer.usdPctChange24Hour < 0 ? '#ff6666' : '#66cc66' //text is green if > 0
                        }}>({performer.usdPctChange24Hour.toFixed(2)}%)</span>
                        }
                        
                        {/* <span style={{
                            color: performer.usdPctChange24Hour < 0 ? '#ff6666' : '#66cc66' //text is green if > 0
                        }}>
                            ({performer.usdPctChange24Hour.toFixed(2)}%)
                        </span> */}
                    </li>
                )
                return (
                    <ol>{listItems}</ol>
                );
            }
            case 'bot': {
                // Sort coins into usdPctChange24Hour asc
                coins.sort((a,b) => (b.usdPctChange24Hour < a.usdPctChange24Hour) ? 1 : ((a.usdPctChange24Hour < b.usdPctChange24Hour) ? -1 : 0)); 
                // Take bottom 3 coins to display
                const botPerformers = coins.slice(0,3);
                const listItems = botPerformers.map((performer) => 
                    <li key={performer.id}>
                        {/* coin ticker */}
                        <span>{performer.ticker} </span> 
                        {displayInBTC ? 
                        // If displayInBTC is true show BTC %
                        // If % change is > 0 text is green. < 0 it's red
                        <span style={{
                            color: performer.btcPctChange24Hour < 0 ? '#ff6666' : '#66cc66' //text is green if > 0
                        }}>({performer.btcPctChange24Hour.toFixed(2)}%)</span>
                        : 
                        // If displayInBTC is false show USD %
                        <span style={{
                            color: performer.usdPctChange24Hour < 0 ? '#ff6666' : '#66cc66' //text is green if > 0
                        }}>({performer.usdPctChange24Hour.toFixed(2)}%)</span>
                        }
                    </li>
                )
                return (
                    <ol>{listItems}</ol>
                );
            }
            // Shouldn't happen
            default: 
                return <div></div>;
            }
    }
}

function mapStateToProps(state) {
   return {
       coins: state.coins,
       displayInBTC: state.displayInBTC
   };
}

export default connect(mapStateToProps)(TopBotPerformers);