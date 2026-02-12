"use client";

import { slidesData4 } from "@/data/heroslides";
import { EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Hero() {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith("/en");

  const headline = isEnglish
    ? "Touski — hard-to-find home essentials in Canada"
    : "Touski — indispensables maison introuvables au Canada";

  const subline = isEnglish
    ? "Draft proofing • Kitchen • Bathroom — useful, effective, carefully selected"
    : "Anti-courants d'air • Cuisine • Salle de bain — utiles, efficaces, selectionnes";

  const cta1 = isEnglish ? "View Draft Proofing" : "Voir Anti-courants d'air";
  const cta2 = isEnglish
    ? "View Kitchen & Bathroom"
    : "Voir Cuisine & Salle de bain";

  const swiperOptions = {
    autoplay: false,
    allowTouchMove: false,
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
                    "linear-gradient(90deg, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.08) 78%, rgba(0,0,0,0) 100%)",
                  zIndex: 1,
                }}
              />
              <Image
                loading="lazy"
                src={elm.imageSrc}
                width="1863"
                height="700"
                alt={elm.imageAlt || "TOUSKI Hero"}
                className="slideshow-bg__img object-fit-cover"
                style={{ objectPosition: "center" }}
              />
            </div>

            <div
              className="slideshow-text container position-absolute top-50 translate-middle-y"
              style={{
                left: "clamp(1rem, 5vw, 4rem)",
                maxWidth: "720px",
                zIndex: 2,
              }}
            >
              <h1
                className="fw-bold animate animate_fade animate_btt animate_delay-5"
                style={{ fontSize: "clamp(1.7rem, 4.3vw, 3rem)", lineHeight: 1.12 }}
              >
                <span
                  style={{
                    display: "inline-block",
                    backgroundColor: "rgb(239, 99, 40)",
                    color: "#fff",
                    padding: "0.35em 0.55em",
                    borderRadius: 8,
                  }}
                >
                  {headline}
                </span>
              </h1>

              <p
                className="animate animate_fade animate_btt animate_delay-6 mt-3 mb-4"
                style={{ color: "#fff", fontSize: "1.05rem", maxWidth: 620 }}
              >
                {subline}
              </p>

              <div className="d-flex flex-wrap gap-2 gap-sm-3">
                <Link
                  href="/products?category_slug=anti-courants-air"
                  className="text-uppercase fw-bold animate animate_fade animate_btt animate_delay-7"
                  style={{
                    display: "inline-block",
                    backgroundColor: "rgb(239, 99, 40)",
                    color: "#fff",
                    padding: "0.55em 1em",
                    borderRadius: 6,
                  }}
                >
                  {cta1}
                </Link>

                <Link
                  href="/products?category_slug=cuisine"
                  className="text-uppercase fw-bold animate animate_fade animate_btt animate_delay-7"
                  style={{
                    display: "inline-block",
                    backgroundColor: "#fff",
                    color: "#1f1f1f",
                    padding: "0.55em 1em",
                    borderRadius: 6,
                  }}
                >
                  {cta2}
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}

      <div className="slideshow-pagination position-left-center"></div>
    </Swiper>
  );
}
