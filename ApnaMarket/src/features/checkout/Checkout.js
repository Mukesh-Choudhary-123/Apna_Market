import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteItemFromCartAsync,
  selectCartStatus,
  selectItem,
  updateItemAsync,
} from "../cart/CartSlice";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { InfinitySpin } from "react-loader-spinner";
import { createOrderAsync, selectCurrentOrder } from "../order/OrderSlice";
import { selectUserInfo, updateUserAsync } from "../user/UserSlice";
import toast from "react-hot-toast";
import { discountedPrice } from "../../app/constants";

function Checkout() {
  const dispatch = useDispatch();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = useSelector(selectUserInfo);
  // const user = useSelector(selectLoggedInUser);
  const currentOrder = useSelector(selectCurrentOrder);
  const status = useSelector(selectCartStatus);
  const items = useSelector(selectItem);
  const item = items;
  console.log(user);

  const totalAmount = items.reduce(
    (amount, item) => discountedPrice(item.product) * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");

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

  const handleAddress = (e) => {
    setSelectedAddress(user.addresses[e.target.value]);
  };
  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
  };
  const handleOrder = (e) => {
    const order = {
      items,
      totalAmount,
      totalItems,
      user: user.id,
      paymentMethod,
      selectedAddress,
      status: "pending",
    };
    if (order.selectedAddress) {
      dispatch(createOrderAsync(order));
    } else {
      toast.error("Select Address");
    }
  };

  return (
    <>
      {!item.length && <Navigate to="/home" replace={true}></Navigate>}
      {currentOrder && currentOrder.paymentMethod === "cash" && (
        <Navigate
          to={`/order-success/${currentOrder.id}`}
          replace={true}
        ></Navigate>
      )}
      {currentOrder && currentOrder.paymentMethod === "online" && (
        <Navigate to={`/stripe-checkout/`} replace={true}></Navigate>
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <form
              className="bg-white mt-12 px-3 py-6 w-auto mb-4  rounded-xl"
              noValidate
              onSubmit={handleSubmit((data) => {
                console.log("DATA : ", data);

                dispatch(
                  updateUserAsync({
                    ...user,
                    addresses: [...user.addresses, data],
                  })
                );
                reset();
              })}
            >
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className=" lg:text-3xl md:text-3xl sm:text-3xl  text-2xl text-center font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("name", {
                            required: "name is required",
                          })}
                          id="fullName"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgba(223,27,51,255)] sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "email is required",
                          })}
                          type="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgba(223,27,51,255)] sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone Number
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          {...register("phone", {
                            required: "phone is required",
                          })}
                          type="tel"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgba(223,27,51,255)] sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("street", {
                            required: "street-address is required",
                          })}
                          id="street"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgba(223,27,51,255)] sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("city", {
                            required: "city is required",
                          })}
                          id="city"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgba(223,27,51,255)] sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("state", {
                            required: "state is required",
                          })}
                          id="state"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgba(223,27,51,255)] sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pinCode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("pinCode", {
                            required: "pinCode is required",
                          })}
                          id="pinCode"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgba(223,27,51,255)] sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-[rgba(223,27,51,255)] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#ef4444] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(223,27,51,255)]"
                  >
                    Add Address
                  </button>
                </div>
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Addresses
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose from Existing addresses
                  </p>
                  <ul role="list">
                    {user?.addresses?.map((address, index) => (
                      <li
                        key={index}
                        className="lg:flex md:flex sm:flex justify-between gap-x-6 mt-2 py-5 px-4 border-solid border-2 border-gray-200"
                      >
                        <div className="lg:flex md:flex sm:flex min-w-0 gap-x-4">
                          <input
                            id="address"
                            onChange={handleAddress}
                            name="address"
                            type="radio"
                            value={index}
                            className="h-4 w-4 border-gray-300 text-[rgba(223,27,51,255)] focus:ring-[rgba(223,27,51,255)]"
                          />
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {address.name}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              <span className="text-sm font-semibold leading-6 text-gray-700">
                                city :
                              </span>
                              {address.city}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              <span className="text-sm font-semibold leading-6 text-gray-700">
                                street :{" "}
                              </span>
                              {address.street}
                            </p>
                          </div>
                        </div>
                        <div className=" shrink-0 sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 text-gray-800">
                            <span className="text-sm font-semibold leading-6 text-gray-900">
                              Phone on :{" "}
                            </span>
                            {address.phone}
                          </p>
                          <p className="text-sm leading-6 text-gray-500">
                            <span className="text-sm font-semibold leading-6 text-gray-700">
                              state :{" "}
                            </span>{" "}
                            {address.state}
                          </p>
                          <p className="text-sm leading-6 text-gray-500">
                            <span className="text-sm font-semibold leading-6 text-gray-700">
                              zip Code :{" "}
                            </span>{" "}
                            {address.pinCode}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 space-y-10">
                    <fieldset required>
                      <legend className="text-sm font-semibold leading-6 text-gray-900">
                        Payment Method
                      </legend>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Choose One
                      </p>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            id="cash"
                            onChange={handlePayment}
                            name="payments"
                            type="radio"
                            value="cash"
                            checked={paymentMethod === "cash"}
                            className="h-4 w-4 border-gray-300 text-[rgba(223,27,51,255)] focus:ring-[rgba(223,27,51,255)]"
                          />
                          <label
                            htmlFor="cash"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Cash
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="online"
                            onChange={handlePayment}
                            name="payments"
                            type="radio"
                            checked={paymentMethod === "online"}
                            value="online"
                            className="h-4 w-4 border-gray-300 text-[rgba(223,27,51,255)] focus:ring-[rgba(223,27,51,255)]"
                          />
                          <label
                            htmlFor="online"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Online
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Cart */}
          <div className="lg:col-span-2">
            <div className="mb-12 lg:mt-12 md:mt-12 sm:mt-12 py-4 max-w-7xl px-0 rounded-xl sm:px-0 lg:px-0 bg-white">
              <h1 className="text-center lg:text-4xl md:text-3xl sm:text-3xl  text-2xl  font-bold tracking-tight text-gray-900 mb-5">
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
                    <span className="text-center mb-10">
                      Product Loading ...
                    </span>
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
                                  <a href={item?.href}>
                                    {item?.product?.title}
                                  </a>
                                </h3>
                                <p className="ml-4">$ {item?.product?.price}</p>
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
                                <button
                                  onClick={(e) => handleRemove(e, item.id)}
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
                    <p>No items in your cart yet.</p>
                  )}
                </div>
              </div>

              <div className="border-t   border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>$ {totalAmount}</p>
                </div>
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Total Item's in Cart</p>
                  <p>{totalItems} items</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <div
                    onClick={handleOrder}
                    className="flex items-center cursor-pointer justify-center rounded-md border border-transparent bg-[rgba(223,27,51,255)] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#ef4444]"
                  >
                    Order Now
                  </div>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{" "}
                    <Link to="/home">
                      <button
                        type="button"
                        className="font-medium text-[rgba(223,27,51,255)] hover:text-[#ef4444]"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
