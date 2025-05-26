import React from "react";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Background Video */}
      <video autoPlay muted loop className="background-video" playsInline>
        <source src="/video.mp4" type="video/mp4" />
        {/* Fallback text */}
        Your browser does not support the video tag.
      </video>

      {/* Hero Content */}
      <div className="hero-overlay">
        <h1 className="slide-in">🌍 Embark on Your Next Adventure</h1>
        <p className="fade-in">
          Where the journey begins, and memories are made.
        </p>
        <button className="cta-button">Let's Explore</button>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator"></div>
    </div>
  );
};

export default LandingPage;
