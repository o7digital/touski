import { collectionsData } from "@/data/categories";
import React from "react";
import Link from "next/link";

// Mapping des catégories vers les filtres de la page /products
const categoryLinks = {
  "Fournitures": "/products?category=fournitures",
  "Cuisine": "/products?category=cuisine",
  "Salle de bain": "/products?category=salle-de-bain",
  "Lighting": "/products?category=lumieres",
  "Detergents": "/products?category=detergents",
};

export default function Collections() {
  return (
    <section className="collections-grid collections-grid_masonry gutters-20">
      <div className="h-md-100 full-width_padding-20">
        <div className="row h-md-100">
          <div className="col-lg-5 h-md-100">
            <Link 
              href={categoryLinks[collectionsData[0].title] || "/products"} 
              className="collection-grid__item position-relative h-md-100 d-block text-decoration-none"
            >
              <div
                className="background-img"
                style={{
                  backgroundImage: `url(${collectionsData[0].imageSrc})`,
                }}
              ></div>
              <div className="content_abs content_top content_left content_top-md content_left-md pt-2 px-2">
                <h3 className="text-uppercase mb-0">
                  <span
                    style={{
                      display: "inline-block",
                      backgroundColor: "rgb(239, 99, 40)",
                      color: "#fff",
                      padding: "0.15em 0.5em",
                      borderRadius: "0.25rem",
                    }}
                  >
                    {collectionsData[0].title}
                  </span>
                </h3>
              </div>
              {/* <!-- /.content_abs content_top content_left content_top-md content_left-md pt-2 px-2 --> */}
            </Link>
          </div>
          {/* <!-- /.col-md-6 --> */}

          <div className="col-lg-7 d-flex flex-column">
            <div className="position-relative flex-grow-1">
              <div className="row h-md-100">
                {collectionsData.slice(1, 3).map((elm, i) => (
                  <div key={i} className="col-md-6 h-md-100">
                    <Link 
                      href={categoryLinks[elm.title] || "/products"} 
                      className="collection-grid__item h-md-100 position-relative d-block text-decoration-none"
                    >
                      <div
                        className="background-img"
                        style={{ backgroundImage: `url(${elm.imageSrc})` }}
                      ></div>
                      <div className="content_abs content_top content_left content_top-md content_left-md pt-2 px-2">
                        <h3 className="text-uppercase mb-0">
                          <span
                            style={{
                              display: "inline-block",
                              backgroundColor: "rgb(239, 99, 40)",
                              color: "#fff",
                              padding: "0.15em 0.5em",
                              borderRadius: "0.25rem",
                            }}
                          >
                            {elm.title}
                          </span>
                        </h3>
                      </div>
                      {/* <!-- /.content_abs content_top content_left content_top-md content_left-md pt-2 px-2 --> */}
                    </Link>
                    {/* <!-- /.collection-grid__item --> */}
                  </div>
                ))}
              </div>
            </div>

            <div className="position-relative flex-grow-1 mt-lg-3 pt-lg-1">
              <div className="row h-md-100">
                {collectionsData.slice(3, 5).map((elm, i) => (
                  <div key={i} className="col-md-6 h-md-100">
                    <Link 
                      href={categoryLinks[elm.title] || "/products"} 
                      className="collection-grid__item h-md-100 position-relative d-block text-decoration-none"
                    >
                      <div
                        className="background-img"
                        style={{ backgroundImage: `url(${elm.imageSrc})` }}
                      ></div>
                      <div className="content_abs content_top content_left content_top-md content_left-md pt-2 px-2">
                        <h3 className="text-uppercase mb-0">
                          <span
                            style={{
                              display: "inline-block",
                              backgroundColor: "rgb(239, 99, 40)",
                              color: "#fff",
                              padding: "0.15em 0.5em",
                              borderRadius: "0.25rem",
                            }}
                          >
                            {elm.title}
                          </span>
                        </h3>
                      </div>
                      {/* <!-- /.content_abs content_top content_left content_top-md content_left-md pt-2 px-2 --> */}
                    </Link>
                    {/* <!-- /.collection-grid__item --> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* <!-- /.col-md-6 --> */}
        </div>
        {/* <!-- /.row --> */}
      </div>
      {/* <!-- /.container --> */}
    </section>
  );
}
