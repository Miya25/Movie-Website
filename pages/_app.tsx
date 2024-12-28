import "../styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "../components/Static/Footer";
import Navbar from "../components/Static/Navbar";
import { ThemeProvider } from "next-themes";
import {Sidebar} from "../components/Static/Sidebar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <div className="min-h-[67vh] scroll-smooth dark">
        <div className="bg-white absolute top-0 right-0 hidden lg:block z-[-1]"></div>
        <Navbar isLoggedIn={true} />
        <Sidebar />
        <Component {...pageProps} />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
