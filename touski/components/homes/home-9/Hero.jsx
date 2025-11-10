"use client";
import { slidesData4 } from "@/data/heroslides";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const swiperOptions = {
    autoplay: false, // disable auto sliding
    allowTouchMove: false, // disable swipe left/right
    modules: [EffectFade, Pagination],
    slidesPerView: 1,
    effect: "fade",
    loop: false,
    pagination: {
      el: ".slideshow-pagination",
      type: "bullets",
      clickable: false,
    },
  };
  return (
    <Swiper
      {...swiperOptions}
      className="swiper-container js-swiper-slider slideshow full-width_padding-20 slideshow-md swiper-container-fade swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events"
    >
      {slidesData4.map((elm, i) => (
        <SwiperSlide key={i} className="swiper-slide">
          <div className="overflow-hidden position-relative h-100">
            <div className="slideshow-bg">
              <Image
                loading="lazy"
                src={elm.imageSrc}
                width="1863"
                height="700"
                alt="image"
                className="slideshow-bg__img object-fit-cover object-position-right"
              />
            </div>
            <div className="slideshow-text container position-absolute start-50 top-50 translate-middle">
              <h6
                className="text-uppercase fs-base fw-bold animate animate_fade animate_btt animate_delay-3"
                style={{ color: '#FF9445', letterSpacing: '0.04em' }}
              >
                DECOUVREZ NOS OFFRES
              </h6>
              <h2 className="text-uppercase h1 fw-normal mb-0 animate animate_fade animate_btt animate_delay-5">
                <span
                  style={{
                    display: "inline-block",
                    backgroundColor: "rgba(255, 148, 69, 0.70)",
                    color: "#fff",
                    padding: "0.25em 0.6em",
                    borderRadius: "0.25rem",
                    boxShadow: "0 0 0 3px rgba(255, 148, 69, 0.70)",
                  }}
                >
                  {elm.subtitle}
                </span>
              </h2>
              {/* Description removed per request */}
              <Link
                href="/shop-1"
                className="text-uppercase fw-bold animate animate_fade animate_btt animate_delay-7"
                style={{
                  display: 'inline-block',
                  backgroundColor: '#FF9445',
                  color: '#fff',
                  padding: '0.4em 0.9em',
                  borderRadius: '6px',
                }}
              >
                BUY NOW
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}

      {/* <!-- /.slideshow-wrapper js-swiper-slider --> */}

      <div className="slideshow-pagination position-left-center"></div>
      {/* <!-- /.products-pagination --> */}
    </Swiper>
  );
}
