import {
    SELECT_ROW
} from '../actions/types';

export default (state = '', action) => {
  switch (action.type) {
    case SELECT_ROW:
        return action.payload;
    default: 
        return state;
  }
};
