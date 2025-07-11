import Navbar from "@/components/Navbar";
import HomePage from "@/components/HomePage";
import AboutSection from "@/components/AboutSection";
import NavbarTypeSection from "@/components/NavbarTypeSection";
import NavbarView from "@/components/NavbarView";
import Footer from "@/components/Footer";
import "./globals.css";

export default function Home() {
  return (
    <>
      <header>
        <Navbar />
        <HomePage />
        <AboutSection />
        <NavbarTypeSection />
        <NavbarView />
        <Footer/>
      </header>
    </>
  );
}
