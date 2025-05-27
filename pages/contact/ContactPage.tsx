"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div style={styles.contactUs}>
      <div style={styles.contactContainer}>
        <div style={styles.contactForm}>
          <h1 style={styles.heading}>Contact Us</h1>
          <p style={styles.paragraph}>
            "Planning your next adventure? Whether you have questions about
            trail conditions, guided hikes, or want to join our hiking
            community, we're here to help you take the next step on your
            journey."
          </p>

          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                required
                style={{ ...styles.input, resize: "none" }}
              />
            </div>

            <button type="submit" style={styles.sendButton}>
              SUBMIT
            </button>
          </form>
        </div>

        <div style={styles.imageContainer}>
          <Image
            src="/logo.jpg"
            alt="Contact us"
            fill
            style={{ objectFit: "cover", position: "absolute" }}
          />
          <div style={styles.yellowAccent} />
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  contactUs: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f1f1f1",
  },
  contactContainer: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "1400px",
    margin: "40px auto",
    background: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
    overflow: "hidden",
    width: "100%",
    flexWrap: "wrap",
  },
  contactForm: {
    width: "40%",
    minWidth: "350px",
    padding: "40px",
    boxSizing: "border-box",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "10px",
    color: "#222",
  },
  paragraph: {
    color: "#666",
    marginBottom: "30px",
  },
  formGroup: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px 0",
    border: "none",
    borderBottom: "1px solid #ddd",
    fontSize: "1rem",
    outline: "none",
  },
  sendButton: {
    width: "100%",
    padding: "15px",
    background: "#222",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "20px",
  },
  imageContainer: {
    flex: 1,
    position: "relative",
    minHeight: "600px",
  },
  yellowAccent: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "120px",
    height: "120px",
    background: "#FFD700",
    zIndex: 1,
  },
};

export default ContactPage;
