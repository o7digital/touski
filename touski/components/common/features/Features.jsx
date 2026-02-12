"use client";
import {
  servicePromotions,
  servicePromotionsData3,
  servicePromotionsDataDe,
  servicePromotionsDataEs,
} from "@/data/features";
import React from "react";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname } from "@/lib/i18n";

export default function Features() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname || "/");
  const items =
    locale === "en"
      ? servicePromotionsData3
      : locale === "de"
        ? servicePromotionsDataDe
        : locale === "es"
          ? servicePromotionsDataEs
          : servicePromotions;

  return (
    <section className="service-promotion container mb-md-4 pb-md-4 mb-xl-5">
      <div className="row">
        {items.map((elm, i) => (
          <div key={i} className="col-md-4 text-center mb-5 mb-md-0">
            <div className="service-promotion__icon mb-4">
              <svg
                width="52"
                height="52"
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href={elm.icon} />
              </svg>
            </div>
            <h3 className="service-promotion__title h5 text-uppercase">
              {elm.title}
            </h3>
            <p className="service-promotion__content text-secondary">
              {elm.content}
            </p>
          </div>
        ))}
        {/* <!-- /.col-md-4 text-center--> */}
      </div>
      {/* <!-- /.row --> */}
    </section>
  );
}
