import { collectionsData } from "@/data/categories";
import React from "react";
import Link from "next/link";

const categoryLinks = {
  "Anti-courants d'air": "/products?category_slug=anti-courants-air",
  Cuisine: "/products?category_slug=cuisine",
  "Salle de bain": "/products?category_slug=salle-de-bain",
};

export default function Collections() {
  return (
    <section className="collections-grid full-width_padding-20">
      <div className="container">
        <div className="row g-3 g-lg-4">
          {collectionsData.map((item) => (
            <div key={item.id} className="col-12 col-md-6 col-lg-4">
              <Link
                href={categoryLinks[item.title] || "/products"}
                className="collection-grid__item position-relative d-block text-decoration-none"
                style={{ minHeight: 320 }}
              >
                <div
                  className="background-img"
                  style={{ backgroundImage: `url(${item.imageSrc})` }}
                ></div>
                <div className="content_abs content_bottom content_left p-3 p-lg-4">
                  <h3 className="text-uppercase mb-2">
                    <span
                      style={{
                        display: "inline-block",
                        backgroundColor: "rgb(239, 99, 40)",
                        color: "#fff",
                        padding: "0.2em 0.6em",
                        borderRadius: "0.25rem",
                      }}
                    >
                      {item.title}
                    </span>
                  </h3>
                  <p className="text-white mb-0" style={{ maxWidth: 280 }}>
                    {item.description}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
