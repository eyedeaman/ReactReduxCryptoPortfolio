import _ from 'lodash';
import {
  FETCH_COINS
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_COINS:
        return action.payload;
    // case CREATE_POST:
    //   return { ...state, ...action.payload };
    // case DELETE_POST:
    //   return _.omit(state, action.payload);
    default: 
        return state;
  }
};
