import { RECEIVE_PRODUCTS } from '../actions/product_actions';

export const productsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
      case RECEIVE_PRODUCTS:
        return action.products;
      default:
        return state;
    }
  };
