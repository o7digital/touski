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
    ? "Happy Holidays from TOUSKI"
    : "Joyeuses Fêtes de TOUSKI";

  const subline = isEnglish
    ? "Cozy gifts and practical home essentials for every room."
    : "Cadeaux chaleureux et essentiels pratiques pour chaque pièce.";

  const ctaLabel = isEnglish
    ? "Explore holiday offers →"
    : "Découvrir les offres des Fêtes →";

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
            <div className="slideshow-bg position-relative">
              <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.1) 65%, rgba(0,0,0,0) 100%)",
                  zIndex: 1,
                }}
              />
              <Image
                loading="lazy"
                src={elm.imageSrc}
                width="1863"
                height="700"
                alt={elm.imageAlt || "image"}
                className="slideshow-bg__img object-fit-cover"
                style={{ objectPosition: "center" }}
              />
            </div>
            <div
              className="slideshow-text container position-absolute top-50 translate-middle-y"
              style={{
                left: "clamp(1rem, 6vw, 4.5rem)",
                maxWidth: "520px",
                zIndex: 2,
                color: "#fff",
              }}
            >
              {/* Texte hero TOUSKI */}
              <h2
                className="fw-bold animate animate_fade animate_btt animate_delay-5"
                style={{
                  fontSize: "2.5rem",
                  marginBottom: "0.75rem",
                  lineHeight: 1.1,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    backgroundColor: "rgb(239, 99, 40)",
                    color: "#fff",
                    padding: "0.4em 0.65em",
                    borderRadius: "6px",
                  }}
                >
                  {headline}
                </span>
              </h2>
              <p
                className="animate animate_fade animate_btt animate_delay-6"
                style={{
                  fontSize: "1.05rem",
                  marginBottom: "1rem",
                  maxWidth: "460px",
                  color: "#fff",
                }}
              >
                {subline}
              </p>
              <Link
                href="/products"
                className="text-uppercase fw-bold animate animate_fade animate_btt animate_delay-7"
                style={{
                  display: "inline-block",
                  backgroundColor: "rgb(239, 99, 40)",
                  color: "#fff",
                  padding: "0.55em 1.2em",
                  borderRadius: "6px",
                  marginTop: "0.25rem",
                  letterSpacing: "0.03em",
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
