import React from "react";
import LOGO from "../logo.png";
import { Link } from "react-router-dom";
import "../IntroPage.css";
import Footer from "../features/common/Footer";

const IntroPage = () => {
  return (
    <div className="h-screen bg-[#F2F4F6] ">
      <nav className="bg-[#F2F4F6] border-gray-200 px-4 lg:px-6 py-2.5 ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl ">
          <a className="flex items-center ">
            <img
              src={LOGO}
              className="mr-3 h-6 sm:h-9"
              alt="Apna Market Logo"
            />
            <h1 className="lg:text-3xl sm:text-1xl md:text-2xl font-bold tracking-tight text-gray-700">
              Apna Market
            </h1>
          </a>
          <div className="flex items-center lg:order-2 ">
            <Link
              to={"/login"}
              className="relative inline-flex items-center justify-center leading-normal no-underline pb-1 text-black font-sans font-bold text-sm uppercase hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-neutral-500 transition group"
            >
              Log in
              <svg
                className="icon icon-tabler icon-tabler-arrow-up-right"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M17 7l-10 10" />
                <path d="M8 7l9 0l0 9" />
              </svg>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-neutral-700 origin-bottom-right transform transition duration-200 ease-out scale-x-0 group-hover:scale-x-100 group-hover:origin-bottom-left" />
            </Link>
          </div>
        </div>
      </nav>
      <div className=" relative overflow-hidden 0 bg-[#F2F4F6]">
        <div className="pt-16 sm:pt-24 lg:pt-40">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8 0">
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                <span className="text-4xl"> Welcome to</span> <br /> Apna Market
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                It's <span className="font-bold">online shopping website </span>{" "}
                where you can buy groceries, electronics, smartphones, TVs,
                gadgets, dresses, clothing, watches, and more.
              </p>
              <p className="mt-4 text-xl text-gray-500">
                Find everything you need with our wide range of quality
                products. Shop today and uncover top deals and exclusive
                discounts !
              </p>
              <p className="mt-4 text-xl text-gray-500">
                Your One-Stop Shop for All Your Needs – Easy and Convenient!
              </p>
            </div>
            <div>
              <div className="mt-10 ">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:left-1/2 0 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-[293px] lg:-translate-y-1/2 lg:translate-x-5">
                    <div className="flex items-center space-x-5 lg:space-x-5 ">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-4">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 slide-container bounce bounce-1">
                          <img
                            src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-44 w-44 overflow-hidden rounded-lg bounce bounce-2">
                          <img
                            src="https://cdn.dummyjson.com/product-images/80/2.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-4">
                        {/* This Image is going under the navbar, so apply ndex */}
                        <div className="h-40 mt-20 w-44 overflow-hidden rounded-lg bounce bounce-3  ">
                          <img
                            src="https://cdn.dummyjson.com/product-images/47/1.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-44 w-44 overflow-hidden rounded-lg bounce bounce-4">
                          <img
                            src="https://cdn.dummyjson.com/product-images/62/2.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-44 w-44 mb-24 overflow-hidden rounded-lg bounce bounce-5">
                          <img
                            src="https://cdn.dummyjson.com/product-images/8/2.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-4">
                        <div className="h-64 w-44 overflow-hidden rounded-lg bounce bounce-6">
                          <img
                            src="https://cdn.dummyjson.com/product-images/13/4.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-44 w-44 overflow-hidden rounded-lg bounce bounce-1">
                          <img
                            src="https://m.media-amazon.com/images/I/71uGU7evScL._SX679_.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default IntroPage;
