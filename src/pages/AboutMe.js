import React from 'react';
import './AboutMe.css';
import meJpg from '../assets/me.jpg';
import { Parallax } from 'react-scroll-parallax';
import HighlightedText from '../components/HighlightedText';

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
              <HighlightedText effect="neon">Hi, I'm Kevin Rahimi</HighlightedText> — a versatile developer who writes Python automation bots, chatbots, and music players with metadata editing capabilities. I also build AI-powered mobile apps with React Native and develop backend systems with Python Django and Java.
            </p>
            <p>
              Whether it's streamlining workflows, enhancing user experience, or creating intelligent features, I enjoy turning complex challenges into intuitive, real-world solutions. With a first-class Computer Science degree behind me and experience in consulting and technical documentation, I've developed strong communication skills and a collaborative approach to problem-solving.
            </p>
            <p>
              I'm always learning, always building, and looking for meaningful projects where I can make an impact — especially in areas like digital transformation, fitness, or automation.
            </p>
            <p>
              <HighlightedText effect="cyber">Let's build something great together.</HighlightedText>
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
