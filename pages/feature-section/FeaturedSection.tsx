"use client";

import React from "react";
import Image from "next/image";
import styles from "./FeaturedSection.module.css";
import { destinations } from "../data/data";

const FeaturedSection = () => {
  return (
    <section className={styles.featuredSection}>
      <h2 className={styles.sectionTitle}>Explore Our Top Picks</h2>
      {destinations.map((destination, index) => {
        const isEven = index % 2 === 0;
        return (
          <div
            key={index}
            className={`${styles.featureItem} ${
              isEven ? styles.even : styles.odd
            }`}
          >
            <div className={styles.featureImageContainer}>
              <Image
                className={styles.featureImage}
                src={destination.image}
                alt={destination.name}
                width={600}
                height={400}
                priority={index === 0} 
              />
            </div>
            <div className={styles.featureDescription}>
              <h2>{destination.name}</h2>
              <p>{destination.description}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default FeaturedSection;
