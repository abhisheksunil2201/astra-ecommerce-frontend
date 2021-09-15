import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router";
import { Home } from "./components/Home/Home";
import { Products } from "./components/Product/Products";
import { ProductDetail } from "./components/ProductDetail/ProductDetail";
import { useEffect } from "react";
import { CallApi } from "./utils/CallApi";
import { UseProduct } from "./context/ProductContext";
import { Login } from "./components/Login/Login";
import { SignUp } from "./components/Login/SignUp";
import { useAuth } from "./context/AuthContext";
import axios from "axios";
import { Cart } from "./components/Cart/Cart";
import { Wishlist } from "./components/Wishlist/Wishlist";
import { AuthRoute } from "./components/Navbar/AuthRoute";
import { BACKEND } from "./backend";
import { Address } from "./components/Address/Address";

function App() {
  const { state, dispatch } = UseProduct();
  const { auth } = useAuth();

  useEffect(() => {
    (async function () {
      const { response, error } = await CallApi("GET", `${BACKEND}/product`);
      if (!error) {
        dispatch({ type: "SET_PRODUCTS", payload: response.products });
      }
    })();
  }, []);

  useEffect(() => {
    auth.token &&
      (async function () {
        const response = await axios.get(`${BACKEND}/cart`, {
          headers: {
            authorization: auth.token,
          },
        });
        if (response.status === 200) {
          dispatch({ type: "SET_CART", payload: response.data.response });
        }
      })();
    auth.token &&
      (async function () {
        const response = await axios.get(`${BACKEND}/wishlist`, {
          headers: {
            authorization: auth.token,
          },
        });
        if (response.status === 200) {
          dispatch({ type: "SET_WISHLIST", payload: response.data.response });
        }
      })();
  }, [auth.token]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/products">
          <Products products={state} />
        </Route>
        <Route exact path="/products/filter/:category">
          <Products products={state} />
        </Route>
        <Route exact path="/products/:productId">
          <ProductDetail />
        </Route>
        <AuthRoute exact path="/checkout/cart">
          <Cart />
        </AuthRoute>
        <AuthRoute exact path="/checkout/address">
          <Address />
        </AuthRoute>
        <AuthRoute exact path="/wishlist">
          <Wishlist />
        </AuthRoute>
      </Routes>
    </div>
  );
}

export default App;
