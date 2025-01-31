import React from "react";
import "./LandingPage.css";
import heroVideo from "../assets/video.mp4"; // Background video
import Particles from "react-tsparticles"; // Particle effect
import { loadFull } from "tsparticles"; 

const LandingPage = () => {
  // Configuring particles
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
            size: { value: 3 },
            move: { speed: 1 },
            opacity: { value: 0.5 },
            color: { value: "#ffffff" },
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
    </div>
  );
};

export default LandingPage;
