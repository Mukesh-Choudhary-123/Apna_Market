import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { InfinitySpin } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { discountedPrice } from "../../app/constants";
import Modal from "../common/Modal";
import {
  deleteItemFromCartAsync,
  selectCartStatus,
  selectItem,
  updateItemAsync,
} from "./CartSlice";
import Lottie from "lottie-react";
import AminationData from "./CartEmpty.json";

export default function Cart() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const items = useSelector(selectItem);

  console.log(items);

  const status = useSelector(selectCartStatus);

  const [openModal, setOpenModal] = useState(null);

  const item = items;

  const totalAmount =
    items.reduce(
      (amount, item) => discountedPrice(item?.product) * item.quantity + amount,
      0
    ) || 10;

  console.log(totalAmount);
  const totalItem = item.reduce((total, item) => item.quantity + total, 0);
  console.log(totalItem);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleQuantity = (e, item) => {
    dispatch(updateItemAsync({ id: item.id, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
    toast.error("remove item from cart");
  };

  return (
    <>
      {!item.length ? (
        <div className="">
          <div className="justify-center flex">
            <Lottie animationData={AminationData} className="h-72 w-72 " />
          </div>
          <h1 className="text-center text-4xl">Cart is Empty</h1>
        </div>
      ) : (
        <>
          <div className="   mb-12  py-4  sm:px-6 lg:px-20 ">
            <h1 className="text-center lg:text-4xl md:text-3xl sm:text-3xl  text-2xl font-bold tracking-tight text-gray-900 mb-5">
              Cart
            </h1>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              {status === "loading" ? (
                <div className="flex flex-col justify-center items-center">
                  <InfinitySpin
                    visible={true}
                    width="200"
                    color="#df1b33"
                    ariaLabel="infinity-spin-loading"
                    className="align-center "
                  />
                  <span className="text-center ">Product Loading ...</span>
                </div>
              ) : null}
              <div className="flow-root">
                {items && items.length > 0 ? (
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {items?.map((item) => (
                      <li key={item.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item?.product?.thumbnail}
                            alt={item?.product?.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={item?.product?.id}>
                                  {item?.product?.title}
                                </a>
                              </h3>
                              <p className="ml-4">
                                $ {discountedPrice(item?.product)}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {item?.product?.brand}
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
                                  value={item?.quantity}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[rgba(223,27,51,255)] sm:max-w-xs sm:text-sm sm:leading-6"
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
                              <Modal
                                title={`Delete ${item?.product?.title}`}
                                message={
                                  "Are you sure you want to delete this item ? "
                                }
                                dangerOption={"Delete"}
                                cancelOption={"Cancel"}
                                cancelAction={() => setOpenModal(null)}
                                dangerAction={(e) => handleRemove(e, item.id)}
                                showModal={openModal === item.id}
                              />
                              <button
                                onClick={(e) => {
                                  setOpenModal(item.id);
                                }}
                                type="button"
                                className="font-medium text-[rgba(223,27,51,255)] hover:text-[#ef4444]"
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
                <p>$ {totalAmount} </p>
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
      )}
    </>
  );
}
