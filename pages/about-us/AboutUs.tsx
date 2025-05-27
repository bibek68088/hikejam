"use client";

import { useEffect, useState, CSSProperties } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import hikingImage from "../../public/aboutus.jpg";
import teamImage from "../../public/team_image.jpg";
import missionImage from "../../public/mission.jpg";

const AboutUs = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmallScreen(window.innerWidth <= 480);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Inline styles
  const aboutUsContainerStyle: CSSProperties = {
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "white",
    color: "#333",
  };

  const heroSectionStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    height: "75vh",
    justifyContent: "center",
    alignItems: "center",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundImage: `url(${hikingImage.src})`,
    position: "relative",
    textAlign: "center",
  };

  const heroOverlayStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.2)",
    zIndex: 1,
  };

  const heroTitleStyle: CSSProperties = {
    position: "relative",
    zIndex: 10,
    color: "white",
    maxWidth: "80%",
    textAlign: "center",
    fontSize: isSmallScreen ? "2rem" : isMobile ? "2.5rem" : "3rem",
    marginBottom: 10,
    fontWeight: "bold",
  };

  const heroSubtitleStyle: CSSProperties = {
    position: "relative",
    zIndex: 10,
    color: "white",
    maxWidth: "80%",
    textAlign: "center",
    fontSize: isSmallScreen ? "1rem" : isMobile ? "1.2rem" : "1.5rem",
    marginTop: 0,
  };

  const sectionContainerStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "40px auto",
    maxWidth: 1200,
    padding: isMobile ? 20 : 30,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: 10,
    flexDirection: isMobile ? ("column" as const) : ("row" as const),
    textAlign: isMobile ? ("center" as const) : undefined,
  };

  const textContentStyle: CSSProperties = {
    maxWidth: isMobile ? "100%" : "50%",
    padding: 20,
    boxSizing: "border-box",
  };

  const headingStyle: CSSProperties = {
    fontSize: isMobile ? "2rem" : "3rem",
    marginBottom: 20,
    fontWeight: "bold",
  };

  const paragraphStyle: CSSProperties = {
    fontSize: "1rem",
    lineHeight: 1.6,
    marginBottom: 16,
  };

  const imageStyle: CSSProperties = {
    maxWidth: isMobile ? "100%" : "45%",
    borderRadius: 10,
    width: "100%",
    marginBottom: isMobile ? 20 : 0,
  };

  const ctaSectionStyle: CSSProperties = {
    textAlign: "center",
    margin: "40px 0",
    backgroundColor: "#f7f7f7",
    padding: 50,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: 10,
  };

  const ctaButtonStyle: CSSProperties = {
    padding: isSmallScreen ? "8px 15px" : isMobile ? "10px 18px" : "12px 24px",
    fontSize: isSmallScreen ? "0.9rem" : isMobile ? "1rem" : "1.2rem",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  };

  return (
    <div style={aboutUsContainerStyle}>
      <section style={heroSectionStyle}>
        <div style={heroOverlayStyle} />
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={heroTitleStyle}
        >
          Discover. Connect. Protect.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          style={heroSubtitleStyle}
        >
          Embark on breathtaking journeys and preserve nature for future
          explorers.
        </motion.p>
      </section>

      <section style={sectionContainerStyle}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          style={imageStyle}
        >
          <Image
            src={teamImage}
            alt="Our Team"
            style={{ borderRadius: 10 }}
            width={540}
            height={400}
          />
        </motion.div>
        <div style={textContentStyle}>
          <h2 style={headingStyle}>Who We Are</h2>
          <p style={paragraphStyle}>
            We are a dedicated community of outdoor enthusiasts who initially
            embraced hiking as a form of entertainment but soon found ourselves
            deeply immersed in the experience...
          </p>
          <p style={paragraphStyle}>
            Whether you're seeking tranquility in serene landscapes or
            challenges that push your limits...
          </p>
        </div>
      </section>

      <section
        style={{
          ...sectionContainerStyle,
          flexDirection: isMobile ? "column" : "row-reverse",
        }}
      >
        <div style={textContentStyle}>
          <h2 style={headingStyle}>Our Mission</h2>
          <p style={paragraphStyle}>
            Our mission is clear and purposeful: to inspire individuals to
            explore the wonders of nature while ensuring its preservation for
            future generations...
          </p>
          <p style={paragraphStyle}>
            We encourage adherence to the principles of "Leave No Trace" and
            foster a culture of conservation...
          </p>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          style={imageStyle}
        >
          <Image
            src={missionImage}
            alt="Mission"
            style={{ borderRadius: 10 }}
            width={540}
            height={400}
          />
        </motion.div>
      </section>

      <section style={ctaSectionStyle}>
        <h2 style={headingStyle}>Join Our Adventure</h2>
        <p style={{ ...paragraphStyle, marginBottom: 24 }}>
          Be part of a growing community of nature lovers and hikers! Share your
          adventures, explore others' journeys, and subscribe for exclusive
          trail guides and updates.
        </p>
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#0056b3" }}
          transition={{ duration: 0.2 }}
          style={ctaButtonStyle}
        >
          Join Us
        </motion.button>
      </section>
    </div>
  );
};

export default AboutUs;
