import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrder,
  updateOrderAsync,
} from "../../order/OrderSlice";
import { ITEMS_PER_PAGE2, discountedPrice } from "../../../app/constants";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline";

const AdminOrders = () => {
  const dispatch = useDispatch();

  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrder);
  console.log(orders);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({});

  const [sortId, setSortId] = useState("id");

  const [editableOrderId, setEditableOrderId] = useState(-1);

  const handleShow = () => {};

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };

  const handleUpdate = (e, order) => {
    const updateOrder = { ...order, status: e.target.value };
    console.log(" updateOrder --> ", updateOrder);
    dispatch(updateOrderAsync(updateOrder));
    setEditableOrderId(-1);
  };

  const handlePage = (page) => {
    // console.log(page);
    setPage(page);
    // const pagination = { _page: page, _per_page: ITEMS_PER_PAGE2 };
    // dispatch(fetchAllOrdersAsync(pagination));
  };

  console.log(sortId);

  const handleSort = ({ sortOption }) => {
    console.log("????????????????", sortOption);
    const sort = { _sort: sortOption };
    setSort(sort);
    if (sortId === "id") {
      setSortId("-id");
    } else {
      setSortId("id");
    }
  };

  const chooseColor = (state) => {
    switch (state) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-black text-white";
    }
  };
  useEffect(() => {
    const pagination = { _page: page, _per_page: ITEMS_PER_PAGE2 };
    console.log("--------sort :- ", sort);
    console.log("pagination pagination", pagination);
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  return orders ? (
    <div className="overflow-x-auto ">
      <div className=" min-w-screen min-h-screen  bg-gray-100 flex items-center justify-center  font-sans overflow-hidden">
        <div className="w-full ">
          <div className="bg-white shadow-md  overflow-x-auto rounded my-6">
            <table className="min-w-max w-full  table-auto ">
              <thead>
                <tr className="bg-gray-200  text-gray-600 uppercase text-sm leading-normal">
                  <th
                    className="py-3 px-6 text-left cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sortOption: sortId,
                      })
                    }
                  >
                    #Order{"  "}
                    {sortId === "id" ? (
                      <ArrowDownIcon className="h-4 w-4 inline"></ArrowDownIcon>
                    ) : (
                      <ArrowUpIcon className="h-4 w-4 inline"></ArrowUpIcon>
                    )}
                  </th>
                  <th className="py-3 px-6 text-left">Items</th>
                  <th className="py-3  text-left">Quantity</th>
                  <th className="py-3 px-6 text-center">Total Amount</th>
                  <th className="py-3 px-6 text-center">Shipping Address</th>
                  <th className="py-3 px-6 text-center">Status</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="text-gray-600 text-sm font-light">
                {orders?.map((order) => (
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    {/* Orders Id */}
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2"></div>
                        <span className="font-medium">#{order.id}</span>
                      </div>
                    </td>

                    {/* item title / item thumbnail / price*/}
                    <td className="py-3 px-6 text-left">
                      {order?.items.map((item) => (
                        <>
                          <div className="ml-6 ">
                            <img
                              className="w-20 h-20 "
                              src={item.product.thumbnail}
                            />
                          </div>
                          <div className="text-black mt-2 mb-2">
                            {item.product.title} ~ $
                            {discountedPrice(item.product)}
                          </div>
                        </>
                      ))}
                    </td>

                    {/* / item quantity */}
                    <td className="py-3 px-6 text-left">
                      {order?.items.map((item) => (
                        <div className="flex items-center">
                          <span>{item.quantity}</span>
                        </div>
                      ))}
                    </td>

                    {/* orders totalAmount */}
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        ${order.totalAmount}
                      </div>
                    </td>

                    {/* Shipping Address */}
                    <td className="py-3 px-6 text-center">
                      <div className="">
                        <div className="mb-1">
                          <strong>{order?.selectedAddress?.name}</strong>
                        </div>
                        <div className="text-left">
                          <strong>Email : </strong>
                          {order?.selectedAddress?.email}
                        </div>
                        <div className="text-left">
                          <strong>Phone : </strong>
                          {order?.selectedAddress?.phone},
                        </div>
                        <div className="text-left">
                          <strong>City : </strong>
                          {order?.selectedAddress?.city}
                        </div>
                        <div className="text-left">
                          <strong>PinCode : </strong>
                          {order?.selectedAddress?.pinCode}
                        </div>
                        <div className="text-left">
                          <strong>State : </strong>
                          {order?.selectedAddress?.state}
                        </div>

                        <div className="text-left">
                          <strong>Street : </strong>
                          {order?.selectedAddress?.street}
                        </div>
                      </div>
                    </td>

                    {/* orders status */}
                    <td className="py-3  text-center">
                      {order.id === editableOrderId ? (
                        <select
                          onChange={(e) => handleUpdate(e, order)}
                          className="block mt-5 w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[rgba(223,27,51,255)] sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option> select status </option>
                          <option value="pending">Pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseColor(
                            order.status
                          )} py-1 px-3 rounded-full text-xs`}
                        >
                          {order.status}
                        </span>
                      )}
                    </td>

                    {/* action */}
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <div className="mr-2  transform hover:text-purple-500 hover:scale-110 hover:cursor-pointer">
                          <EyeIcon
                            className="w-6 h-6"
                            onClick={(e) => handleShow(order)}
                          ></EyeIcon>
                        </div>
                        <div className="mr-2 ml-2 transform hover:text-purple-500 hover:scale-110 hover:cursor-pointer">
                          <PencilIcon
                            className="w-6 h-6"
                            onClick={(e) => handleEdit(order)}
                          ></PencilIcon>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        handlePage={handlePage}
        totalItems={totalOrders}

        //TODO
      ></Pagination>
    </div>
  ) : (
    <>No Order Yet</>
  );
};

export default AdminOrders;

function Pagination({ page, setPage, handlePage, totalItems }) {
  const totalPage = Math.ceil(totalItems / ITEMS_PER_PAGE2);
  console.log("totalpage ======= ", totalPage);
  return (
    <>
      {" "}
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </div>
        <div
          onClick={(e) => handlePage(page < totalPage ? page + 1 : page)}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * ITEMS_PER_PAGE2 + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {page * ITEMS_PER_PAGE2 > totalItems
                ? totalItems
                : page * ITEMS_PER_PAGE2}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <div
              onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-300 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon
                className="h-5 w-5 hover:cursor-pointer"
                aria-hidden="true"
              />
            </div>
            {Array.from({ length: totalPage }).map((el, index) => (
              <div
                onClick={(e) => handlePage(index + 1)}
                aria-current="page"
                className={`relative z-10 inline-flex items-center ${
                  index + 1 === page
                    ? "bg-[rgba(223,27,51,255)] text-white"
                    : "text-gray-400"
                }  px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {index + 1}
              </div>
            ))}

            <div
              onClick={(e) => handlePage(page < totalPage ? page + 1 : page)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-300 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon
                className="h-5 w-5 hover:cursor-pointer "
                aria-hidden="true"
              />
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
