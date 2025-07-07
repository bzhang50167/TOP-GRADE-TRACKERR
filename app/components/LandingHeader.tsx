"use client";


import React, { useRef } from "react";

interface LandingHeaderProps {
  aboutUsRef: React.RefObject<HTMLElement | null>;
}

export default function LandingHeader({ aboutUsRef }: LandingHeaderProps) {

  const scrollToAboutUs = () => {
    // Scroll smoothly to the section using the ref
    if (aboutUsRef.current) {
      aboutUsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <section
      id="hero"
      className="relative flex flex-col w-[100vw] h-[100vh] items-center justify-center pb-[100px] bg-red-400"
    >
      <h2 className="text-h2">Top Grade Termite Control</h2>

      <h1 className="text-h1">WE&apos;LL GET THE JOB DONE</h1>
      <p className="text-sm">
        Professional expertise for your termite control needs!
      </p>

      {/* <FontAwesomeIcon icon={faArrowDown} /> */}

      <div
        onClick={scrollToAboutUs}
        // className="flex w-[30px] h-[30px] justify-center items-center border-2 border-green-500 rounded-md hover:bg-gray-300 cursor-pointer duration-300"
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-3xl cursor-pointer"
      >
      </div>
    </section>
  );
}
