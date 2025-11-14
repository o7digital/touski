"use client";

import { brandImages2 } from "@/data/brands";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

export default function Brands() {
  const swiperOptions = {
    autoplay: {
      delay: 5000,
    },
    modules: [Autoplay],
    slidesPerView: 7,
    slidesPerGroup: 7,
    effect: "none",
    loop: true,
    breakpoints: {
      320: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 14,
      },
      768: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 24,
      },
      992: {
        slidesPerView: 7,
        slidesPerGroup: 1,
        spaceBetween: 30,
        pagination: false,
      },
    },
  };
  return (
    <section className="brands-carousel container">
      <h5 className="mb-3 mb-xl-5 text-center">TOUSKI :</h5>
      <div className="text-center mb-4">
        <span className="fs-5 fw-medium mx-3">TOUSKI LATAM</span>
        <span className="fs-5 fw-medium mx-3">TOUSKI EUROPE</span>
        <span className="fs-5 fw-medium mx-3">TOUSKI USA</span>
      </div>
      <div className="position-relative d-none">
        <Swiper
          {...swiperOptions}
          className="swiper-container js-swiper-slider"
        >
          {brandImages2.map((elm, i) => (
            <SwiperSlide key={i} className="swiper-slide">
              <Image
                loading="lazy"
                src={elm.src}
                width={elm.width}
                height={elm.height}
                alt="image"
              />
            </SwiperSlide>
          ))}

          {/* <!-- /.swiper-wrapper --> */}
        </Swiper>
        {/* <!-- /.swiper-container js-swiper-slider --> */}
      </div>
      {/* <!-- /.position-relative --> */}
    </section>
  );
}
