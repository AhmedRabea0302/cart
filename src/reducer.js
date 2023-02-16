import { act } from "react-dom/test-utils";

const reducer = (state, action) => {
  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }
  if (action.type === "DISPLAY_ITEMS") {
    return { ...state, cart: action.payload, loading: false };
  }
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }
  if (action.type === "REMOVE_ITEM") {
    const newItems = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: newItems };
  }
  if (action.type === "INCREASE_ITEM") {
    const tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount++ };
      }
      return cartItem;
    });

    return { ...state, cart: tempCart };
  }
  if (action.type === "DECREASE_ITEM") {
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
  if (action.type === "GET_TOTALS") {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const itemTotal = price * amount;
        cartTotal.amount += amount;
        cartTotal.total = itemTotal;
        return cartTotal;
      },
      { total: 0, amount: 0 }
    );
    total = parseFloat(total.toFixed(2));
    return { ...state, total, amount };
  }
  return state;
};

export default reducer;
