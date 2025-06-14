import React from 'react';
import './Projects.css';
import retrosonicImage from '../assets/retrosonic.png';
import roboticsImage from '../assets/Robotics.png';
import trainAInImage from '../assets/TrainAIn.png';
import { Parallax } from 'react-scroll-parallax';

const Projects = () => {
  
  const projectList = [
    {
      title: 'TrainAIn',
      description: 'An AI-powered fitness analyzer built in React Native using GPT Vision. Provides real-time feedback, posture guidance, and personalized workout suggestions through body photo analysis, demonstrating mobile development and AI integration expertise.',
      imageUrl: trainAInImage,
      link: 'https://github.com/kvonr/trainain',
      comingSoon: true
    },
    {
      title: 'Retrosonic',
      description: 'A sleek JavaFX music player built from scratch with advanced playlist management, real-time audio visualizations, and metadata editing. Focused on usability and performance, demonstrating expertise in Java and desktop application development.',
      imageUrl: retrosonicImage,
      link: 'https://github.com/kvonr/retrosonic'
    },
    {
      title: 'Robotics Algorithm',
      description: 'A Java robotics simulation implementing Bug 1 and Bug 2 pathfinding algorithms. Models a 2D environment where robots navigate toward goals while avoiding obstacles using minimal sensory input, demonstrating autonomous navigation and algorithm design.',
      imageUrl: roboticsImage,
      link: 'https://github.com/KvonR/Bug1-2-Algorithm'
    }
  ];

  return (
    <section id="projects">
      <Parallax speed={-5}>
        <h2 className="section-header glitch" data-text="My Projects">My Projects</h2>
      </Parallax>
      <Parallax speed={10} className="project-list-parallax-wrapper">
        <div className="project-list">
          {projectList.map((project, index) => (
            <div key={index} className="project-item">
              <img src={project.imageUrl} alt={project.title} className="project-image" />
              <h3 className="project-title glitch" data-text={project.title}>{project.title}</h3>
              <p>{project.description}</p>
              {project.comingSoon ? (
                <span className="btn-coming-soon">Coming Soon</span>
              ) : (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-view-project">View Project</a>
              )}
            </div>
          ))}
        </div>
      </Parallax>
    </section>
  );
};

export default Projects;
