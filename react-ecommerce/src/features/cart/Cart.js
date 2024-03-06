import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteItemFromCartAsync,
  selectItem,
  updateItemAsync,
} from "./CartSlice";
import { fetchItemByUserId } from "./CartAPI";
import { selectLoggedInUser } from "../auth/AuthSlice";
import { Navigate } from "react-router-dom";

export default function Cart() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const items = useSelector(selectItem);
  console.log(items);
  const item = items;
  console.log(item);
  const totalAmount = items.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );
  const totalItem = item.reduce((total, item) => item.quantity + total, 0);
  console.log(totalItem);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleQuantity = (e, item) => {
    dispatch(updateItemAsync({ ...item, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  return (
    <>
      {!item.length && <Navigate to="/" replace={true}></Navigate>}
      <div className="mx-12 mb-12 mt-12 py-4 max-w-7xl px-6  sm:px-6 lg:px-20 bg-white">
        <h1 className="text-center text-4xl font-bold tracking-tight text-gray-900 mb-5">
          Cart
        </h1>
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flow-root">
            {items && items.length > 0 ? (
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item[0].images[0]}
                        alt={item}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={item.href}>{item[0].title}</a>
                          </h3>
                          <p className="ml-4">$ {item[0].price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item[0].brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500 flex">
                          <label
                            htmlFor="quntity"
                            className="mx-2 mt-1 text-sm font-medium leading-6 text-gray-900"
                          >
                            Qty
                          </label>
                          <div>
                            <select
                              onChange={(e) => handleQuantity(e, item)}
                              value={item.quantity}
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex">
                          <button
                            onClick={(e) => handleRemove(e, item.id)}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No items in your cart.</p>
            )}
          </div>
        </div>

        <div className="border-t   border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>$ 200 </p>
          </div>
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
            <p>Total Item's in Cart</p>
            <p>{totalItem} items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link to="/checkout">
              <a
                href="#"
                className="flex items-center justify-center rounded-md border border-transparent bg-[rgba(223,27,51,255)] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#ef4444]"
              >
                Checkout
              </a>
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{" "}
              <Link to="/">
                <button
                  type="button"
                  className="font-medium text-[rgba(223,27,51,255)] hover:text-[#ef4444]"
                  onClick={() => setOpen(false)}
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
