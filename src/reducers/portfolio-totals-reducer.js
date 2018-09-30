import {
    SET_TOTALS
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_TOTALS:
        return action.payload;
    default: 
        return state;
  }
};
