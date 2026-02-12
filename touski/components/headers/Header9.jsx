"use client";
import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Nav from "./components/Nav";
import Image from "next/image";
import User from "./components/User";

export default function Header9() {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith("/en");
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;

      scrollTimeout.current = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <header
      id="header"
      className={`header header_sticky header-fullwidth ${
        isVisible ? "header_sticky-active" : "header_sticky-hidden"
      }`}
      style={{
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <div
        className="text-center py-1"
        style={{ backgroundColor: "#f6f6f6", fontSize: 13, fontWeight: 500 }}
      >
        {isEnglish
          ? "Free shipping across Canada on orders over $140 CAD"
          : "Livraison gratuite partout au Canada des 140 $ CAD"}
      </div>

      <div className="header-desk header-desk_type_5">
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

        <nav className="navigation mx-auto mx-xxl-0">
          <ul className="navigation__list list-unstyled d-flex">
            <Suspense fallback={null}>
              <Nav />
            </Suspense>
          </ul>
        </nav>

        <div className="header-tools d-flex align-items-center">
          <div className="header-tools__item hover-container">
            <a className="header-tools__item js-open-aside" href="#">
              <User />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
