import React, { Component } from 'react';
import moment from 'moment';
//import './../../../style/display.css';
import LineChart from './line_chart';
import ToolTip from './tool_tip';
import InfoBox from './info_box';
//import { connect } from 'net'; <---Don't think this is used
import { connect } from 'react-redux';


class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingData: true,
      data: null,
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
//   componentDidMount(){
//     // const getData = () => {
//     //   const url = 'https://api.coindesk.com/v1/bpi/historical/close.json';

//     //   fetch(url).then( r => r.json())
//     //     .then((bitcoinData) => {
//     //       const sortedData = [];
//     //       let count = 0;
//     //       for (let date in bitcoinData.bpi){
//     //         sortedData.push({
//     //           d: moment(date).format('MMM DD'),
//     //           p: bitcoinData.bpi[date].toLocaleString('us-EN',{ style: 'currency', currency: 'USD' }),
//     //           x: count, //previous days
//     //           y: bitcoinData.bpi[date] // numerical price
//     //         });
//     //         count++;
//     //       }
//         // if(!usdChart) {
//         // this.setState({
//         //     data: usdChart,
//         //     fetchingData: false
//         //   })
//         // }  

//     //       console.log(this.state.data);
//     //     })
//     //     .catch((e) => {
//     //       console.log(e);
//     //     });
       
//     // }
//     // getData();
//   }


  render() {
    //const { usdChart } = this.props.coinDetails.priceChart;
    const { priceChart } = this.props;
    //const { coinDetails } = this.props.coinDetails.coinChart;
    if(_.isEmpty(priceChart)) {
      return(
        <div></div>
      );
    }
    return (
      <div className='container'>
        {/* <div className='row'>
          <InfoBox data={priceChart.usdChart}/>
        </div> */}
        <div className='row'>
          <div className='popup'>
            {this.state.hoverLoc ? <ToolTip hoverLoc={this.state.hoverLoc} activePoint={this.state.activePoint}/> : null}
          </div>
        </div>
        {/* <div className='row'>
          { !this.state.fetchingData ?
          <InfoBox data={priceChart.usdChart} />
          : null }
        </div> */}
        <div className='row'>
          <div className='chart'>
            <LineChart data={priceChart.usdChart} onChartHover={ (a,b) => this.handleChartHover(a,b) }/>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        priceChart: state.coinDetails.priceChart
    };
}

export default connect(mapStateToProps)(Display);
