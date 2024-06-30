import React, { useEffect, useRef, useState } from "react";
import "./Promo.css";

function Promo() {
  const images = [
    "https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg",
    "https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg",
    "https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg",
    "https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg",
    "https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg",
    "https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg",
  ];
  const images2 = [
    "https://cdn.dummyjson.com/product-images/36/1.jpg",
    "https://cdn.dummyjson.com/product-images/36/3.webp",
    "https://cdn.dummyjson.com/product-images/36/4.jpg",
    "https://cdn.dummyjson.com/product-images/36/2.webp",
    "https://cdn.dummyjson.com/product-images/39/thumbnail.jpg",
    "https://cdn.dummyjson.com/product-images/40/thumbnail.jpg",
  ];
  const images3 = [
    "https://cdn.dummyjson.com/product-images/90/4.jpg",
    "https://cdn.dummyjson.com/product-images/81/1.jpg",
    "https://cdn.dummyjson.com/product-images/96/1.jpg",
    "https://cdn.dummyjson.com/product-images/98/1.jpg",
    "https://cdn.dummyjson.com/product-images/89/2.jpg",
    "https://cdn.dummyjson.com/product-images/99/1.jpg",
  ];
  const delay = 2500;
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <>
      {" "}
      <div className="relative overflow-hidden bg-[#F2F4F6]">
        <div className="md:pb-80  pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Summer styles are finally here
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                This year, our new summer collection will shelter you from the
                harsh elements of a world that doesn't care if you live or die.
              </p>
            </div>
            <div>
              <div className="mt-10">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="  pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-72 lg:-translate-y-1/2 lg:translate-x-5">
                    <div className="flex items-center space-x-5 lg:space-x-5">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-4">
                        {/* 64 */}
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 slide-container">
                          <div className="slideshow">
                            <div
                              className="slideshowSlider"
                              style={{
                                transform: `translate3d(${
                                  -index * 100
                                }%, 0, 0)`,
                              }}
                            >
                              {images.map((url, index) => (
                                <div className="slide" key={index}>
                                  <img src={url} alt="" />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        {/* 64 */}
                        <div className="h-44 w-44 overflow-hidden rounded-lg">
                          <div className="slideshow">
                            <div
                              className="slideshowSlider2"
                              style={{
                                transform: `translate3d(${
                                  -index * 100
                                }%, 0, 0)`,
                              }}
                            >
                              {images2.map((url, index) => (
                                <div className="slide" key={index}>
                                  <img src={url} alt="" />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-4 ">
                        <div className="h-44 mt-20 w-44 overflow-hidden rounded-lg ">
                          <div className="slideshow">
                            <div
                              className="slideshowSlider"
                              style={{
                                transform: `translate3d(${
                                  -index * 100
                                }%, 0, 0)`,
                              }}
                            >
                              {images3.map((url, index) => (
                                <div className="slide" key={index}>
                                  <img src={url} alt="" />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        {/* 64 */}
                        <div className="h-44 w-44 overflow-hidden rounded-lg">
                          <div className="slideshow">
                            <div
                              className="slideshowSlider"
                              style={{
                                transform: `translate3d(${
                                  -index * 100
                                }%, 0, 0)`,
                              }}
                            >
                              {images.map((url, index) => (
                                <div className="slide" key={index}>
                                  <img src={url} alt="" />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="h-44 w-44 mb-24 overflow-hidden rounded-lg">
                          <div className="slideshow">
                            <div
                              className="slideshowSlider"
                              style={{
                                transform: `translate3d(${
                                  -index * 100
                                }%, 0, 0)`,
                              }}
                            >
                              {images.map((url, index) => (
                                <div className="slide" key={index}>
                                  <img src={url} alt="" />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-4">
                        {/* 64 */}
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <div className="slideshow">
                            <div
                              className="slideshowSlider"
                              style={{
                                transform: `translate3d(${
                                  -index * 100
                                }%, 0, 0)`,
                              }}
                            >
                              {images.map((url, index) => (
                                <div className="slide" key={index}>
                                  <img src={url} alt="" />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        {/* 64 */}
                        <div className="h-44 w-44 overflow-hidden rounded-lg">
                          <div className="slideshow">
                            <div
                              className="slideshowSlider"
                              style={{
                                transform: `translate3d(${
                                  -index * 100
                                }%, 0, 0)`,
                              }}
                            >
                              {images.map((url, index) => (
                                <div className="slide" key={index}>
                                  <img src={url} alt="" />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <a
                  href="#"
                  className="inline-block rounded-md border border-transparent bg-[rgba(223,27,51,255)] px-8 py-3 text-center font-medium text-white  hover:bg-[#ef4444]"
                >
                  Shop Collection
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Promo;
