import { combineReducers } from 'redux';

import { reportsReducer } from './reports_reducer';
import { productsReducer } from './products_reducer';

export default combineReducers({
  reports: reportsReducer,
  products: productsReducer
});
