import React from 'react';
import './Projects.css';
import retrosonicImage from '../assets/retrosonic.png';
import roboticsImage from '../assets/Robotics.png';

const Projects = () => {
  const projectList = [
    {
      title: 'Retrosonic',
      description: 'A JavaFX music player I built with advanced playlist management and audio visualization.',
      imageUrl: retrosonicImage,
      link: 'https://github.com/kvonr/retrosonic'
    },
    {
      title: 'Robotics Algorithm',
      description: 'A wall-following algorithm for a robotic floor hoover, designed for efficient cleaning.',
      imageUrl: roboticsImage,
      link: 'https://github.com/kvonr/robotics-algorithm'
    }
  ];

  return (
    <section id="projects">
      <h2>Projects</h2>
      <div className="project-list">
        {projectList.map((project, index) => (
          <div key={index} className="project-item">
            <img src={project.imageUrl} alt={project.title} className="project-image" />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-view-project">View Project</a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
