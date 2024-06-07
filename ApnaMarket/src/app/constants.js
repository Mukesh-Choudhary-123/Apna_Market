export const ITEMS_PER_PAGE = 21;
export const ITEMS_PER_PAGE2 = 10;
export function discountedPrice(item) {
  return Math.round(item?.price * (1 - item?.discountPercentage / 100), 2);
}

// #AFC9DC
