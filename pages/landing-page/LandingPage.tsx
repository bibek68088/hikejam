import React, { useState, useEffect } from "react";

const LandingPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmallMobile(window.innerWidth <= 480);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const keyframes = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes glow {
      0% { box-shadow: 0 0 10px rgba(255, 87, 51, 0.5); }
      50% { box-shadow: 0 0 20px rgba(255, 87, 51, 0.8); }
      100% { box-shadow: 0 0 10px rgba(255, 87, 51, 0.5); }
    }

    @keyframes scrollBounce {
      0% { transform: translateY(0); }
      50% { transform: translateY(10px); }
      100% { transform: translateY(0); }
    }
  `;

  // Styles
  const landingPageStyle = {
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative" as const,
    overflow: "hidden",
  };

  const backgroundVideoStyle = {
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    objectFit: "cover" as const,
    zIndex: -1,
  };

  const heroOverlayStyle = {
    position: "relative" as const,
    zIndex: 2,
    padding: "3rem",
    textAlign: "center" as const,
    color: "white",
  };

  const h1Style = {
    fontSize: isSmallMobile ? "2rem" : isMobile ? "2.5rem" : "3.5rem",
    fontWeight: "bold",
    marginBottom: "15px",
    opacity: 0,
    animation: "slideIn 1s ease-in-out forwards 0.5s",
    textShadow: "2px 2px 6px rgba(0, 0, 0, 0.7)",
    margin: "0 0 15px 0",
  };

  const pStyle = {
    fontSize: isSmallMobile ? "1rem" : isMobile ? "1.2rem" : "1.4rem",
    marginBottom: "20px",
    opacity: 0,
    animation: "fadeIn 1s ease-in-out forwards 0.8s",
    textShadow: "1px 1px 5px rgba(0, 0, 0, 0.7)",
    margin: "0 0 20px 0",
  };

  const ctaButtonStyle = {
    background: "linear-gradient(45deg, #ff5733, #ff7849)",
    color: "white",
    padding: isSmallMobile ? "10px 20px" : isMobile ? "12px 24px" : "14px 28px",
    fontSize: isSmallMobile ? "1rem" : isMobile ? "1.1rem" : "1.3rem",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    position: "relative" as const,
    overflow: "hidden",
    animation: "glow 2s infinite",
  };

  const scrollIndicatorStyle = {
    position: "absolute" as const,
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "30px",
    height: "50px",
    border: "2px solid white",
    borderRadius: "25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
  };

  const scrollIndicatorBeforeStyle = {
    width: "10px",
    height: "10px",
    background: "white",
    borderRadius: "50%",
    animation: "scrollBounce 1.5s infinite",
  };

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = "scale(1.1)";
    e.currentTarget.style.boxShadow = "0 10px 20px rgba(255, 87, 51, 0.5)";
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "0 0 10px rgba(255, 87, 51, 0.5)";
  };

  return (
    <>
      <style jsx>{keyframes}</style>

      <div style={landingPageStyle}>
        <video autoPlay muted loop playsInline style={backgroundVideoStyle}>
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div style={heroOverlayStyle}>
          <h1 style={h1Style}>🌍 Embark on Your Next Adventure</h1>
          <p style={pStyle}>Where the journey begins, and memories are made.</p>
          <button
            style={ctaButtonStyle}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
          >
            Let's Explore
          </button>
        </div>

        <div style={scrollIndicatorStyle}>
          <div style={scrollIndicatorBeforeStyle}></div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
