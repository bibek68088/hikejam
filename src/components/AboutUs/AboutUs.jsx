import React, { useEffect } from "react";
import "./AboutUs.css";
import hikingImage from "../assets/aboutus.jpg"; // Background Image
import teamImage from "../assets/team_image.jpg"; // Team Image
import missionImage from "../assets/mission.jpg"; // Mission Image
import { motion } from "framer-motion"; // For smooth animations

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-us-container">
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${hikingImage})` }}
      >
        <motion.h1
  initial={{ opacity: 0, y: -40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.2, ease: "easeOut" }} // Longer duration for smoother fade
  className="hero-title"
>
  Discover. Connect. Protect.
</motion.h1>

<motion.p
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }} // Delayed for a more coordinated fade
  className="hero-subtitle"
>
  Embark on breathtaking journeys and preserve nature for future explorers.
</motion.p>

      </section>

      {/* Who We Are Section */}
      <section className="content-section">
        <motion.img
          src={teamImage}
          alt="Our Team"
          className="content-image"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <div className="text-content">
          <h2>Who We Are</h2>
          <p>
            We are a dedicated community of outdoor enthusiasts who initially embraced hiking as a form of entertainment but soon found ourselves deeply immersed in the experience. What began as a casual interest has now evolved into an integral part of our lives, shaping our values and perspectives. Through our shared love for exploring nature, we have connected with like-minded adventurers, creating a global movement that celebrates the beauty of the great outdoors.
          </p>
          <p>
            Whether you're seeking tranquility in the serene beauty of untouched landscapes or a challenge that pushes your physical and mental limits across rugged, demanding terrains, we are here to guide you to the best hiking trails the world has to offer. Our carefully curated selection features a diverse range of trails, from peaceful forest paths and coastal walks that offer solitude and reflection, to high-altitude routes and difficult mountain climbs designed for those who crave a test of endurance. Each trail we recommend is chosen not just for its beauty but also for the unique experience it offers, ensuring that every hike, whether leisurely or strenuous, is an adventure that caters to all levels of skill and ambition.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="mission-section">
        <div className="mission-text">
          <h2>Our Mission</h2>
          <p>
            Our mission is clear and purposeful: to inspire individuals to explore the wonders of nature while ensuring its preservation for future generations. We believe that experiencing the outdoors is not only a personal journey but also a responsibility. As such, we are committed to providing comprehensive trail insights, enabling our community to embark on informed, enriching hikes. At the same time, we actively advocate for eco-conscious hiking practices that minimize environmental impact, promote sustainability, and protect the natural landscapes we cherish.
          </p>
          <p>
            By fostering responsible hiking practices, we empower adventurers to minimize their environmental impact and contribute to the protection of natural landscapes. We encourage adherence to the principles of "Leave No Trace," urging hikers to stay on marked trails, respect wildlife, and properly dispose of waste. Our community is taught to reduce the use of single-use plastics, respect designated camping areas, and make conscious decisions that preserve the integrity of the environment. Through education and advocacy, we strive to instill a culture of conservation, where every adventurer plays a vital role in safeguarding our planet’s most treasured landscapes for future generations.
          </p>
        </div>
        <motion.img
          src={missionImage}
          alt="Mission"
          className="mission-image"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Join Our Adventure</h2>
        <p>
          Be part of a growing community of nature lovers and hikers! Share your adventures and explore others' journeys through our gallery, a space dedicated to showcasing breathtaking moments from the trails. Whether it's from your own hikes or photos shared by fellow adventurers, this gallery captures the spirit of exploration and the beauty of nature. Join us in building a visual collection that inspires, connects, and celebrates the outdoor experience. Plus, subscribe for exclusive trail guides, tips, and updates on our conservation efforts, all delivered straight to your inbox!
        </p>
        <motion.button
          className="cta-button"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          Join Us
        </motion.button>
      </section>
    </div>
  );
};

export default AboutUs;