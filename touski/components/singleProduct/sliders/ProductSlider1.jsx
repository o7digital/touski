"use client";

import { useEffect, useState } from "react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/thumbs";
import "swiper/css";
import "photoswipe/dist/photoswipe.css";

import { Gallery, Item } from "react-photoswipe-gallery";
const defaultImages = [
  { imgSrc: "/assets/images/products/product_0.jpg" },
  { imgSrc: "/assets/images/products/product_0-1.jpg" },
  { imgSrc: "/assets/images/products/product_0-2.jpg" },
  { imgSrc: "/assets/images/products/product_0-3.jpg" },
];
import Image from "next/image";
import tippy from "tippy.js";
export default function ProductSlider1({ images }) {
  useEffect(() => {
    tippy("[data-tippy-content]");
  }, []);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const imageList =
    Array.isArray(images) && images.length
      ? images.map((img) => ({
          imgSrc:
            (typeof img === "string" ? img : img.src || img.thumbnail) ||
            "/assets/images/products/product_0.jpg",
        }))
      : defaultImages;
  return (
    <div className="product-single__media vertical-thumbnail product-media-initialized">
      <div className="product-single__image position-relative">
        <Gallery>
          <Swiper
            modules={[Thumbs, Navigation]}
            slidesPerView={1}
            thumbs={{ swiper: thumbsSwiper }}
            navigation={{ prevEl: ".ssnbp1", nextEl: ".ssnbn1" }}
            className="swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events"
          >
            {imageList.map((elm, i) => (
              <SwiperSlide
                style={{
                  maxWidth: "100%",
                  overflow: "hidden",
                  position: "relative",
                }}
                key={i}
                className="swiper-slide product-single__image-item"
              >
                <Item
                  original={elm.imgSrc}
                  thumbnail={elm.imgSrc}
                  width="1000"
                  height="1000"
                >
                  {({ ref, open }) => (
                    <div
                      ref={ref}
                      onClick={open}
                      style={{ cursor: "zoom-in", position: "relative" }}
                    >
                      <Image
                        loading="lazy"
                        className="h-auto w-100"
                        src={elm.imgSrc}
                        width="1000"
                        height="1000"
                        alt="image"
                      />
                      <div
                        className="item-zoom"
                        data-bs-toggle="tooltip"
                        data-bs-placement="left"
                        data-tippy-content="Zoom"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use href="#icon_zoom" />
                        </svg>
                      </div>
                    </div>
                  )}
                </Item>
              </SwiperSlide>
            ))}

            <div className="cursor-pointer swiper-button-prev ssnbp1">
              <svg
                width="7"
                height="11"
                viewBox="0 0 7 11"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#icon_prev_sm" />
              </svg>
            </div>
            <div className="cursor-pointer swiper-button-next ssnbn1">
              <svg
                width="7"
                height="11"
                viewBox="0 0 7 11"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#icon_next_sm" />
              </svg>
            </div>
          </Swiper>
        </Gallery>
      </div>
      <div className="product-single__thumbnail">
        <Swiper
          modules={[Thumbs]}
          breakpoints={{
            0: {
              direction: "horizontal",
              slidesPerView: imageList.length < 4 ? imageList.length : 4,
            },
            992: {
              direction: "vertical",
              slidesPerView: imageList.length < 4 ? imageList.length : 4,
            },
          }}
          className="swiper-container swiper-container-initialized swiper-container-pointer-events swiper-container-free-mode swiper-container-thumbs"
          onSwiper={setThumbsSwiper}
          spaceBetween={8}
        >
          {imageList.map((elm, i) => (
            <SwiperSlide
              key={i}
              className="swiper-slide product-single__image-item"
            >
              <Image
                loading="lazy"
                className="h-auto w-100"
                src={elm.imgSrc}
                width="104"
                height="104"
                alt="image"
                style={{ objectFit: "cover" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
