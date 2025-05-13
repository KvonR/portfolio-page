import React from 'react';
import './AboutMe.css';
import meJpg from '../assets/me.jpg';

const AboutMe = () => {
  return (
    <section id="about-me">
      <h2 className="section-header">About Me</h2>
      <div className="about-me-content-wrapper">
        <div className="about-me-text">
          <p>
            Hi, I'm Kevin Rahimi — a passionate and versatile developer with a first-class BSc in Computer Science from the University of Liverpool. I thrive on solving problems through clean, efficient code and have experience across a range of technologies, from Java and Spring Boot to Python, Laravel, and React Native.
          </p>
          <p>
            Whether it's building eCommerce platforms with Magento, creating AI-powered mobile apps, or automating workflows with Python, I enjoy turning complex challenges into intuitive, real-world solutions. My background also includes experience in consulting and technical documentation, giving me strong communication skills and a collaborative mindset.
          </p>
          <p>
            I’m always learning, always building, and always looking for meaningful projects where I can make an impact — especially in tech-driven spaces like digital transformation, fitness, or automation.
          </p>
          <p>
            Let’s build something great together.
          </p>
        </div>
        <div className="about-me-visual">
          <img src={meJpg} alt="Kev R" className="about-me-image" />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
