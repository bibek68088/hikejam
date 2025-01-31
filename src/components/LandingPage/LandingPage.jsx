import React from "react";
import "./LandingPage.css";
import heroVideo from "../assets/video.mp4";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const LandingPage = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="landing-page">
      {/* Particle Effect */}
      <Particles
        id="particles"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 100 },
            size: { value: { min: 1, max: 5 } },
            move: { speed: 2, direction: "none", random: true, straight: false },
            opacity: { value: { min: 0.3, max: 0.7 } },
            color: { value: "#ffffff" },
            links: {
              enable: true,
              distance: 150,
              color: "#ffffff",
              opacity: 0.4,
              width: 1,
            },
          },
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "repulse",
              },
            },
          },
        }}
      />

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