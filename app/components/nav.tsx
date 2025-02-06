"use client";

import Image from "next/image";
import logoPlaceHolder from "@/public/logo-placeholder.png";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";


export default function Nav() {
  const { data: session, status } = useSession();


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
    return null
  }

  const renderNavLinks = () => {
    // if (!session) {
    //   return (
    //     <>
    //       {/* <a href="/signup" className="navbar-item">Become A Member!</a> */}
    //       <button onClick={() => signIn().then()} className="navbar-item">Become A Member!</button>
    //     </>
    //   );
    // }

    const { user } = session;

    return (
      <>
        <a href="/jobs" className="navbar-item">Jobs</a>
        {user.isAdmin && (
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
