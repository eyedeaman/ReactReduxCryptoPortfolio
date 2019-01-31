import {
    TOGGLE_BTC
} from '../actions/types';

export default (state = false, action) => {
  switch (action.type) {
    case TOGGLE_BTC:
        return action.payload;
    default: 
        return state;
  }
};
