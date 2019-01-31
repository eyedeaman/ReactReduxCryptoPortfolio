import React, { Component } from 'react';
import ReactTable from 'react-table';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as CurrencyFormat from 'react-currency-format';
import ToggleButton from 'react-toggle-button';

import { fetchCoins, updateBtcToggle, fetchCoinDetails } from '../actions';

//Need to add this component to a route in src index.js!

class CoinTable extends Component {
  componentDidMount() {
    this.props.fetchCoins();
  }
  // Handles formatting of column data
  render() {
    // Toggle button styling
    const toggleStyle = {
      borderRadius: 2,
      height: 30,
      marginTop: 35
    };
    var CurrencyFormat = require('react-currency-format');
    const { coins } = this.props;
    const { displayInBTC } = this.props;
    const { coinDetails } = this.props;
    const btcColumns = [
      {
        Header: 'Id',
        accessor: 'id',
        show: false
      },
      {
        Header: '',
        Cell: row => {
          return (
            <div>
              <img
                height={25}
                src={row.original.image}
                style={{ borderRadius: 50 }}
              />
            </div>
          );
        },
        width: 50,
        id: 'image',
        className: 'TextMiddleAlign'
      },
      {
        Header: 'Ticker',
        accessor: 'ticker',
        className: 'TextLeftAlign'
      },
      {
        Header: 'Holdings',
        accessor: 'holdingsBTC',
        className: 'TextRightAlign',
        Cell: row => <span>{_.round(row.value, 3)}</span>
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        className: 'TextRightAlign',
        Cell: row => <span>{_.round(Number(row.value), 2)}</span>
      },
      {
        Header: 'Price',
        accessor: 'currentPriceBTC',
        className: 'TextRightAlign',
        Cell: row => <span>{row.value.toFixed(8)}</span>
      },
      {
        Header: 'Change (24h)',
        accessor: 'btcPctChange24Hour',
        className: 'TextRightAlign',
        Cell: row => (
          <span
            style={{
              color: row.value < 0 ? 'red' : 'green' //text is green if > 0
            }}
          >
            {row.value.toFixed(1)} %
          </span>
        )
      },
      {
        Header: 'Profit',
        accessor: 'profitLossBTC',
        className: 'TextRightAlign',
        Cell: row => (
          <span
            style={{
              color: row.value < 0 ? 'red' : 'green' //text is green if > 0
            }}
          >
            {_.round(row.value, 3)}
          </span>
        ),
        show: false
      },
      {
        Header: 'Profit (%)',
        accessor: 'profitLossBTCPercent',
        className: 'TextRightAlign',
        Cell: row => (
          <span
            style={{
              color: row.value < 0 ? 'red' : 'green' //text is green if > 0
            }}
          >
            {row.value.toFixed(1)} %
          </span>
        )
      }
    ];

    const usdColumns = [
      {
        Header: 'Id',
        accessor: 'id',
        show: false
      },
      {
        Header: '',
        Cell: row => {
          return (
            <div>
              <img
                height={25}
                src={row.original.image}
                style={{ borderRadius: 50 }}
              />
            </div>
          );
        },
        width: 50,
        id: 'image',
        className: 'TextMiddleAlign'
      },
      {
        Header: 'Ticker',
        accessor: 'ticker',
        className: 'TextLeftAlign'
      },
      {
        Header: 'Holdings',
        accessor: 'holdingsUSD',
        className: 'TextRightAlign',
        Cell: row => (
          <CurrencyFormat
            value={row.value}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
            decimalScale={0}
          />
        )
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        className: 'TextRightAlign',
        Cell: row => <span>{_.round(Number(row.value), 2)}</span>
      },
      {
        Header: 'Price',
        accessor: 'currentPriceUSD',
        className: 'TextRightAlign',
        Cell: row => (
          <CurrencyFormat
            value={row.value}
            displayType={'text'}
            thousandSeparator={true}
            decimalScale={2}
            prefix={'$'}
            //renderText={value => <span>{_.round(row.value)}</span>}
          />
        )
      },
      {
        Header: 'Change (24h)',
        accessor: 'usdPctChange24Hour',
        className: 'TextRightAlign',
        Cell: row => (
          <span
            style={{
              color: row.value < 0 ? 'red' : 'green' //text is green if > 0
            }}
          >
            {row.value.toFixed(1)} %
          </span>
        )
      },
      {
        Header: 'Profit (%)',
        accessor: 'profitLossBTCPercent',
        className: 'TextRightAlign',
        Cell: row => (
          <span
            style={{
              color: row.value < 0 ? 'red' : 'green' //text is green if > 0
            }}
          >
            {row.value.toFixed(1)} %
          </span>
        )
      }
    ];

    // coins needs to be an array before trying to load the table.
    // TO DO: Update coins reducer to initialize as an array
    if (!Array.isArray(coins)) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1 className='display-4'>
          Portfolio
          <div className='toggle'>
            <ToggleButton
              value={displayInBTC}
              activeLabel={'BTC'}
              inactiveLabel={'USD'}
              thumbStyle={toggleStyle}
              trackStyle={toggleStyle}
              onToggle={() => {
                this.props.updateBtcToggle(!displayInBTC); // Switch currency display
              }}
              colors={{
                active: {
                  base: 'rgb(255,153,51)',
                  hover: 'rgb(255,128,0)'
                },
                inactive: {
                  base: 'rgb(0,102,204)',
                  hover: 'rgb(0,76,153)'
                }
              }}
            />
          </div>
        </h1>

        <ReactTable
          className='-highlight'
          data={coins}
          columns={displayInBTC ? btcColumns : usdColumns} // Determines which columns to show
          defaultPageSize={coins.length}
          defaultSorted={[
            displayInBTC
              ? {
                  id: 'holdingsBTC',
                  desc: true
                }
              : {
                  id: 'holdingsUSD',
                  desc: true
                }
          ]}
          getTrProps={(state, rowInfo) => {
            if (rowInfo && rowInfo.row) {
              return {
                onClick: () => {
                  this.props.fetchCoinDetails(rowInfo.original);
                },
                style: {
                  background:
                    rowInfo.row.id === coinDetails.id ? '#d8d8d8' : 'white'
                }
              };
            } else {
              return {};
            }
          }}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    coins: state.coins,
    displayInBTC: state.displayInBTC,
    coinDetails: state.coinDetails
  };
}

export default connect(
  mapStateToProps,
  { fetchCoins, updateBtcToggle, fetchCoinDetails }
)(CoinTable);
