export function addToCart(item) {
  // console.log(item);
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchItemByUserId(userId) {
  console.log(userId);
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart?user=" + userId);
    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
}

export function updateCart(update) {
  // console.log(item);
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteItemFromCart(itemId) {
  // console.log(item);
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + itemId, {
      method: "DELETE",
      body: JSON.stringify(itemId),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data: { id: itemId } });
  });
}
