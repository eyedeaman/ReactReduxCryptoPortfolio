import {
    TOGGLE_BTC
} from '../actions/types';

export default (state = false, action) => {
  switch (action.type) {
    case TOGGLE_BTC:
        return action.payload;
    // case CREATE_POST:
    //   return { ...state, ...action.payload };
    // case DELETE_POST:
    //   return _.omit(state, action.payload);
    default: 
        return state;
  }
};
