import { createBrandFilter } from "./ProductContext";

const removeItemFromArr = (arr, itemToBeRemoved) => {
  arr.filter((item) => item.id !== itemToBeRemoved.id);
};

const addNewItemToExistingArray = (
  existingArray,
  newItem,
  propertyToBeSetTrue,
  propertyToBeSetFalse
) => [
  { ...newItem, [propertyToBeSetTrue]: true, [propertyToBeSetFalse]: false },
  ...existingArray,
];

export const reducerUtil = (state, { type, payload, value }) => {
  switch (type) {
    case "SET_PRODUCTS":
      return { ...state, products: payload };
    case "SET_CART":
      return { ...state, cart: payload };
    case "SET_WISHLIST":
      return { ...state, wishlist: payload };
    case "ADD_TO_CART":
      return { ...state, cart: { ...state.cart, payload } };
    case "REMOVE_FROM_CART":
      return { ...state, cart: removeItemFromArr(state.cart, payload) };
    case "WISHLIST_ADD_OR_REMOVE":
      return {
        ...state,
        wishlist: payload.isWishlisted
          ? removeItemFromArr(state.wishlist, payload, "isWishlisted")
          : addNewItemToExistingArray(state.wishlist, payload, "isWishlisted"),
      };
    case "SORT":
      return {
        ...state,
        sort: {
          "better discount": false,
          "price: low to high": false,
          "price: high to low": false,
          "customer rating": false,
          [payload.toLowerCase()]: true,
        },
      };
    case "FILTER_BY_BRAND":
      return {
        ...state,
        brandFilter: {
          ...state.brandFilter,
          [payload]: !state.brandFilter[payload],
        },
      };
    case "CLEAR_ALL_FILTERS":
      return {
        ...state,
        brandFilter: createBrandFilter({}),
        sort: {
          "better discount": false,
          "price: low to high": false,
          "price: high to low": false,
          "customer rating": false,
        },
      };
    case "CLEAR_CART_AND_WISHLIST":
      return { ...state, cart: [] };
    case "OPEN_FILTER":
      return { ...state, openFilter: !state.openFilter };
    case "OPEN_SORT":
      return { ...state, openSort: !state.openSort };
    case "SET_OVERLAY":
      return { ...state, overlay: !state.overlay };
    default:
      return state;
  }
};
