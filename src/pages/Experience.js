import React from 'react';
import './Experience.css';
import { Parallax } from 'react-scroll-parallax';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: 'Freelance Software Engineer/Technical Consultant',
      company: 'WebTicketManager',
      date: 'Feb 2024 - Present',
      location: 'Cheshire East, England, United Kingdom · Remote',
      description: 'Worked on projects every few months using PHP, ensuring top notch code quality and operational efficiency while collaborating with a team of expert developers. Worked on databases with SQL. Worked as a consultant working along side stakeholders to create CMS projects from scratch.',
      skills: ['PHP', 'SQL', 'CMS Development', 'Stakeholder Management', 'Code Quality', 'Operational Efficiency']
    },
    {
      id: 2,
      title: 'Software Developer',
      company: 'Haze Cards',
      date: 'Oct 2022 - Jan 2023',
      location: 'Manchester Area, United Kingdom · Hybrid',
      description: 'Worked with React, JS, HTML, CSS and Shopify for Haze Cards, a friend’s startup, creating an eCommerce site that sold high end business cards while contributing to high-end UI and UX experiences. This startup appeared on Dragon’s Den.',
      skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Shopify', 'eCommerce', 'UI/UX']
    },
    // Add more experiences here
  ];

  return (
    <section id="experience">
      <Parallax speed={-5}>
        <h2 className="section-header glitch" data-text="My Experience">My Experience</h2>
      </Parallax>
      <Parallax speed={10} className="experience-list-parallax-wrapper">
        <div className="experience-list">
          {experiences.map(exp => (
            <div key={exp.id} className="experience-item">
              <h3 className="glitch" data-text={exp.title}>{exp.title}</h3>
              <h4>{exp.company} | {exp.date}</h4>
              <p className="experience-location">{exp.location}</p>
              <p>{exp.description}</p>
              {exp.skills && exp.skills.length > 0 && (
                <div className="experience-skills">
                  <strong>Skills:</strong> {exp.skills.join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      </Parallax>
    </section>
  );
};

export default Experience;
