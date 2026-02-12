"use client";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Nav from "./components/Nav";
import Image from "next/image";
import User from "./components/User";
import SearchPopup from "./components/SearchPopup";

export default function Header1() {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith("/en");
  const [scrollDirection, setScrollDirection] = useState("down");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 250) {
        if (currentScrollY > lastScrollY.current) {
          setScrollDirection("down");
        } else {
          setScrollDirection("up");
        }
      } else {
        setScrollDirection("down");
      }

      lastScrollY.current = currentScrollY;
    };

    const lastScrollY = { current: window.scrollY };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      id="header"
      className={`header header_sticky ${
        scrollDirection === "up" ? "header_sticky-active" : "position-absolute"
      }`}
    >
      <div
        className="text-center py-1"
        style={{ backgroundColor: "#f6f6f6", fontSize: 13, fontWeight: 500 }}
      >
        {isEnglish
          ? "Free shipping across Canada on orders over $140 CAD"
          : "Livraison gratuite partout au Canada des 140 $ CAD"}
      </div>

      <div className="container">
        <div className="header-desk header-desk_type_1">
          <div className="logo">
            <Link href="/">
              <Image
                src="/assets/images/touski-logo.jpeg"
                width={438}
                height={438}
                alt="Touski"
                className="logo__image d-block"
                style={{ height: 438, width: "auto" }}
              />
            </Link>
          </div>

          <nav className="navigation">
            <ul className="navigation__list list-unstyled d-flex">
              <Suspense fallback={null}>
                <Nav />
              </Suspense>
            </ul>
          </nav>

          <div className="header-tools d-flex align-items-center">
            <SearchPopup />

            <div className="header-tools__item hover-container">
              <a className="header-tools__item js-open-aside" href="#">
                <User />
              </a>
            </div>

            <a
              className="header-tools__item"
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#siteMap"
              aria-label="Open site map"
            >
              <svg
                className="nav-icon"
                width="25"
                height="18"
                viewBox="0 0 25 18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#icon_nav" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
