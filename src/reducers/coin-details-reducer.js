import {
  FETCH_COIN_DETAILS,
  FETCH_COIN_CHART,
  CLEAR_SELECTED_COIN
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_COIN_DETAILS:
      return action.payload;
    case FETCH_COIN_CHART:
      // Creates new object from previous state and adds the chart information
      // Maybe should do similar pattern for coin table so it loads some info then pulls more
      return { ...state, priceChart: action.payload };
    case CLEAR_SELECTED_COIN:
      return action.payload;
    default:
      return state;
  }
};
