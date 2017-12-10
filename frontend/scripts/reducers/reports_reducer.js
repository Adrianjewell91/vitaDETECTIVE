import {RECEIVE_REPORTS} from '../actions/report_actions'

export const reportsReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_REPORTS:
      return actions.reports;
    default:
      return state;
  }

};
