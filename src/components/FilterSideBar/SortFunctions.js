const sortByDiscount = (products) => {
  const sortedProducts = products.sort((a, b) => {
    return b.discountPercentage - a.discountPercentage;
  });
  return sortedProducts;
};

const getDiscountedPrice = (price, discount) => {
  return Math.floor(price - (price * discount) / 100);
};

const sortByRating = (products) => {
  return products.sort((a, b) => b.rating - a.rating);
};

const lowToHighSort = (products) => {
  return products.sort(
    (a, b) =>
      getDiscountedPrice(a.price, a.discountPercentage) -
      getDiscountedPrice(b.price, b.discountPercentage)
  );
};

const highToLowSort = (products) => {
  return products.sort(
    (a, b) =>
      getDiscountedPrice(b.price, b.discountPercentage) -
      getDiscountedPrice(a.price, a.discountPercentage)
  );
};

export const sortFunction = (arrayToBeSorted, sortByType) => {
  switch (sortByType) {
    case "better discount":
      return sortByDiscount(arrayToBeSorted);
    case "customer rating":
      return sortByRating(arrayToBeSorted);
    case "price: high to low":
      return highToLowSort(arrayToBeSorted);
    case "price: low to high":
      return lowToHighSort(arrayToBeSorted);
    default:
      return arrayToBeSorted;
  }
};
