import React from "react";
import "./FilterSideBar.css";
import { UseProduct } from "../../context/ProductContext";
import { MobileFilter } from "./MobileFilter";

export const FilterSideBar = () => {
  const sortByLabels = [
    "Better Discount",
    "Price: High to Low",
    "Price: Low to High",
    "Customer Rating",
  ];
  const { state, dispatch } = UseProduct();

  const getAllBrands = (products) => {
    const allBrands = products.map((product) => product.name);
    return allBrands
      .filter((brand, index) => allBrands.indexOf(brand) === index)
      .sort();
  };

  return (
    <>
      <div className="sidebar">
        <div className="sidebar__heading">
          <div>SORT BY</div>
          <button
            className="clearAllFilters"
            onClick={() => dispatch({ type: "CLEAR_ALL_FILTERS" })}
          >
            CLEAR ALL
          </button>
        </div>
        <div className="filter">
          {sortByLabels.map((name, index) => {
            return (
              <div key={index}>
                <label className="filter__labels">
                  <input
                    name="sortBy"
                    type="radio"
                    checked={state.sort[name.toLowerCase()]}
                    onChange={() => dispatch({ type: "SORT", payload: name })}
                  />
                  <span className="checkmark"></span>
                  {name}
                </label>
              </div>
            );
          })}
        </div>
        <div className="sidebar__heading brandFilter">
          <div>FILTER BY BRANDS</div>
        </div>
        {getAllBrands(state.products).map((item, index) => (
          <div key={index}>
            <label className="filter__labels">
              <input
                type="checkbox"
                name={item}
                checked={state.brandFilter[item]}
                onChange={() =>
                  dispatch({ type: "FILTER_BY_BRAND", payload: item })
                }
              />
              <span className="checkmark"></span>
              {item}
            </label>
          </div>
        ))}
      </div>
      <MobileFilter />
    </>
  );
};
