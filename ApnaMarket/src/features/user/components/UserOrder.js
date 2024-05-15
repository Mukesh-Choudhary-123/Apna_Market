import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLoggedInUserOrderAsync,
  selectUserInfo,
  selectUserOrder,
} from "../UserSlice";
import { Navigate } from "react-router-dom";

export default function UserOrder() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const orders = useSelector(selectUserOrder);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync(user.id));
  }, [dispatch, user]);

  return (
    <>
      {!orders.length && <Navigate to="/" replace={true}></Navigate>}
      <div>
        <div className="mx-12 mb-12 mt-1 py-4 max-w-7xl px-6  sm:px-6 lg:px-20 bg-white">
          <h1 className="text-center text-4xl font-bold tracking-tight text-gray-900 mb-5">
            My Order
          </h1>
          {orders.map((order) => (
            <div className="border border-gray-300 mt-2 py-3 px-3">
              <p className="mt-0.5 text-sm text-gray-500">
                Order id : #{order.id}
              </p>
              <p className="mt-0.5 mb-2 text-sm text-gray-700">
                Order Status :
                <span className="text-red-500">{order.state}</span>
              </p>
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flow-root">
                  {order.items && order.items.length > 0 ? (
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {order.items.map((item) => (
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
                                  Qty : {item.quantity}
                                </label>
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
                  <p>{order.totalItem} items</p>
                </div>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Shipping Address :</p>
              <div className="flex justify-between gap-x-6 mt-2 py-5 px-4 border-solid border-2 border-gray-200">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {order?.selectedAddress?.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      <span className="text-sm font-semibold leading-6 text-gray-700">
                        city :
                      </span>
                      {order.selectedAddress?.city}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      <span className="text-sm font-semibold leading-6 text-gray-700">
                        street :{" "}
                      </span>
                      {order.selectedAddress?.street}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-800">
                    <span className="text-sm font-semibold leading-6 text-gray-900">
                      Phone on :{" "}
                    </span>
                    {order.selectedAddress?.phone}
                  </p>
                  <p className="text-sm leading-6 text-gray-500">
                    <span className="text-sm font-semibold leading-6 text-gray-700">
                      state :{" "}
                    </span>{" "}
                    {order.selectedAddress?.state}
                  </p>
                  <p className="text-sm leading-6 text-gray-500">
                    <span className="text-sm font-semibold leading-6 text-gray-700">
                      zip Code :{" "}
                    </span>{" "}
                    {order.selectedAddress?.pinCode}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
