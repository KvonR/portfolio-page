import React from 'react';
import { render, screen } from '@testing-library/react';
import Experience from '../Experience';

// Mock react-scroll-parallax
jest.mock('react-scroll-parallax', () => ({
  Parallax: ({ children }) => <div>{children}</div>,
}));

// Mock useMobileDetection hook
jest.mock('../../hooks/useMobileDetection', () => {
  return jest.fn(() => false); // Default to desktop
});

describe('Experience Component', () => {
  test('renders section heading', () => {
    render(<Experience />);
    
    expect(screen.getByRole('heading', { name: /my experience/i })).toBeInTheDocument();
  });

  test('renders current freelance position', () => {
    render(<Experience />);
    
    expect(screen.getByText('Freelance Software Engineer/Technical Consultant')).toBeInTheDocument();
    expect(screen.getByText(/WebTicketManager/)).toBeInTheDocument();
    expect(screen.getByText(/feb 2024 - present/i)).toBeInTheDocument();
    expect(screen.getByText(/cheshire east, england/i)).toBeInTheDocument();
  });

  test('renders previous role at Haze Cards', () => {
    render(<Experience />);
    
    expect(screen.getByText('Software Developer')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 4, name: /haze cards.*oct 2022 - jan 2023/i })).toBeInTheDocument();
    expect(screen.getByText(/oct 2022 - jan 2023/i)).toBeInTheDocument();
    expect(screen.getByText(/manchester area/i)).toBeInTheDocument();
  });

  test('displays job descriptions and achievements', () => {
    render(<Experience />);
    
    // Check for key content from job descriptions
    expect(screen.getByText(/worked on projects every few months using php/i)).toBeInTheDocument();
    expect(screen.getByText(/worked with react, js, html, css and shopify/i)).toBeInTheDocument();
    expect(screen.getByText(/dragon.s den/i)).toBeInTheDocument();
  });

  test('renders skills for each position', () => {
    render(<Experience />);
    
    // Check that skills sections are present
    const skillsLabels = screen.getAllByText(/skills:/i);
    expect(skillsLabels.length).toBe(2); // Two positions with skills
    
    // Check for specific skills using getAllByText to handle multiple occurrences
    expect(screen.getAllByText(/php/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/sql/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/react/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/shopify/i).length).toBeGreaterThan(0);
  });

  test('has proper semantic structure', () => {
    render(<Experience />);
    
    const section = document.querySelector('#experience');
    expect(section).toBeInTheDocument();
    expect(section.tagName).toBe('SECTION');
    
    // Check for proper heading hierarchy
    const mainHeading = screen.getByRole('heading', { level: 2 });
    const jobTitles = screen.getAllByRole('heading', { level: 3 });
    
    expect(mainHeading).toBeInTheDocument();
    expect(jobTitles.length).toBe(2); // Two job positions
  });

  test('renders experience items in correct structure', () => {
    const { container } = render(<Experience />);
    
    const experienceList = container.querySelector('.experience-list');
    const experienceItems = container.querySelectorAll('.experience-item');
    
    expect(experienceList).toBeInTheDocument();
    expect(experienceItems.length).toBe(2); // Two experience items
  });

  test('displays dates and locations properly', () => {
    render(<Experience />);
    
    // Check date formatting
    expect(screen.getByText(/feb 2024 - present/i)).toBeInTheDocument();
    expect(screen.getByText(/oct 2022 - jan 2023/i)).toBeInTheDocument();
    
    // Check location information
    expect(screen.getByText(/remote/i)).toBeInTheDocument();
    expect(screen.getByText(/hybrid/i)).toBeInTheDocument();
  });

  test('mobile detection affects rendering', () => {
    const useMobileDetection = require('../../hooks/useMobileDetection');
    useMobileDetection.mockReturnValue(true);
    
    render(<Experience />);
    
    // Component should still render properly on mobile
    expect(screen.getByRole('heading', { name: /my experience/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 4, name: /webticketmanager.*feb 2024 - present/i })).toBeInTheDocument();
  });

  test('contains diverse technology experience', () => {
    render(<Experience />);
    
    // Backend technologies
    expect(screen.getAllByText(/php/i)).toHaveLength(2); // Should appear in description and skills
    expect(screen.getAllByText(/sql/i)).toHaveLength(2); // Should appear in description and skills
    
    // Frontend technologies
    expect(screen.getAllByText(/react/i)).toHaveLength(2); // Should appear in description and skills
    expect(screen.getAllByText(/html/i)).toHaveLength(2); // Should appear in description and skills
    expect(screen.getAllByText(/css/i)).toHaveLength(2); // Should appear in description and skills
    
    // Platform experience
    expect(screen.getAllByText(/shopify/i)).toHaveLength(2); // Should appear in description and skills
  });
});
