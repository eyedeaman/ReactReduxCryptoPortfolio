import React, { Component } from 'react';
import LineChart from './line_chart';
import ToolTip from './tool_tip';
import { connect } from 'react-redux';
import './coin_chart.css';
import { fetchCoinChart } from '../../../actions/index';


class CoinChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverLoc: null,
      activePoint: null
    }
  }

  handleChartHover(hoverLoc, activePoint){
    this.setState({
      hoverLoc: hoverLoc,
      activePoint: activePoint
    })
  }

  onChartDaysChange(days) {
    const { ticker } = this.props;
    this.props.fetchCoinChart(ticker, days);
  }

  render() {
    const { priceChart, width} = this.props;

    if(_.isEmpty(priceChart)) {
      return(
        <div></div>
      );
    }
    return (
      <div className="coin_chart">
        <div className='row'>
          <div className='popup'>
            {this.state.hoverLoc ? <ToolTip hoverLoc={this.state.hoverLoc} activePoint={this.state.activePoint}/> : null}
          </div>
        </div>
        <div className='row'>
          <div className='chart'>
            <LineChart width={width} data={priceChart.usdChart} onChartHover={ (a,b) => this.handleChartHover(a,b) }/>
          </div>
        </div>
        <span>Days: </span>
        <div className='btn-group' role="group">
          <button 
            type="button" 
            className={priceChart.days == 30 ? 'btn btn-secondary active' : 'btn btn-secondary'} 
            onClick={() => this.onChartDaysChange(30)}>
            30
          </button>
          <button 
            type="button" 
            className={priceChart.days == 60 ? 'btn btn-secondary active' : 'btn btn-secondary'} 
            onClick={() => this.onChartDaysChange(60)}>
            60
          </button>
          <button 
            type="button" 
            className={priceChart.days == 90 ? 'btn btn-secondary active' : 'btn btn-secondary'} 
            onClick={() => this.onChartDaysChange(90)}>
            90
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        priceChart: state.coinDetails.priceChart,
        ticker: state.coinDetails.ticker
    };
}

export default connect(mapStateToProps, {fetchCoinChart})(CoinChart);
