import React from "react";
import Contact from "../components/Contact.jsx";
import LandingPage from "../components/Landing.jsx";
import Testimonial from "../components/Testimonial.jsx";
import Faq from "../components/Faq.jsx";
import FeaturesGrid from "../components/Features.jsx";
import { Container } from "@mui/material/";
import { Services } from "../components/Services.jsx";
import Hero from "../components/Hero.jsx";
import Footer from "../components/Footer.jsx";
import AppAppBar from "../components/Header.jsx";
import "../App.css";

export default function Home() {
  return (
    <>
      <AppAppBar />
      <LandingPage />
      <Container
        sx={{
          marginTop: 8.7,
        }}
      >
        <Services />
        <Hero />
        <FeaturesGrid />
        <Testimonial />
        <Contact />
        <Faq />
      </Container>
      <Footer />
    </>
  );
}
