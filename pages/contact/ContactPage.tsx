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
    <div className="contactUs">
      <div className="contactContainer">
        <div className="contactForm">
          <h1 className="heading">Contact Us</h1>
          <p className="paragraph">
            "Planning your next adventure? Whether you have questions about
            trail conditions, guided hikes, or want to join our hiking
            community, we're here to help you take the next step on your
            journey."
          </p>

          <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input"
              />
            </div>

            <div className="formGroup">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input"
              />
            </div>

            <div className="formGroup">
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="input"
              />
            </div>

            <div className="formGroup">
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                required
                className="input"
                style={{ resize: "none" }}
              />
            </div>

            <button type="submit" className="sendButton">
              SUBMIT
            </button>
          </form>
        </div>

        <div className="imageContainer">
          <Image
            src="/logo.jpg"
            alt="Contact us"
            fill
            style={{
              objectFit: "cover",
              position: "absolute",
              zIndex: 0,
              opacity: 0.2,
            }}
          />
          <div className="yellowAccent" />
        </div>
      </div>

      {/* Responsive CSS */}
      <style jsx>{`
        .contactUs {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f1f1f1;
          padding: 20px;
        }

        .contactContainer {
          display: flex;
          flex-direction: row;
          max-width: 1400px;
          width: 100%;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          overflow: hidden;
          position: relative;
          flex-wrap: wrap;
        }

        .contactForm {
          width: 40%;
          min-width: 350px;
          padding: 40px;
          box-sizing: border-box;
          position: relative;
          z-index: 1;
          background-color: white;
        }

        .heading {
          font-size: 2.5rem;
          margin-bottom: 10px;
          color: #222;
        }

        .paragraph {
          color: #666;
          margin-bottom: 30px;
        }

        .formGroup {
          margin-bottom: 20px;
        }

        .input {
          width: 100%;
          padding: 12px 0;
          border: none;
          border-bottom: 1px solid #ddd;
          font-size: 1rem;
          outline: none;
          background-color: transparent;
        }

        .sendButton {
          width: 100%;
          padding: 15px;
          background: #222;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          margin-top: 20px;
        }

        .imageContainer {
          flex: 1;
          position: relative;
          min-height: 600px;
        }

        .yellowAccent {
          position: absolute;
          top: 0;
          right: 0;
          width: 120px;
          height: 120px;
          background: #ffd700;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .contactContainer {
            flex-direction: column;
          }

          .contactForm {
            width: 100%;
            background-color: rgba(255, 255, 255, 0.95);
            position: relative;
            z-index: 2;
          }

          .imageContainer {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            z-index: 0;
          }

          .yellowAccent {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
