import { combineReducers } from 'redux';
import coinsReducer from './coins-reducer';
import portfolioTotalsReducer from './portfolio-totals-reducer';
import toggleReducer from './toggle-reducer';
import selectedRowReducer from './selected-row-reducer';

const rootReducer = combineReducers({
  coins: coinsReducer,
  portfolioTotals: portfolioTotalsReducer,
  displayInBTC: toggleReducer,
  selectedRow: selectedRowReducer
});

export default rootReducer;
