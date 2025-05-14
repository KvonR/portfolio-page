import React from 'react';
import './AboutMe.css';
import meJpg from '../assets/me.jpg';
import { Parallax } from 'react-scroll-parallax';

const AboutMe = () => {
  return (
    <section id="about-me">
      <Parallax speed={-5}>
        <h2 className="section-header glitch" data-text="About Me">About Me</h2>
      </Parallax>
      <div className="about-me-content-wrapper">
        <Parallax speed={5} className="about-me-text-parallax-wrapper">
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
        </Parallax>
        <Parallax speed={-10} className="about-me-visual-parallax-wrapper">
          <div className="about-me-visual">
            <img src={meJpg} alt="Kev R" className="about-me-image" />
          </div>
        </Parallax>
      </div>
    </section>
  );
};

export default AboutMe;
