const sortByDiscount = (products) => {
  const sortedProducts = products.sort((a, b) => {
    return b.discountPercentage - a.discountPercentage;
  });
  return sortedProducts;
};

const sortByRating = (products) => {
  return products.sort((a, b) => b.rating - a.rating);
};

const lowToHighSort = (products) => {
  return products.sort((a, b) => a.price - b.price);
};

const highToLowSort = (products) => {
  return products.sort((a, b) => b.price - a.price);
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
