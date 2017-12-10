//util
export const RECEIVE_REPORTS = "RECEIVE_REPORTS";
export const RECEIVE_PRODUCTS = "RECEIVE_PRODUCTS";

export const getReports = () => {
  return $.ajax({method: "GET", url: "/report"})
};

export const getProducts = (vitamin) => {
  return $.ajax({
    method: 'GET',
    url: '/aws',
    data: { vitamin }
  });
}

//action-creators
export const receiveReports = (reports) => {
  return {type: RECEIVE_REPORTS, reports};
};

export const receiveProducts = (products) => ({
  type: RECIEVE_PRODUCTS
  products
})

//thunks
export const requestReports = () => (dispatch) => {
  return getReports()
    .then((reports) => dispatch(receiveReports(reports)))
};

export const requestProducts = (vitamin) => (dispatch) => {
  return getProducts(vitamin)
    .then((products) => dispatch(receiveProducts(products)))
}