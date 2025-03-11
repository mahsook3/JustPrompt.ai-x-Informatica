import React from "react";
import NavBar from "../components/HomeNaveBar";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import USP from "../components/USP";
import CTA from "../components/CTA";
import Testimonies from "../components/Testimonies";
import Pricing from "../components/Pricing";
import FAQs from "../components/FAQs";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Features from "../components/Features";

export default function LandingPage() {
  return (
    <>
      <NavBar />
      <Hero />
      <Banner />
      <Features />
      <USP />
      <Testimonies />
      <Pricing />
      <FAQs />
      <Contact />
      <CTA />
      <Footer />
    </>
  );
}
