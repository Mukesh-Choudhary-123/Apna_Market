import React, { Children } from "react";
import logo from "../logo.png";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { selectItem } from "../cart/CartSlice";
import { selectLoggedInUser } from "../auth/AuthSlice";
import ProfileLogo from "./Profile.png";
import { Tooltip } from "react-tooltip";
import { selectUserInfo } from "../user/UserSlice";

const user = {
  name: "Mukesh Choudhary",
  // email: "tom@example.com",
  imageUrl: "https://avatars.githubusercontent.com/u/118448246?v=4",
};
const navigation = [
  { name: "Products", link: "/admin", admin: true },
  { name: "Orders", link: "/admin/orders", admin: true },
];
const userNavigation = [
  { name: "My Profile", link: "/profile" },
  { name: "My Orders", link: "/my-orders" },
  { name: "Sign out", link: "/logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = ({ children }) => {
  const items = useSelector(selectItem);
  const userInfo = useSelector(selectUserInfo);
  console.log(userInfo);
  return (
    <>
      {userInfo && (
        <div>
          <div className="min-h-full ">
            <Disclosure
              as="nav"
              // className="bg-gradient-to-l from-[rgba(223,27,51,255)] via-[#d25252] to-gray-300"
              className="bg-[#F2F4F6]"
            >
              {({ open }) => (
                <>
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Link to="/home">
                            <div className="h-10   rounded-full text-align: center;">
                              <img
                                className="h-10  rounded-full"
                                src={logo}
                                alt="Apna Market logo"
                              />
                            </div>
                          </Link>
                        </div>
                        <div className="mx-auto max-w-7xl px-2 py-5 sm:px-3 lg:px-4">
                          <h1 className=" lg:text-3xl sm:text-1xl md:text-2xl font-bold tracking-tight text-gray-700">
                            Apna Market
                          </h1>
                        </div>
                        <div className="hidden md:block">
                          <div className="ml-10 flex items-baseline space-x-4">
                            {navigation.map((item) =>
                              item[userInfo?.role] ? (
                                <Link
                                  key={item.name}
                                  to={item.link}
                                  className={classNames(
                                    item.current
                                      ? "bg-red-50 text-red-700  ring-1 ring-inset ring-red-600/10"
                                      : "text-gray-300 hover:text-white",
                                    "rounded-md px-3 py-2 text-sm font-medium"
                                  )}
                                  aria-current={
                                    item.current ? "page" : undefined
                                  }
                                >
                                  {item.name}
                                </Link>
                              ) : null
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                          <Link to="/cart">
                            <button
                              data-tooltip-id="my-cart"
                              type="button"
                              className="relative rounded-full bg- p-1  text-black hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">
                                View notifications
                              </span>
                              <ShoppingCartIcon
                                className="h-7 w-7"
                                aria-hidden="true"
                              />
                            </button>
                          </Link>

                          {items.length > 0 && (
                            <span className="inline-flex items-center rounded-full mb-5 bg-red-50 px-2 py-1  text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                              {items.length}
                            </span>
                          )}
                          <Tooltip
                            id="my-cart"
                            place="top"
                            content="My Cart"
                            style={{ position: "absolute", zIndex: "7" }}
                          />

                          <Menu as="div" className="relative ml-3">
                            <div>
                              <Menu.Button
                                data-tooltip-id="my-profile"
                                className="relative rounded-full    text-black hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                              >
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">Open user menu</span>

                                <UserIcon
                                  className="h-7 w-7 mt-1"
                                  aria-hidden="true"
                                />
                              </Menu.Button>
                              <Tooltip
                                id="my-profile"
                                place="top"
                                content="My Profile"
                                style={{ position: "absolute", zIndex: "7" }}
                              />
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {userNavigation.map((item) => (
                                  <Menu.Item key={item.name}>
                                    {({ active }) => (
                                      <Link
                                        to={item.link}
                                        className={classNames(
                                          active ? "bg-gray-100" : "",
                                          "block px-4 py-2 text-sm text-gray-700"
                                        )}
                                      >
                                        {item.name}
                                      </Link>
                                    )}
                                  </Menu.Item>
                                ))}
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </div>
                      <div className="-mr-2 flex md:hidden">
                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-red-50 p-2 text-gray-400 hover:bg-[#ef4444] hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#ef4444]">
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <XMarkIcon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <Bars3Icon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </Disclosure.Button>
                      </div>
                    </div>
                  </div>

                  <Disclosure.Panel className="md:hidden">
                    {/* <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                      {navigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          to={item.link}
                          className={classNames(
                            item.current
                              ? "bg-red-50 text-red-700"
                              : "text-gray-300 hover:bg-white hover:text-red-700",
                            "block rounded-md px-3 py-2 text-base font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div> */}
                    <div className="border-t border-gray-700 pb-3 pt-4">
                      <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={user?.imageUrl}
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <div className="text-base font-medium leading-none text-gray-600">
                            {user?.name}
                          </div>
                          <div className="text-sm font-medium leading-none text-gray-400">
                            {userInfo?.email}
                          </div>
                        </div>
                        <Link to="/cart">
                          <button
                            type="button"
                            className="relative ml-4  flex-shrink-0 rounded-full bg-[#db5151] p-2 text-gray-800  hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">View notifications</span>
                            <ShoppingCartIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </button>
                        </Link>
                        {items.length > 0 && (
                          <span className="inline-flex items-center rounded-md mb-5 bg-red-50 px-2 py-1  text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                            {items.length}
                          </span>
                        )}
                      </div>
                      <div className="mt-3 space-y-1 px-2">
                        {userNavigation.map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.link}
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-700 hover:text-white"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </div>
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <main>
              <div className="mx-auto ">{children}</div>
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
