"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

import Nav from "./components/Nav";
import { openCart } from "@/utlis/openCart";
import CartLength from "./components/CartLength";
import Image from "next/image";
import User from "./components/User";
import SearchPopup from "./components/SearchPopup";
import CategorySelect from "./components/CategorySelect";

export default function Header9() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Clear timeout précédent
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      // L'utilisateur est en train de scroller
      setIsScrolling(true);

      // Si on scroll vers le bas et qu'on est pas tout en haut
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } 
      // Si on scroll vers le haut
      else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }
      // Si on est tout en haut (< 100px)
      else if (currentScrollY <= 100) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;

      // Réapparaître automatiquement après 1.5s d'inactivité
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
        setIsVisible(true);
      }, 1500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
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
      <div className="header-desk header-desk_type_5">
        <div className="logo">
          <Link href="/">
            <Image
              src="/assets/images/touski-logo.jpeg"
              width={438}
              height={438}
              alt="Touski"
              className="logo__image d-block"
              style={{ height: 438, width: 'auto' }}
            />
          </Link>
        </div>
        {/* <!-- /.logo --> */}

        {/* Barre de recherche cachée temporairement */}
        {/* <form
          onSubmit={(e) => e.preventDefault()}
          className="header-search search-field d-none d-xxl-flex"
        >
          <button className="btn header-search__btn" type="submit">
            <svg
              className="d-block"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <use href="#icon_search" />
            </svg>
          </button>
          <input
            className="header-search__input w-100"
            type="text"
            name="search-keyword"
            placeholder="Search products..."
          />
          <CategorySelect />
        </form> */}
        {/* <!-- /.header-search --> */}

        <nav className="navigation mx-auto mx-xxl-0">
          <ul className="navigation__list list-unstyled d-flex">
            <Nav />
          </ul>
          {/* <!-- /.navigation__list --> */}
        </nav>
        {/* <!-- /.navigation --> */}

        <div className="header-tools d-flex align-items-center">
          {/* SearchPopup caché */}
          {/* <SearchPopup /> */}
          {/* <!-- /.header-tools__item hover-container --> */}

          <div className="header-tools__item hover-container">
            <a className="header-tools__item js-open-aside" href="#">
              <User />
            </a>
          </div>

          <Link className="header-tools__item" href="/account_wishlist">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <use href="#icon_heart" />
            </svg>
          </Link>

          {/* Panier temporairement caché - Mode catalogue */}
          {/* <a
            onClick={() => openCart()}
            className="header-tools__item header-tools__cart js-open-aside"
          >
            <svg
              className="d-block"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <use href="#icon_cart" />
            </svg>
            <span className="cart-amount d-block position-absolute js-cart-items-count">
              <CartLength />
            </span>
          </a> */}

          {/* Menu 3 lignes caché */}}
          {/* <a
            className="header-tools__item"
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#siteMap"
          >
            <svg
              className="nav-icon"
              width="25"
              height="18"
              viewBox="0 0 25 18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="25" height="2" />
              <rect y="8" width="20" height="2" />
              <rect y="16" width="25" height="2" />
            </svg>
          </a> */}
        </div>
        {/* <!-- /.header__tools --> */}
      </div>
      {/* <!-- /.header-desk header-desk_type_1 --> */}
    </header>
  );
}
