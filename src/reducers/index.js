import { combineReducers } from 'redux';
import coinsReducer from './coins-reducer';
import portfolioTotalsReducer from './portfolio-totals-reducer';
import toggleReducer from './toggle-reducer';
import coinDetailsReducer from './coin-details-reducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  coins: coinsReducer,
  portfolioTotals: portfolioTotalsReducer,
  displayInBTC: toggleReducer,
  coinDetails: coinDetailsReducer,
  form: formReducer 
});

export default rootReducer;
