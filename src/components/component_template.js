import React, { Component } from 'react';
//import { connect } from 'react-redux';

//Need to add this component to a route in src index.js!

class ComponentName extends Component {
    render() {
        return (
            <div>
                Component!
            </div>
        );
    }
}

export default ComponentName


// IF THE COMPONENT NEEDS TO HOOK UP TO REDUX FOR AN ACTION
// Also consider when to call the action creator 

// import { connect } from 'react-redux';
// import { actionCreator } from '../actions';

// function mapStateToProps() {
//    return {};
// }

// export default connect(mapStateToProps, actionCreator)(ComponentName);