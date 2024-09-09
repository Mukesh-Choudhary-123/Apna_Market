export const ITEMS_PER_PAGE = 21;
export const ITEMS_PER_PAGE2 = 10;
export function discountedPrice(item) {
  return Math.round(item?.price * (1 - item?.discountPercentage / 100), 2);
}

export function formatToIndianNumberingSystem(num) {
  // Convert number to string and split it by the decimal point
  let [integerPart, decimalPart] = num.toString().split(".");

  // Add commas to the integer part
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Format according to Indian numbering system
  integerPart = integerPart.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,");

  // Join the integer part and decimal part if any
  return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
}

// #AFC9DC
