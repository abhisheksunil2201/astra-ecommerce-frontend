export const isInWishlist = (wishlist, id) => {
  return wishlist.map((item) => item._id).includes(id);
};

export const getTotalPrice = (cart) => {
  return cart.reduce((amount, item) => {
    return amount + Number(item.product.price) * item.quantity;
  }, 0);
};

export const getTotalDiscountedPrice = (cart) => {
  return cart.reduce((amount, item) => {
    let discountedPrice = Math.floor(
      item.product.price -
        (item.product.price * item.product.discountPercentage) / 100
    );
    return amount + Number(discountedPrice) * item.quantity;
  }, 0);
};
