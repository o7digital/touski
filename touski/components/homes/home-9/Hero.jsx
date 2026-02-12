"use client";
import { slidesData4 } from "@/data/heroslides";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Hero() {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith("/en");

  const headline = isEnglish
    ? "Everything you need for your home"
    : "TOUSKI est nécessaire pour son chez-soi";

  const ctaLabel = isEnglish
    ? "DISCOVER OUR OFFERS CLICK HERE →"
    : "DECOUVREZ MAINTENANT NOS OFFRES CLIC ICI →";

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
              {/* Texte hero TOUSKI */}
              <h2 
                className="text-uppercase fw-bold animate animate_fade animate_btt animate_delay-5"
                style={{
                  fontSize: '2.5rem',
                  marginBottom: '1rem',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    backgroundColor: 'rgb(239, 99, 40)',
                    color: '#fff',
                    padding: '0.4em 0.9em',
                    borderRadius: '6px',
                  }}
                >
                  {headline}
                </span>
              </h2>
              <Link
                href="/products"
                className="text-uppercase fw-bold animate animate_fade animate_btt animate_delay-7"
                style={{
                  display: 'inline-block',
                  backgroundColor: 'rgb(239, 99, 40)',
                  color: '#fff',
                  padding: '0.4em 0.9em',
                  borderRadius: '6px',
                  marginTop: '1rem',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                {ctaLabel}
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
