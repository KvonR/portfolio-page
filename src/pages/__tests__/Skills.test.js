import React from 'react';
import { render, screen } from '@testing-library/react';
import Skills from '../Skills';

// Mock react-scroll-parallax
jest.mock('react-scroll-parallax', () => ({
  Parallax: ({ children }) => <div>{children}</div>,
}));

// Mock useMobileDetection hook
jest.mock('../../hooks/useMobileDetection', () => {
  return jest.fn(() => false); // Default to desktop
});

describe('Skills Component', () => {
  test('renders section heading', () => {
    render(<Skills />);
    
    expect(screen.getByRole('heading', { name: /my skills/i })).toBeInTheDocument();
  });

  test('renders all skill categories', () => {
    render(<Skills />);
    
    // Check for main skill categories
    expect(screen.getByText('Frontend Development')).toBeInTheDocument();
    expect(screen.getByText('Backend Development')).toBeInTheDocument();
    expect(screen.getByText('Database')).toBeInTheDocument();
    expect(screen.getByText('Development Tools')).toBeInTheDocument();
    expect(screen.getByText('Mobile Development')).toBeInTheDocument();
    expect(screen.getByText('Professional Skills')).toBeInTheDocument();
  });

  test('renders specific technical skills', () => {
    render(<Skills />);
    
    // Frontend skills
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('HTML5')).toBeInTheDocument();
    expect(screen.getByText('CSS3')).toBeInTheDocument();
    
    // Backend skills
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('PHP')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('Java')).toBeInTheDocument();
    
    // Database skills
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
    expect(screen.getByText('MySQL')).toBeInTheDocument();
    expect(screen.getByText('Firebase')).toBeInTheDocument();
  });

  test('has proper semantic structure', () => {
    render(<Skills />);
    
    const section = document.querySelector('#skills');
    expect(section).toBeInTheDocument();
    expect(section.tagName).toBe('SECTION');
    
    // Check for proper heading hierarchy
    const mainHeading = screen.getByRole('heading', { level: 2 });
    const categoryHeadings = screen.getAllByRole('heading', { level: 3 });
    
    expect(mainHeading).toBeInTheDocument();
    expect(categoryHeadings.length).toBe(6); // 6 skill categories
  });

  test('renders skills in list format', () => {
    const { container } = render(<Skills />);
    
    const skillLists = container.querySelectorAll('.skills-list');
    expect(skillLists.length).toBe(6); // One list per category
    
    const allSkillItems = container.querySelectorAll('.skills-list li');
    expect(allSkillItems.length).toBeGreaterThan(20); // Should have many skills
  });

  test('mobile detection affects rendering', () => {
    const useMobileDetection = require('../../hooks/useMobileDetection');
    useMobileDetection.mockReturnValue(true);
    
    render(<Skills />);
    
    // Component should still render properly on mobile
    expect(screen.getByRole('heading', { name: /my skills/i })).toBeInTheDocument();
    expect(screen.getByText('Frontend Development')).toBeInTheDocument();
  });

  test('contains professional and technical balance', () => {
    render(<Skills />);
    
    // Technical skills
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
    
    // Professional skills
    expect(screen.getByText('Problem Solving')).toBeInTheDocument();
    expect(screen.getByText('Team Collaboration')).toBeInTheDocument();
    expect(screen.getByText('Project Management')).toBeInTheDocument();
  });
});
