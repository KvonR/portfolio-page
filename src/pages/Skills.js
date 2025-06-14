import React from 'react';
import './Skills.css';
import { Parallax } from 'react-scroll-parallax'; // ADDED

const Skills = () => {
  
  const skillCategories = {
    'Frontend Development': [
      'React',
      'JavaScript',
      'HTML5',
      'CSS3',
      'UI/UX Design',
      'JavaFX'
    ],
    'Backend Development': [
      'Node.js',
      'PHP',
      'RESTful APIs',
      'Django',
      'Python',
      'Java'
    ],
    'Database Skills': [
      'PostgreSQL',
      'MySQL',
      'Firebase',
      'Database Design'
    ],
    'Development Tools': [
      'Git',
      'VS Code',
      'npm',
      'Webpack',
      'Docker'
    ],
    'Mobile Development': [
      'Swift',
      'React Native'
    ],
    'Professional Skills': [
      'Problem Solving',
      'Team Collaboration',
      'Project Management',
      'Agile Methodologies'
    ]
  };

  return (
    <section id="skills">
      <Parallax speed={-5}>
        <h2 className="section-header glitch" data-text="My Skills">My Skills</h2>
      </Parallax>
      <Parallax speed={10} className="skills-list-parallax-wrapper">
        <div className="skills-categories">
          {Object.entries(skillCategories).map(([category, skills]) => (
            <div key={category} className="skills-category">
              <h3 className="category-header">{category}</h3>
              <ul className="skills-list">
                {skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Parallax>
    </section>
  );
};

export default Skills;
