import {RECEIVE_REPORTS} from '../actions/report_actions'

export const reportsReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_REPORTS:
      return action.reports;
    default:
      return state;
  }
};
