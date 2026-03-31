import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="site-shell flex min-h-screen flex-col">
      <div className="ambient-blob left-[-8rem] top-[-4rem] h-[22rem] w-[22rem] bg-sunset/20" />
      <div className="ambient-blob right-[-7rem] top-[10rem] h-[24rem] w-[24rem] bg-primary/16" />
      <div className="ambient-blob bottom-[14rem] left-[10%] h-[18rem] w-[18rem] bg-ocean-light/24" />
      <div className="ambient-blob left-[18%] top-[28rem] h-[20rem] w-[20rem] bg-[rgba(255,150,94,0.24)]" />
      <div className="ambient-blob right-[12%] top-[34rem] h-[16rem] w-[16rem] bg-[rgba(255,118,163,0.18)]" />
      <Navbar />
      <main className="relative flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
