// "use client";

import HomepageCarousel from "./components/homepageCarousel";

// import { useSession, signIn, signOut } from "next-auth/react";
// import { useRouter } from "next/navigation";

export default function Home() {
  // const { data: session, status } = useSession();
  // const router = useRouter();
  // if (status === "loading") {
  //   return (
  //     <div className="w-screen h-screen flex justify-center items-center flex-col gap-4">
  //       <svg
  //         className="spinner-ring spinner-xl"
  //         viewBox="25 25 50 50"
  //         strokeWidth="5"
  //       >
  //         <circle cx="50" cy="50" r="20" />
  //       </svg>
  //       <p>Loading...</p>
  //     </div>
  //   );
  // }
  // console.log("Session: ", session);

  // if (session) router.push("/jobs");

  // return (
  //   <div className="w-screen h-screen flex justify-center items-center">
  //     <div>
  //       <button className="btn btn-primary" onClick={() => signIn()}>
  //         Sign in
  //       </button>
  //     </div>
  //   </div>
  // );

  return (
    <>
      <main className="flex flex-col w-full justify-start items-center border-3 border-black overflow-auto">
        <section
          id="hero"
          className="flex flex-col w-[75vw] items-center mt-[24px]"
        >
          <h2 className="text-h2">Welcome to Top Grade Tracker</h2>
          <p>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Rutrum placerat
            aptent netus netus id in. Malesuada metus a suspendisse; ultricies
            himenaeos odio. Donec facilisi metus eleifend consectetur purus cras
            lobortis mollis. Conubia massa vitae nullam arcu faucibus magnis.
            Cras semper nam maecenas pellentesque urna eget mauris. Fusce congue
            scelerisque lobortis elit felis at porttitor torquent.
          </p>
        </section>
        <HomepageCarousel />

        <section id="features">
          <h2 className="text-h2">Features</h2>
          <ul>
            <li>Lorem ipsum odor amet, consectetuer adipiscing elit.</li>
            <li>Litora luctus commodo aliquam consequat mus turpis.</li>
            <li>
              Vitae inceptos ligula ad iaculis semper ante tortor faucibus.{" "}
            </li>
          </ul>
        </section>

        <section id="testimonials" className="flex flex-col items-center">
          <h2 className="text-h2">What Our Customers Say</h2>
          <article className="flex gap-14">
            <div>
              <blockquote>&quot;This product changed my life!&quot;</blockquote>
              <p>- Happy Customer</p>
            </div>
            <div>
              <blockquote>&quot;This product changed my life!&quot;</blockquote>
              <p>- Happy Customer</p>
            </div>
            <div>
              <blockquote>&quot;This product changed my life!&quot;</blockquote>
              <p>- Happy Customer</p>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}
