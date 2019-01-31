import React, { Component } from 'react';
import { connect } from 'react-redux';

// Pie chart using recharts
import { PieChart, Pie, Legend, Tooltip, Sector, Cell, ResponsiveContainer } from 'recharts';
import ContainerDimensions from 'react-container-dimensions';

// CSS
import './holdings_pie_chart.css';
  
class HoldingPieChart extends Component {

    render() {
        const { coinHoldings } = this.props.portfolioTotals; // USD and BTC holdings per coin
        // Temp data
        const dummyData = [
            {name: "1", value: 50},
            {name: "2", value: 50},
            {name: "3", value: 50}
        ]
        // From ContainerDimension in portfolio charts
        const {width,height} = this.props;
        // Colors for pie chart
        const COLORS = ['#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51'];
        const RADIAN = Math.PI / 180;      
        // Puts % in middle of pie section          
        const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name, index }) => {
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x  = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy  + radius * Math.sin(-midAngle * RADIAN);
            
            return (
            <text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='central'>
                {/* {`${(percent * 100).toFixed(0)}%`} */}
                {`${name}`}
            </text>
            );
        };

        // Return a dummy pie chart until holdings have been calculated
        if(_.isEmpty(coinHoldings)) {
            return(
                <div>
                    <PieChart width={.9*width} height={.9*height} className="mx-auto piechart">
                    <Pie 
                        dataKey='value'
                        data={dummyData} 
                        outerRadius={.45*Math.min(width,height)}
                        fill="#8884d8" 
                        labelLine={false}
                    >
                    { // Adds colors to chart
                        dummyData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
                    }
                    </Pie>
                <Tooltip/>
                </PieChart>
                </div>
            );
        }
        // Grab usd and btc arrays from coinHoldings
        let { btcHoldings, usdHoldings } = coinHoldings;
        // Update arrays to have ticker named as react-vis (label)
        usdHoldings = usdHoldings.map(({ticker: name, holdingsUSD: value}) => ({name, value}));
        //usdHoldings = usdHoldings.map(({holdingsUSD: theta}) => ({theta}));
        btcHoldings = btcHoldings.map(({ticker: name, holdingsBTC: value}) => ({name, value}));
        
        
        return(
            <div>
                <PieChart width={.9*width} height={.9*height} className="mx-auto piechart">
                    <Pie 
                        dataKey='value'
                        data={usdHoldings} 
                        outerRadius={.45*Math.min(width,height)}
                        fill="#8884d8" 
                        labelLine={false}
                        label={renderCustomizedLabel}
                    >
                    { // Adds colors to chart
                        usdHoldings.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
                    }
                    </Pie>
                <Tooltip/>
                </PieChart>
            </div> 
        );
    }
}

function mapStateToProps(state) {
    return { 
        portfolioTotals: state.portfolioTotals
    };
 }
 
export default connect(mapStateToProps)(HoldingPieChart);
