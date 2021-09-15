import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import "./Navbar.css";
import { useAuth } from "../../context/AuthContext";
import { UseProduct } from "../../context/ProductContext";
import { Menu } from "@material-ui/icons";

export const Navbar = () => {
  const location = useLocation();
  const { auth, logoutHandler } = useAuth();
  const {
    state: { cart },
    dispatch,
  } = UseProduct();

  const privateRoutes = ["/wishlist", "/checkout/cart", "/checkout/address"];
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleLogout = () => {
    logoutHandler(
      privateRoutes.includes(location.pathname) ? "/" : location.pathname
    );
    dispatch({ type: "CLEAR_CART_AND_WISHLIST" });
  };

  return (
    <>
      <nav className="header">
        <div className="header__categories">
          <Link to="/">
            <img
              className="header__logo"
              src="https://www.linkpicture.com/q/ASTRA_1.png"
              alt=""
            />
          </Link>
          <Link to="/products/filter/men" className="header__link">
            <div className="header__option">
              <span className="header__optionLineOne">MEN</span>
            </div>
          </Link>
          <Link to="/products/filter/women" className="header__link">
            <div className="header__option">
              <span className="header__optionLineOne">WOMEN</span>
            </div>
          </Link>
          <Link to="/products/filter/accessories" className="header__link">
            <div className="header__option">
              <span className="header__optionLineOne">ACCESSORIES</span>
            </div>
          </Link>
        </div>

        <div className="header__nav">
          {!auth.token ? (
            <Link to="/login" className="header__link">
              <div className="header__option">
                <span className="header__optionLineOne">Login / Signup</span>
              </div>
            </Link>
          ) : (
            <div className="header__link" onClick={handleLogout}>
              <div className="header__option">
                <span className="header__optionLineOne">Logout</span>
              </div>
            </div>
          )}
          <Link to="/wishlist" className="header__link">
            <div className="header__option">
              <span className="header__optionLineOne">Wishlist</span>
            </div>
          </Link>

          <Link to="/checkout/cart" className="header__link">
            <div className="header__optionBasket">
              <ShoppingBasketIcon />

              <span className="header__optionLineTwo header__basketCount">
                {cart?.length || 0}
              </span>
            </div>
          </Link>
        </div>
      </nav>
      <nav className="nav__mobile">
        <Menu
          className="nav__hamburger"
          onClick={() => setNavbarOpen(!navbarOpen)}
        />

        <Link to="/">
          <img
            className="header__logo mobilenav__logo"
            src="https://www.linkpicture.com/q/ASTRA_1.png"
            alt=""
          />
        </Link>
        {!auth.token ? (
          <Link to="/login" className="header__link mobilenav__login">
            <div className="header__option">
              <span className="header__optionLineOne">Login / Signup</span>
            </div>
          </Link>
        ) : (
          <div className="header__link mobilenav__login" onClick={handleLogout}>
            <div className="header__option">
              <span className="header__optionLineOne">Logout</span>
            </div>
          </div>
        )}
        <div
          style={
            navbarOpen
              ? { transform: "translateX(0%)", display: "flex" }
              : { transform: "translateX(-100%)", opacity: 0 }
          }
          className="navmobile__items"
        >
          <Link to="/products/filter/men" className="header__link">
            <div
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="header__option"
            >
              <span className="header__optionLineOne">Men</span>
            </div>
          </Link>

          <Link to="/products/filter/women" className="header__link">
            <div
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="header__option"
            >
              <span className="header__optionLineOne">Women</span>
            </div>
          </Link>
          <Link to="/products/filter/accessories" className="header__link">
            <div
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="header__option"
            >
              <span className="header__optionLineOne">Accessories</span>
            </div>
          </Link>
          <Link to="/wishlist" className="header__link">
            <div
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="header__option"
            >
              <span className="header__optionLineOne">Wishlist</span>
            </div>
          </Link>

          <Link to="/checkout/cart" className="header__link">
            <div
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="header__option"
            >
              <span className="header__optionLineOne">Cart</span>
            </div>
          </Link>
        </div>
      </nav>
    </>
  );
};
