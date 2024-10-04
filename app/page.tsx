"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
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
  console.log("Session: ", session);

  if (session) router.push("/jobs");

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div>
        <button className="btn btn-primary" onClick={() => signIn()}>
          Sign in
        </button>
      </div>
    </div>
  );
}
