import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="site-shell flex min-h-screen flex-col">
      <div className="ambient-blob left-[-8rem] top-[-4rem] h-[22rem] w-[22rem] bg-sunset/20" />
      <div className="ambient-blob right-[-6rem] top-[18rem] h-[24rem] w-[24rem] bg-primary/18" />
      <div className="ambient-blob bottom-[14rem] left-[10%] h-[18rem] w-[18rem] bg-ocean-light/30" />
      <Navbar />
      <main className="relative z-10 flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
