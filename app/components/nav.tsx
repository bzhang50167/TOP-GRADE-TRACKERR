import Image from "next/image";
import logoPlaceHolder from "@/public/logo-placeholder.png";

export default function Nav() {
  const user = { isWorker: false };
  //
  //   const user = false;

  return (
    <header className="navbar bg-primary">
      <nav className="navbar-start">
        <a href="/" className="navbar-item">
          Top Grade
        </a>
        <Image src={logoPlaceHolder} alt="logo" className="logo" />
      </nav>
      <nav className="navbar-end">
        <a href="/about-us" className="navbar-item">
          About Us
        </a>

        {!user && (
          <a href="/signup" className="navbar-item">
            Become A Member!
          </a>
        )}
        {user.isWorker ? (
          <>
            <a href="/jobs" className="navbar-item">
              Jobs
            </a>
            <a href="/findings" className="navbar-item">
              Findings
            </a>
            <a href="/recommendations" className="navbar-item">
              Recommendations
            </a>
          </>
        ) : (
          <a href="/jobs" className="navbar-item">
            Jobs
          </a>
        )}
        <span style={{ color: "white" }}>(510)949-7009</span>
      </nav>
    </header>
  );
}
