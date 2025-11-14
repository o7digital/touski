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
            {/* Rectangle blanc pour cacher le texte LIVING ROOM FURNITURE et 50% OFF */}
            <div 
              style={{
                position: 'absolute',
                top: '50px',
                left: '50px',
                width: '600px',
                height: '350px',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                zIndex: 1
              }}
            ></div>
            <div className="slideshow-text container position-absolute start-50 top-50 translate-middle">
              {/* Texte hero TOUSKI */}
              <h2 
                className="text-uppercase fw-bold animate animate_fade animate_btt animate_delay-5"
                style={{
                  fontSize: '2.5rem',
                  color: '#333',
                  marginBottom: '1rem',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                TOUSKI est nécessaire pour son chez-soi
              </h2>
              <Link
                href="/shop-1"
                className="text-uppercase fw-bold animate animate_fade animate_btt animate_delay-7"
                style={{
                  display: 'inline-block',
                  backgroundColor: 'rgb(239, 99, 40)',
                  color: '#fff',
                  padding: '0.4em 0.9em',
                  borderRadius: '6px',
                  marginTop: '1rem',
                  opacity: 0.7,
                  position: 'relative',
                  zIndex: 2
                }}
              >
                DECOUVREZ MAINTENANT NOS OFFRES CLIC ICI →
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
