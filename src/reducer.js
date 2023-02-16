import { act } from "react-dom/test-utils";

const reducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  } else if (action.type === "REMOVE_ITEM") {
    const newItems = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: newItems };
  } else if (action.type === "INCREASE_ITEM") {
    const tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount++ };
      }
      return cartItem;
    });

    return { ...state, cart: tempCart };
  } else if (action.type === "DECREASE_ITEM") {
    const tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount-- };
        }
        return cartItem;
      })
      .filter((item) => item.amount !== 0);

    return { ...state, cart: tempCart };
  }
  return state;
};

export default reducer;
