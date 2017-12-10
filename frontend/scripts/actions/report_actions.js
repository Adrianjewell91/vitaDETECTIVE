//util
export const RECEIVE_REPORTS = "RECEIVE_REPORTS";


export const getReports = () => {
  return $.ajax({method: "GET", url: "/report"})
};


//action-creators
export const receiveReports = (reports) => {
  return {type: RECEIVE_REPORTS, reports};
};


//thunks
export const requestReports = () => (dispatch) => {
  return getReports()
    .then((reports) => dispatch(receiveReports(reports)))
};
