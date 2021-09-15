import React, { useEffect } from "react";
import { useParams } from "react-router";
import { UseProduct } from "../../context/ProductContext";
import { FilterSideBar } from "../FilterSideBar/FilterSideBar";
import { sortFunction } from "../FilterSideBar/SortFunctions";
import { Product } from "./Product";

export const Products = ({ products }) => {
  const { state } = UseProduct();
  const param = useParams();
  window.scrollTo(0, 0);

  const FilterProducts = (products) => {
    let filteredProducts = products;
    if (param.category) {
      filteredProducts = filteredProducts.filter(
        (product) => param.category === product.category
      );
    }
    //brand filter
    const keysForBrand = Object.keys(state.brandFilter);
    const checkedBrands = keysForBrand.filter(
      (item) => state.brandFilter[item] === true
    );
    if (checkedBrands.length !== 0) {
      filteredProducts = filteredProducts.filter((product) =>
        checkedBrands.includes(product.name)
      );
    }
    //sort
    const keysForSorting = Object.keys(state.sort);
    const currentSortByType = keysForSorting.filter(
      (type) => state.sort[type] === true
    );
    if (currentSortByType.length !== 0) {
      filteredProducts = sortFunction(filteredProducts, currentSortByType[0]);
    }
    return filteredProducts;
  };

  return (
    <div className="products__wrapper">
      <FilterSideBar />
      {FilterProducts(products.products).length > 0 && (
        <div className="products">
          {FilterProducts(products.products)?.map((item) => (
            <Product
              key={item._id}
              id={item._id}
              name={item.name}
              image={item.image}
              description={item.description}
              discount={item.discountPercentage}
              price={item.price}
            />
          ))}
        </div>
      )}
      {FilterProducts(products.products).length === 0 && (
        <div className="products__noProducts">No products to display</div>
      )}
    </div>
  );
};
