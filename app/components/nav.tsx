import Image from "next/image";
import logoPlaceHolder from "@/public/logo-placeholder.png";

export default function Nav() {
  // const user = { isWorker: false };
  // const user = { isWorker: true };
  const user = false;

  const renderNavLinks = () => {
    if (!user) {
      return (
        <>
          <a href="/signup" className="navbar-item">Become A Member!</a>
        </>
      );
    }

    return (
      <>
        <a href="/jobs" className="navbar-item">Jobs</a>
        {user?.isWorker && (
          <>
            <a href="/findings" className="navbar-item">Findings</a>
            <a href="/recommendations" className="navbar-item">Recommendations</a>
          </>
        )}
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
