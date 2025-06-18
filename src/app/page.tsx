import Navbar from "@/components/Navbar";
import HomePage from "@/components/HomePage";
import AboutSection from "@/components/AboutSection";
import "./globals.css";

export default function Home() {
  return (
    <>
      <header>
        <Navbar />
        <HomePage />
        <AboutSection />
      </header>
    </>
  );
}
