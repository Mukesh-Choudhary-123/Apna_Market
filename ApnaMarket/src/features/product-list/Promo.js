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
    "https://res.cloudinary.com/dyws4bybf/image/upload/v1720088276/61LyQRT19cL._SX425__tt3mys.jpg",
    "https://res.cloudinary.com/dyws4bybf/image/upload/v1720088345/51kI_O1lvhL._SX425__u8lq4m.jpg",
    "https://res.cloudinary.com/dyws4bybf/image/upload/v1720088323/61-4_MhelWL._SX425__o7mc8a.jpg",
    "https://res.cloudinary.com/dyws4bybf/image/upload/v1720088295/614kpgotpgL._SX425__it6pft.jpg",
    "https://res.cloudinary.com/dyws4bybf/image/upload/v1720088173/51M73SOIdhL._SX425__er8i6g.jpg",
    "https://res.cloudinary.com/dyws4bybf/image/upload/v1720088345/51kI_O1lvhL._SX425__u8lq4m.jpg",
  ];
  const images3 = [
    "https://res.cloudinary.com/dyws4bybf/image/upload/v1720088946/41W2JoaH1fL._SX679__zl6txx.jpg",
    "https://res.cloudinary.com/dyws4bybf/image/upload/v1720088970/51qkH9J3iQL._SX679__fkxhwo.jpg",
    "https://res.cloudinary.com/dyws4bybf/image/upload/v1720088992/51EikXXjxCL._SX679__ggkreg.jpg",
    "https://res.cloudinary.com/dyws4bybf/image/upload/v1720089036/51AivateDfL._SX679__bgyjkg.jpg",
    "https://res.cloudinary.com/dyws4bybf/image/upload/v1720088992/51EikXXjxCL._SX679__ggkreg.jpg",
    "https://res.cloudinary.com/dyws4bybf/image/upload/v1720089036/51AivateDfL._SX679__bgyjkg.jpg",
  ];
  const images4 = [
    "https://res.cloudinary.com/dyws4bybf/image/upload/v1720088593/61KqCLOkeBL._SY450__gopfwq.jpg",
    "https://res.cloudinary.com/dyws4bybf/image/upload/v1720088608/61A0E5h8I9L._SY450__hhdwq8.jpg",
    "https://res.cloudinary.com/dyws4bybf/image/upload/v1720088654/71UBNghfFvL._SY450__l9sxxp.jpg",
    "https://res.cloudinary.com/dyws4bybf/image/upload/v1720088680/81y8ZtrswtL._SY450__qpbwsv.jpg",
    "https://res.cloudinary.com/dyws4bybf/image/upload/v1720088693/71TLVK6f4YL._SY450__gcfdlr.jpg",
    "https://res.cloudinary.com/dyws4bybf/image/upload/v1720088593/61KqCLOkeBL._SY450__gopfwq.jpg",
  ];
  const images5 = [
    "https://res.cloudinary.com/dyws4bybf/image/upload/v1720087733/61C1xBjZG4L._SX425__ebuf0f.jpg",
    "https://res.cloudinary.com/dyws4bybf/image/upload/v1720087810/71-s0QkTMNL._SX425__tbfprr.jpg",
    "https://res.cloudinary.com/dyws4bybf/image/upload/v1720087832/81OPNdABnsL._SX425__lycisu.jpg",
    "https://res.cloudinary.com/dyws4bybf/image/upload/v1720087856/81pSFskGEKL._SX425__nfiykn.jpg",
    "https://res.cloudinary.com/dyws4bybf/image/upload/v1720087810/71-s0QkTMNL._SX425__tbfprr.jpg",
    "https://res.cloudinary.com/dyws4bybf/image/upload/v1720087832/81OPNdABnsL._SX425__lycisu.jpg",
  ];
  const images6 = [
    "https://res.cloudinary.com/dyws4bybf/image/upload/v1720086781/81T7Ukrc_eL._SX569__jjytc6.jpg",
    "https://res.cloudinary.com/dyws4bybf/image/upload/v1720086676/814PA8n5NWL._SX569__zfaymn.jpg",
    "https://res.cloudinary.com/dyws4bybf/image/upload/v1720086607/81scQvsHXmL._SX569__psaws5.jpg",
    "https://res.cloudinary.com/dyws4bybf/image/upload/v1720086676/814PA8n5NWL._SX569__zfaymn.jpg",
    "https://res.cloudinary.com/dyws4bybf/image/upload/v1720086607/81scQvsHXmL._SX569__psaws5.jpg",
    "https://res.cloudinary.com/dyws4bybf/image/upload/v1720086607/81scQvsHXmL._SX569__psaws5.jpg",
  ];
  const images7 = [];
  const delay = 3500;
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
      {/* bg-[#F2F4F6] */}
      <div className="relative overflow-hidden  bg-[#F2F4F6]">
        <div className="md:pb-80  pt-10 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-20">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <span className="text-xl font-bold tracking-tight text-gray-900 ">
                Welcome to e-commerce
              </span>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Apna Market,
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                where every purchase tells a story. Explore our curated
                collection of products / categories crafted with care and
                designed to inspire. Join us in discovering the perfect blend of
                style, quality, and convenience all at your fingertips.
              </p>
            </div>
            <div>
              <div className="">
                {/* Decorative image grid */}
                <div className=" invisible lg:visible md:visible  pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl">
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
                              {images6.map((url, index) => (
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
                              {images4.map((url, index) => (
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
                              {images5.map((url, index) => (
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
