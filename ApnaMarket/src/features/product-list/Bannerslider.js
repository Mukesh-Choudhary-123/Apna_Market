import React, { useEffect, useRef, useState } from "react";
import "./Bannerslider.css";

const Bannerslider = () => {
  const images = [
    "https://res.cloudinary.com/dyws4bybf/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,e_gradient_fade,y_-0.50/c_scale,co_rgb:ffffff,fl_relative,l_text:montserrat_25_style_light_align_center:Shop%20Now,w_0.5,y_0.18/v1720075514/71zFRCcMS2L._SX679__dba5jv.jpg",
    "https://res.cloudinary.com/dyws4bybf/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,e_gradient_fade,y_-0.50/c_scale,co_rgb:ffffff,fl_relative,l_text:montserrat_25_style_light_align_center:Shop%20Now,w_0.5,y_0.18/v1720076983/41KmWce2znL._SX300_SY300_QL70_FMwebp__bwlun9.webp",
    "https://res.cloudinary.com/dyws4bybf/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,e_gradient_fade,y_-0.50/c_scale,co_rgb:ffffff,fl_relative,l_text:montserrat_25_style_light_align_center:Shop%20Now,w_0.5,y_0.18/v1720077062/7148IE9uqzL._SX679__rj5d36.jpg",
    "https://res.cloudinary.com/dyws4bybf/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,e_gradient_fade,y_-0.50/c_scale,co_rgb:ffffff,fl_relative,l_text:montserrat_25_style_light_align_center:Shop%20Now,w_0.5,y_0.18/v1720084841/51i9uO9cpyL._SX522__yhmrst.jpg",
    "https://res.cloudinary.com/dyws4bybf/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,e_gradient_fade,y_-0.50/c_scale,co_rgb:ffffff,fl_relative,l_text:montserrat_25_style_light_align_center:Shop%20Now,w_0.5,y_0.18/v1720087260/71b6xRX9nEL._SX425__rqqbfp.jpg",
    "https://res.cloudinary.com/dyws4bybf/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,e_gradient_fade,y_-0.50/c_scale,co_rgb:ffffff,fl_relative,l_text:montserrat_25_style_light_align_center:Shop%20Now,w_0.5,y_0.18/v1720088276/61LyQRT19cL._SX425__tt3mys.jpg",
  ];

  const delay = 3000;
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
    <div className="slideshow2">
      <div
        className="slideshowSlider22"
        style={{
          transform: `translate3d(${-index * 63}%, 0, 0)`,
        }}
      >
        {images.map((url, index) => (
          <div className="slide2 " key={index}>
            <img src={url} alt="banner" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bannerslider;
