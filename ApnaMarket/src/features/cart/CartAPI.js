export function addToCart(item) {
  return new Promise(async (resolve) => {
    console.log("Added to cart", item);
    const response = await fetch("http://localhost:8080/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchItemByUserId() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart");
    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
}

export function updateCart(update) {
  console.log(update);
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    console.log("DATADA : ", data);
    resolve({ data });
  });
}

export function deleteItemFromCart(itemId) {
  console.log(itemId);
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + itemId, {
      method: "DELETE",
      body: JSON.stringify(),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data: { id: itemId } });
  });
}

export function resetCart() {
  return new Promise(async (resolve) => {
    const response = await fetchItemByUserId();
    const items = response.data;
    for (let item of items) {
      await deleteItemFromCart(item.id);
    }
    resolve({ status: "success" });
  });
}
