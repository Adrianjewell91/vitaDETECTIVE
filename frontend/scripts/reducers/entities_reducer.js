import { combineReducers } from 'redux';

import {reportsReducer} from './reports_reducer';

export default combineReducers({
  reports: reportsReducer
});
