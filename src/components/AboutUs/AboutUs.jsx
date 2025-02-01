import React from "react";
import "./AboutUs.css";
import hikingImage from "../assets/aboutus.jpg"; // Update with your relevant image

const AboutUs = () => {
  return (
    <div className="about-us-container">
      {/* Header Section */}
      <section className="header-section">
        <div className="header-overlay">
          <h1 className="header-title">Our Mission</h1>
          <p className="header-description">
            Inspiring the world to step into nature, discover breathtaking trails, and preserve the pristine landscapes we cherish for future generations.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="content-section">
        <div className="section-title">
          <h2>Who We Are</h2>
        </div>
        <div className="section-text">
          <p>
            We are a passionate collective of hikers and nature lovers who believe in the transformative power of outdoor adventures. Our journey started as a small group of friends exploring the world’s most beautiful trails, and has since evolved into a global community, uniting adventurers from all corners of the world.
          </p>
          <p>
            Whether you’re looking for a serene escape into the wilderness or a challenging trek that tests your endurance, our platform connects you with trails that suit every skill level. We're committed to bringing the world’s most stunning hikes to your fingertips, with detailed insights and authentic recommendations.
          </p>
        </div>

        <div className="section-title">
          <h2>Our Mission</h2>
        </div>
        <div className="section-text">
          <p>
            Our mission is simple: to help people explore nature and discover the beauty of the outdoors through hiking. We’re dedicated to providing detailed trail information while promoting a sustainable, eco-conscious approach to outdoor exploration.
          </p>
          <p>
            As stewards of nature, we encourage everyone to respect and protect the environment. Our goal is to uncover hidden gems in the natural world, share them with fellow adventurers, and inspire a deep appreciation for the landscapes that make our planet so special.
          </p>
          <p>
            Hiking is not just about reaching the destination, it’s about embracing the journey. By exploring the untouched corners of the earth, we hope to inspire future generations to respect, protect, and enjoy the great outdoors.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
    