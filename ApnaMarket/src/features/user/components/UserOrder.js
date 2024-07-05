import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLoggedInUserOrderAsync,
  selectUserInfo,
  selectUserOrder,
} from "../UserSlice";
import { Navigate } from "react-router-dom";
import { selectOrderStatus } from "../../order/OrderSlice";
import { InfinitySpin } from "react-loader-spinner";
import Footer from "../../common/Footer";
import Lottie from "lottie-react";
import AnimationData from "./NoOrderAnimation.json";

export default function UserOrder() {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrder);
  const status = useSelector(selectOrderStatus);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync());
  }, [dispatch]);

  console.log(orders);

  return (
    <>
      {!orders?.length ? (
        <>
          {/* <div className="min-h-screen">No Order Found</div> */}
          <div className="min-h-screen">
            <div className="justify-center flex">
              <Lottie
                animationData={AnimationData}
                className="h-72 w-72 mt-16"
              />
            </div>
            <h1 className="text-center text-4xl">Order Not Yet</h1>
          </div>
        </>
      ) : (
        <div className="min-h-screen">
          <div className="lg:mx-12 mb-12 mt-1 py-4  px-6  sm:px-6 lg:px-20 ">
            <h1 className="text-center lg:text-4xl md:text-3xl sm:text-3xl  text-2xl font-bold tracking-tight text-gray-900 mb-5">
              My Order
            </h1>
            {status === "loading" ? (
              <InfinitySpin
                visible={true}
                width="200"
                color="#df1b33"
                ariaLabel="infinity-spin-loading"
                className="align-center"
              />
            ) : null}
            {orders &&
              orders?.map((order) => (
                <div className="border border-gray-300 mt-2 py-3 px-3">
                  <p className="mt-0.5 text-sm text-gray-500">
                    Order id : #{order.id}
                  </p>
                  <p className="mt-0.5 mb-2 text-sm text-gray-700">
                    Order Status :
                    <span className="text-red-500"> {order.status}</span>
                  </p>
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flow-root">
                      {order.items && order.items.length > 0 ? (
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {order.items.map((item) => (
                            <li key={item.id} className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden ">
                                <img
                                  src={item.product.thumbnail}
                                  alt={item.product.title}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3 className="text-sm  lg:text-xl md:text-sm">
                                      <a href={item.href}>
                                        {item.product.title}
                                      </a>
                                    </h3>
                                    <p className="ml-4 text-xs lg:text-xl md:text-sm">
                                      ${item.product.price}
                                    </p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">
                                    {item.product.brand}
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
                      <p>$ {order?.totalAmount}</p>
                    </div>
                    <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                      <p>Total Item's in Cart</p>
                      <p>{order?.totalItems} items</p>
                    </div>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping Address :
                  </p>
                  <div className="lg:flex md:flex sm:flex justify-between gap-x-6 mt-2 py-5 px-4 border-solid border-2 border-gray-200">
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
                    <div className=" shrink-0 sm:flex sm:flex-col sm:items-end ">
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
      )}
      <Footer />
    </>
  );
}
