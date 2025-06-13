import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AboutMe from '../AboutMe';

// Mock react-scroll-parallax
jest.mock('react-scroll-parallax', () => ({
  Parallax: ({ children }) => <div>{children}</div>,
}));

// Mock HighlightedText component
jest.mock('../../components/HighlightedText', () => {
  return function HighlightedText({ children, effect }) {
    return <span className={`highlight-${effect}`}>{children}</span>;
  };
});

describe('AboutMe Component', () => {
  test('renders section heading', () => {
    render(<AboutMe />);
    
    expect(screen.getByRole('heading', { name: /about me/i })).toBeInTheDocument();
  });

  test('renders personal introduction text', () => {
    render(<AboutMe />);
    
    expect(screen.getByText(/hi, i'm kevin rahimi/i)).toBeInTheDocument();
    expect(screen.getByText(/versatile developer/i)).toBeInTheDocument();
    expect(screen.getByText(/let's build something great together/i)).toBeInTheDocument();
  });

  test('displays profile image with correct attributes', () => {
    render(<AboutMe />);
    
    const image = screen.getByRole('img', { name: /kev r/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', 'Kev R');
    expect(image).toHaveClass('about-me-image');
  });

  test('renders highlighted text components', () => {
    render(<AboutMe />);
    
    const highlightedElements = document.querySelectorAll('[class*="highlight-"]');
    expect(highlightedElements.length).toBeGreaterThan(0);
  });

  test('has proper semantic structure', () => {
    render(<AboutMe />);
    
    const section = document.querySelector('#about-me');
    expect(section).toBeInTheDocument();
    expect(section.tagName).toBe('SECTION');
  });

  test('contains key skills and experience mentions', () => {
    render(<AboutMe />);
    
    expect(screen.getByText(/python automation bots/i)).toBeInTheDocument();
    expect(screen.getByText(/react native/i)).toBeInTheDocument();
    expect(screen.getByText(/django/i)).toBeInTheDocument();
    expect(screen.getByText(/computer science degree/i)).toBeInTheDocument();
  });

  test('responsive design elements are present', () => {
    const { container } = render(<AboutMe />);
    
    const contentWrapper = container.querySelector('.about-me-content-wrapper');
    const textSection = container.querySelector('.about-me-text');
    const visualSection = container.querySelector('.about-me-visual');
    
    expect(contentWrapper).toBeInTheDocument();
    expect(textSection).toBeInTheDocument();
    expect(visualSection).toBeInTheDocument();
  });
});
