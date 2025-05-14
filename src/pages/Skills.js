import React from 'react';
import './Skills.css';
import { Parallax } from 'react-scroll-parallax'; // ADDED

const Skills = () => {
  const skills = [
    'JavaScript',
    'React',
    'Node.js',
    'CSS',
    'HTML',
    'Git',
    'Problem Solving',
    'Team Collaboration'
  ];

  return (
    <section id="skills">
      <Parallax speed={-5}> {/* ADDED Parallax for header */}
        <h2 className="section-header glitch" data-text="Skills">Skills</h2>
      </Parallax>
      <Parallax speed={10} className="skills-list-parallax-wrapper"> {/* ADDED Parallax for list */}
        <ul className="skills-list">
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </Parallax>
    </section>
  );
};

export default Skills;
