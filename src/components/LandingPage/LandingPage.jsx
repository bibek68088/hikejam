import React from "react";
import "./LandingPage.css";
import heroVideo from "../assets/video.mp4";
import { loadFull } from "tsparticles";

const LandingPage = () => {
  

  return (
    <div className="landing-page">
      

      {/* Background Video */}
      <video autoPlay muted loop className="background-video">
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Hero Content */}
      <div className="hero-overlay">
        <h1 className="slide-in">🌍 Embark on Your Next Adventure</h1>
        <p className="fade-in">Where the journey begins, and memories are made.</p>
        <button className="cta-button">Let's Explore</button>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator"></div>
    </div>
  );
};

export default LandingPage;