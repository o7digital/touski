"use client"
import NavMenu from "./Menu/NavMenu"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import UseSticky from "@/hooks/UseSticky"
import LoginModal from "@/modals/LoginModal"

const HeaderFive = ({ style }: any) => {
   const { sticky } = UseSticky();

   return (
      <>
         <header className={`theme-main-menu menu-overlay menu-style-seven white-vr sticky-menu ${sticky ? "fixed" : ""}`}>
            <div className="inner-content gap-one">
               <div className="top-header position-relative">
                  <div className="d-flex align-items-center justify-content-between">
                     {/* 👇 LOGO */}
                     <div className="logo order-lg-0">
                        <Link href="/" className="d-flex align-items-center">
                           <Image 
                              src="/images/logo.png"     // logo desde /public
                              alt="LC Inmobiliaria" 
                              width={140} 
                              height={40} 
                              priority 
                           />
                        </Link>
                     </div>

                     {/* 👇 BOTONES A LA DERECHA */}
                     <div className="right-widget ms-auto ms-lg-0 me-3 me-lg-0 order-lg-3">
                        <ul className="d-flex align-items-center style-none">
                           <li>
                              <Link href="#" data-bs-toggle="modal" data-bs-target="#loginModal" className="btn-one">
                                 <i className="fa-regular fa-lock"></i> <span>Login</span>
                              </Link>
                           </li>
                           <li className="d-none d-md-inline-block ms-3">
                              <Link href="/dashboard/add-property" className="btn-two" target="_blank">
                                 <span>Add Listing</span> <i className="fa-thin fa-arrow-up-right"></i>
                              </Link>
                           </li>
                        </ul>
                     </div>

                     {/* 👇 MENÚ DE NAVEGACIÓN */}
                     <nav className="navbar navbar-expand-lg p0 order-lg-2">
                        <button className="navbar-toggler d-block d-lg-none" type="button" data-bs-toggle="collapse"
                           data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                           aria-label="Toggle navigation">
                           <span></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                           <NavMenu />
                        </div>
                     </nav>
                  </div>
               </div>
            </div>
         </header>
         <LoginModal />
      </>
   )
}

export default HeaderFive
