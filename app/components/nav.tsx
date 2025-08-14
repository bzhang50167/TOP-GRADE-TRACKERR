"use client";

import Image from "next/image";
import logoPlaceHolder from "@/public/logo-placeholder.png";
import { signOut, useSession } from "next-auth/react";

export default function Nav() {
  const { data: session, status } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: window.location.origin });  // Redirect to the root page
  };

  if (status === "loading") {
    return (
      <div className="w-screen h-screen flex justify-center items-center flex-col gap-4">
        <svg
          className="spinner-ring spinner-xl"
          viewBox="25 25 50 50"
          strokeWidth="5"
        >
          <circle cx="50" cy="50" r="20" />
        </svg>
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <header className="navbar bg-primary">
      <nav className="navbar-start">
        <a href="/" className="navbar-item">
          Top Grade
        </a>
        <Image src={logoPlaceHolder} alt="logo" className="logo" />
      </nav>
      <nav className="navbar-end">
        {/* <a href="/about-us" className="navbar-item">About Us</a> */}
        <a href="/calendar" className="navbar-item">
          Calendar
        </a>
        <span style={{ color: "white" }}>(510) 949-7009</span>
        {/* {renderNavLinks()} */}          <>
            <a href="/findings" className="navbar-item">
              Findings
            </a>
            <a href="/recommendations" className="navbar-item">
              Recommendations
            </a>
          </>
        <button onClick={handleSignOut}>Sign Out</button>
      </nav>
    </header>
  );
}
