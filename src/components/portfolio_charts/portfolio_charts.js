import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContainerDimensions from 'react-container-dimensions';

// Different charts
import HoldingPieChart from './holdings_pie_chart';
import TopBotPerformers from './top_performers';

// CSS
import './portfolio_charts.css';

class PortfolioCharts extends Component {
    render() {
        return (   
            <div className="charts">

                <div className="chart-left">
                    <div className="card">
                        <h5 className="card-title">Portfolio Holdings</h5>
                        <ContainerDimensions>
                            <HoldingPieChart/>
                        </ContainerDimensions>
                    </div>
                </div>
                <div className="chart-right">
                    <div className="card top-performer">
                        <h5 className="card-title">Top Performers (24h)</h5>
                        <TopBotPerformers type="top"/>
                    </div>
                    <div className="card bot-performer">
                        <h5 className="card-title">Bottom Performers (24h)</h5>
                        <TopBotPerformers type="bot"/>
                    </div>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) { 
   return {
   };
}

export default connect(mapStateToProps)(PortfolioCharts);