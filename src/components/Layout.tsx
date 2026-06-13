import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div className="site-shell flex min-h-screen flex-col">
      <Navbar />
      <main className={`relative flex-1 ${isHome ? "" : "pt-24 md:pt-32"}`}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
