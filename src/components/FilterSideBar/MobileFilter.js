import { Button } from "@material-ui/core";
import { Close, SwapVert } from "@material-ui/icons";
import { UseProduct } from "../../context/ProductContext";
import "./MobileFilter.css";
import filter from "../../assets/filter.svg";

const sortByNames = [
  "Better Discount",
  "Price: High to Low",
  "Price: Low to High",
  "Customer Rating",
];
export const MobileFilter = () => {
  const { state, dispatch } = UseProduct();

  const sortButtonHandler = () => {
    dispatch({ type: "OPEN_SORT" });
    dispatch({ type: "SET_OVERLAY" });
  };

  const filterButtonHandler = () => {
    dispatch({ type: "OPEN_FILTER" });
    dispatch({ type: "SET_OVERLAY" });
  };

  const closeFilterHandler = () => {
    dispatch({ type: "CLEAR_ALL_FILTERS" });
    dispatch({ type: "OPEN_FILTER" });
    dispatch({ type: "SET_OVERLAY" });
  };

  const getBrands = (products) => {
    const allBrands = products.map((product) => product.name);
    return allBrands
      .filter((brand, index) => allBrands.indexOf(brand) === index)
      .sort();
  };
  return (
    <div className="mobile-sort-and-filter-wrapper">
      <div className="mobile-sort-and-filter__buttons">
        <button className="sort-btn" onClick={sortButtonHandler}>
          <SwapVert /> SORT
        </button>
        <button className="filter-btn" onClick={filterButtonHandler}>
          <img src={filter} alt="" /> FILTER
        </button>
      </div>
      {state.openSort && (
        <div className="sort-wrapper">
          <div className="mobilesort__heading">
            <h4 className="sort-by-heading  rm">SORT BY</h4>
            <Button onClick={sortButtonHandler} startIcon={<Close />} />
          </div>
          {sortByNames.map((name, index) => {
            return (
              <button
                key={index}
                className={`sort-by-names-btn ${
                  state.sort[name.toLowerCase()] ? "current-sort" : ""
                }`}
                onClick={() => {
                  dispatch({ type: "SORT", payload: name });
                  dispatch({ type: "OPEN_SORT" });
                  dispatch({ type: "SET_OVERLAY" });
                }}
              >
                {name}
              </button>
            );
          })}
        </div>
      )}
      {state.openFilter && (
        <div className="filter-wrapper filter-wrapper-height">
          <div className="common-filters filter-border-bottom">
            <div className="mobilesort__heading">
              <h4 className="rm">FILTERS</h4>
              <Button onClick={() => dispatch({ type: "CLEAR_ALL_FILTERS" })}>
                CLEAR ALL
              </Button>
            </div>
          </div>

          <h4 className="rm padding">FILTER BY BRANDS</h4>
          {getBrands(state.products).map((item, index) => {
            return (
              <div key={index} className="mobileLabels">
                <label className="filter__labels ">
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
            );
          })}
          <div className="mobile-sort-and-filter__buttons">
            <button className="sort-btn" onClick={closeFilterHandler}>
              CLOSE
            </button>
            <button
              className="filter-btn purple-txt"
              onClick={filterButtonHandler}
            >
              APPLY
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
