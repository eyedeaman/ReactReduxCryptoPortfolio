import {
    SET_TOTALS,
    FETCH_COIN_HOLDINGS
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_TOTALS:
        return action.payload;
    case FETCH_COIN_HOLDINGS: 
        return {...state, coinHoldings: action.payload}
    default: 
        return state;
  }
};
