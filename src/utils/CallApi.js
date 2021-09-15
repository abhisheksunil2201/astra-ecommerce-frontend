import axios from "axios";
import { BACKEND } from "../backend";
import { isInWishlist } from "../components/CommonFunctions";

export const CallApi = async (method, route, data) => {
  switch (method) {
    case "GET": {
      try {
        const res = await axios({
          method: "GET",
          url: route,
        });
        if (res.status === 200) {
          return {
            response: res.data,
            error: false,
          };
        } else {
          throw new Error("Could not fetch data from server");
        }
      } catch (err) {
        return { response: err, error: true };
      }
    }
    default:
      return "The provided method is not valid";
  }
};

export const addProductToCart = async (e, dispatch, productId, token) => {
  e.preventDefault();
  if (token) {
    try {
      const {
        data: { response },
        status,
      } = await axios({
        method: "POST",
        url: `${BACKEND}/cart/${productId}`,
        headers: {
          authorization: token,
        },
      });
      if (status === 200) {
        dispatch({ type: "SET_CART", payload: response });
      }
    } catch (err) {
      console.log(err);
    }
  }
};

export const productRemoveFromCart = async (e, dispatch, token, productId) => {
  e.preventDefault();
  try {
    const {
      data: { response },
      status,
    } = await axios({
      method: "DELETE",
      url: `${BACKEND}/cart/${productId}`,
      headers: {
        authorization: token,
      },
    });
    if (status === 200) {
      dispatch({ type: "SET_CART", payload: response });
    }
  } catch (error) {
    console.error(error);
  }
};

export const wishlistManipulation = async (
  e,
  state,
  dispatch,
  token,
  productId
) => {
  e.preventDefault();
  if (token) {
    if (isInWishlist(state.wishlist, productId)) {
      productRemoveFromWishlist(dispatch, token, productId);
    } else {
      await productAddToWishlist(dispatch, token, productId);
    }
  }
};

export const productRemoveFromWishlist = async (dispatch, token, productId) => {
  try {
    const {
      data: { response },
      status,
    } = await axios({
      method: "DELETE",
      url: `${BACKEND}/wishlist/${productId}`,
      headers: {
        authorization: token,
      },
    });
    if (status === 200) {
      dispatch({ type: "SET_WISHLIST", payload: response });
    }
  } catch (error) {
    console.error({ error });
  }
};

export const productAddToWishlist = async (dispatch, token, productId) => {
  try {
    const {
      data: { response },
      status,
    } = await axios({
      method: "POST",
      url: `${BACKEND}/wishlist/${productId}`,
      headers: {
        authorization: token,
      },
    });
    if (status === 200) {
      dispatch({ type: "SET_WISHLIST", payload: response });
    }
  } catch (error) {
    console.error({ error });
  }
};

export const updateCart = async (quantity, dispatch, token, productId) => {
  try {
    const {
      data: { response },
      status,
    } = await axios({
      method: "PUT",
      url: `${BACKEND}/cart/${productId}`,
      data: { quantity: quantity },
      headers: {
        authorization: token,
      },
    });
    if (status === 200) dispatch({ type: "SET_CART", payload: response });
  } catch (error) {
    console.error({ error });
  }
};
