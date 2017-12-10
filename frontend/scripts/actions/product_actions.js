export const RECEIVE_PRODUCTS = "RECEIVE_PRODUCTS";

// utils
export const getProducts = (vitamin) => {
    return $.ajax({
      method: 'GET',
      url: '/aws',
      data: { vitamin }
    });
}

// action-creators

export const receiveProducts = (products) => ({
  type: RECEIVE_PRODUCTS,
  products
})

//thunks

export const requestProducts = (vitamin) => (dispatch) => {
  return getProducts(vitamin)
    .then((products) => dispatch(receiveProducts(products)))
}
