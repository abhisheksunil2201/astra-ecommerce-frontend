import { createContext, useContext, useReducer } from "react";
import { reducerUtil } from "./reducerUtil";

const ProductContext = createContext();

const brandNames = [
  "Forever New",
  "GANT",
  "Giorgio Armani",
  "HIGHLANDER",
  "HRX by Hrithik Roshan",
  "Hangup",
  "Libas",
  "Mast & Harbour",
  "Nike",
  "Peter England",
  "Ralph Lauren",
  "SASSAFRAS",
  "Versace",
];
const filterObject = {};

export const createBrandFilter = (filterObject) => {
  for (let i = 0; i < brandNames.length; i++) {
    filterObject[brandNames[i]] = false;
  }
  return filterObject;
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerUtil, {
    products: [],
    cart: [],
    wishlist: [],
    sort: {
      "better discount": false,
      "price: low to high": false,
      "price: high to low": false,
      "customer rating": false,
    },
    brandFilter: createBrandFilter(filterObject),
  });

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const UseProduct = () => {
  return useContext(ProductContext);
};
