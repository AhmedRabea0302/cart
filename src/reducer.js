const reducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  } else if (action.type === "REMOVE_ITEM") {
    const newItems = state.cart.filter((item) => item.id !== action.id);
    return { ...state, cart: newItems };
  }
  return state;
};

export default reducer;
