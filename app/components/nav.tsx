"use client";

import Image from "next/image";
import logoPlaceHolder from "@/public/logo-placeholder.png";
import { signIn, signOut, useSession } from "next-auth/react";


export default function Nav() {
  const user = { isWorker: false };
  // const user = { isWorker: true };
  // const user = false;
  const { data: session } = useSession();

  console.log("Session data: ", session)

  const renderNavLinks = () => {
    if (!session) {
      return (
        <>
          {/* <a href="/signup" className="navbar-item">Become A Member!</a> */}
          <button onClick={() => signIn()} className="navbar-item">Become A Member!</button>
        </>
      );
    }

    return (
      <>
        <a href="/jobs" className="navbar-item">Jobs</a>
        {user && user.isWorker && (
          <>
            <a href="/findings" className="navbar-item">Findings</a>
            <a href="/recommendations" className="navbar-item">Recommendations</a>
          </>
        )}
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    );
  };

  return (
    <header className="navbar bg-primary">
      <nav className="navbar-start">
        <a href="/" className="navbar-item">Top Grade</a>
        <Image src={logoPlaceHolder} alt="logo" className="logo" />
      </nav>
      <nav className="navbar-end">
        <a href="/about-us" className="navbar-item">About Us</a>
        {renderNavLinks()}
        <span style={{ color: "white" }}>(510) 949-7009</span>
      </nav>
    </header>
  );
}
