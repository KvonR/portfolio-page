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
              <span className="glitch-text" data-text="Hi, I'm Kevin Rahimi">Hi, I'm Kevin Rahimi</span> — a <span className="cyberpunk-text">digital architect</span> crafting Python automation bots, interactive chatbots, and music players with advanced metadata manipulation. I engineer AI-powered mobile interfaces with React Native and build robust backend systems using Python Django and Java.
            </p>
            <p>
              Whether I'm <span className="neon-text">optimizing digital workflows</span>, enhancing user experiences, or developing intelligent systems, I transform complex technical challenges into elegant, functional solutions. With a first-class Computer Science degree powering my toolkit and experience in consulting and technical documentation, I've developed a talent for translating between human needs and machine logic.
            </p>
            <p>
              I operate at the intersection of creativity and code—always learning, always building, and searching for meaningful projects where I can make an impact. My focus areas include <span className="neon-text">digital transformation</span>, fitness tech, and automation systems.
            </p>
            <p className="tagline">
              <span className="glitch-text" data-text="Let's build something extraordinary together">Let's build something extraordinary together</span>
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
