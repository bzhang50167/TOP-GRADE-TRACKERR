"use client";

import HomepageCarousel from "./components/homepageCarousel";
import CopyrightFooter from "./components/copyrightFooter";
import LandingHeader from "./components/LandingHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons/faArrowDown";
import { useRef, useEffect, useState } from "react";

export default function Home() {

  const aboutUsRef = useRef(null);



  // useEffect(() => {
  //   if (typeof window === "undefined") return;
  //   const handleScroll = () => {
  //     console.log("window scrollY value ", window.scrollY);
  //     // Show the arrow button only when scrolled to the top of the page
  //     if (window.scrollY < 50) {
  //       // Adjust this value based on how far you want to scroll before hiding
  //       setIsVisible(true);
  //     } else {
  //       setIsVisible(false);
  //     }
  //   };

  //   // Add event listener for scroll
  //   window.addEventListener("scroll", handleScroll);

  //   // Cleanup the event listener on component unmount
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const testimonialCardStyle =
    "flex flex-col h-[100px] w-[200px] border-2 border-black items-center";

  return (
    // <div className="flex flex-col h-[calc(100vh-110px)] overflow-auto" >
    <div className="flex flex-col h-full overflow-auto">
      <main className="flex flex-col w-full justify-start items-center gap-16">
        <LandingHeader aboutUsRef={aboutUsRef}/>
        {/* {isVisible && (
          <div
            onClick={scrollToAboutUs}
            // className="flex w-[30px] h-[30px] justify-center items-center border-2 border-green-500 rounded-md hover:bg-gray-300 cursor-pointer duration-300"
            className="sticky bottom-[100px] left-1/2 transform -translate-x-1/2 text-3xl cursor-pointer"
            // style={{
            //   position: "fixed",
            //   bottom: "100px",
            //   left: "50%",
            //   transform: "translateX(-50%)",
            //   background: "transparent",
            //   border: "none",
            //   fontSize: "2rem",
            //   cursor: "pointer",
            // }}
          >
            <FontAwesomeIcon icon={faArrowDown} />
          </div>
        )} */}
        {/* <HomepageCarousel /> */}
        <section
          id="about-us"
          ref={aboutUsRef}
          className="flex flex-col items-center text-center w-[75vw] h-[100vh] gap-8"
        >
          <div className="flex flex-col items-center">
            <h2 className="text-h1">About Us</h2>
            <p>
              Top Grade Termite Control specializes in Non Fumigation localized
              treatments for the control of termite colonies with SAFE State
              Registered Chemicals to avoid the hassle of having to move out of
              your home!
            </p>
            <p>
              Our Treatments come with a optional 1 year or 3 year warranty!
            </p>
            <p>CA State License # PR8877</p>
          </div>
          <div>
            <h2 className="text-h2">Termite Inspections You Can Trust!</h2>
            <p>
              Here at Top Grade Termite Control your inspection reports are
              guaranteed to ALWAYS include photos of findings
            </p>
          </div>
        </section>

        <section id="features">
          <h2 className="text-h2">Features</h2>
          <ul>
            <li className="text-xl">
              Lorem ipsum odor amet, consectetuer adipiscing elit.
            </li>
            <li>Litora luctus commodo aliquam consequat mus turpis.</li>
            <li>
              Vitae inceptos ligula ad iaculis semper ante tortor faucibus.
            </li>
          </ul>
        </section>

        <section id="testimonials" className="flex flex-col items-center">
          <h2 className="text-h2">What Our Customers Say</h2>
          <article className="flex gap-14">
            <div className={testimonialCardStyle}>
              <blockquote>&quot;This product changed my life!&quot;</blockquote>
              <p>- Happy Customer</p>
            </div>
            <div className={testimonialCardStyle}>
              <blockquote>&quot;This product changed my life!&quot;</blockquote>
              <p>- Happy Customer</p>
            </div>
            <div className={testimonialCardStyle}>
              <blockquote>&quot;This product changed my life!&quot;</blockquote>
              <p>- Happy Customer</p>
            </div>
          </article>
        </section>
      </main>
      <CopyrightFooter />
    </div>
  );
}
