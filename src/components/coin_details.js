import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCoinDetails } from '../actions/index';

// import { actionCreator } from '../actions';


//Need to add this component to a route in src index.js!

class CoinDetails extends Component {
    render() {
        const { selectedRow } = this.props;

        if (!selectedRow) {
            return (
                <div>
                    <h1 className="display-4">Coin Details</h1>
                    <div className="row">
                    <div className="col-sm-6">
                        <div className="card">
                            <p className="card-text"><i>Select a coin to see details</i></p>
                        </div>
                    </div>
                    </div>
                </div>
            );
        }
        this.props.fetchCoinDetails(selectedRow);
        return (
            <div>
                <h1 className="display-4">Coin Details</h1>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="card">
                            <h5 className="card-title">{selectedRow}</h5>
                            <p className="card-text">text</p>
                        </div>
                    </div>
                </div>
        </div>
        );
    }
}

function mapStateToProps(state) {
   return {
        selectedRow: state.selectedRow
   };
}

export default connect(mapStateToProps, {fetchCoinDetails})(CoinDetails);