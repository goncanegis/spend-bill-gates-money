import * as actionTypes from './shopping-types';
import data from '../../data/data';

const initialState = {
  products: data, // {id, title, price, img}
  cart: [], // {id, title, price, img, qty}
};

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      // Get items data from the products array
      const item = state.products.find((prod) => prod.id === action.payload.id);
      // Check if item is already in cart
      const inCart = state.cart.find((item) =>
        item.id === action.payload.id ? true : false
      );

      // if item is already in cart, map over the item, and increment only the quantity. if not, add item
      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.id === action.payload.id
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          : [...state.cart, { ...item, qty: 1 }],
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        // cart: state.cart.map((item, i) => {
        //   if (item.id === action.payload.id) {
        //     if (item?.qty > 1) {
        //       return { ...item, qty: item.qty - 1 };
        //     } else {
        //       return {};
        //     }
        //   } else {
        //     return item;
        //   }
        // }),
        // };

        cart: state.cart.reduce((acc, item) => {
          if (item.id === action.payload.id) {
            if (item?.qty > 1) {
              return [...acc, { ...item, qty: item.qty - 1 }];
            } else {
              return [...acc];
            }
          } else {
            return [...acc, item];
          }
        }, []),
      };
    default:
      return state;
  }
};

export default shopReducer;
