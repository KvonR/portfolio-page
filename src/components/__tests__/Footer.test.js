import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../Footer';

// Mock scroll utility
jest.mock('../../utils/scrollUtils', () => ({
  handleSmoothScroll: jest.fn(),
}));

describe('Footer Component', () => {
  test('renders all navigation links', () => {
    render(<Footer />);
    
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Experience' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Projects' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Skills' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About Me' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();
  });

  test('navigation links have correct href attributes', () => {
    render(<Footer />);
    
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '#home');
    expect(screen.getByRole('link', { name: 'Experience' })).toHaveAttribute('href', '#experience');
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '#projects');
    expect(screen.getByRole('link', { name: 'Skills' })).toHaveAttribute('href', '#skills');
    expect(screen.getByRole('link', { name: 'About Me' })).toHaveAttribute('href', '#about-me');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact');
  });

  test('renders social media links', () => {
    render(<Footer />);
    
    const githubLink = screen.getByRole('link', { name: /github/i });
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    const emailLink = screen.getByRole('link', { name: /email/i });
    
    expect(githubLink).toBeInTheDocument();
    expect(linkedinLink).toBeInTheDocument();
    expect(emailLink).toBeInTheDocument();
  });

  test('social media links have correct URLs and security attributes', () => {
    render(<Footer />);
    
    const githubLink = screen.getByRole('link', { name: /github/i });
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    const emailLink = screen.getByRole('link', { name: /email/i });
    
    // Check URLs
    expect(githubLink).toHaveAttribute('href', 'https://github.com/kvonr');
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/rkev/');
    expect(emailLink).toHaveAttribute('href', 'mailto:kevinrahimi75@gmail.com');
    
    // Check security attributes for external links
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(emailLink).toHaveAttribute('target', '_blank');
    expect(emailLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('renders copyright notice', () => {
    render(<Footer />);
    
    expect(screen.getByText(/© 2025 kev r\. all rights reserved\./i)).toBeInTheDocument();
  });

  test('has proper semantic structure', () => {
    render(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer.tagName).toBe('FOOTER');
  });

  test('footer links use smooth scroll handler', async () => {
    const { handleSmoothScroll } = require('../../utils/scrollUtils');
    const user = userEvent.setup();
    
    render(<Footer />);
    
    const homeLink = screen.getByRole('link', { name: 'Home' });
    await user.click(homeLink);
    
    expect(handleSmoothScroll).toHaveBeenCalled();
  });

  test('contains proper link structure', () => {
    const { container } = render(<Footer />);
    
    const footerLinks = container.querySelector('.footer-links');
    const socialLinks = container.querySelector('.social-links');
    
    expect(footerLinks).toBeInTheDocument();
    expect(socialLinks).toBeInTheDocument();
    
    const navigationItems = footerLinks.querySelectorAll('li');
    expect(navigationItems.length).toBe(6);
  });

  test('social icons are properly rendered', () => {
    const { container } = render(<Footer />);
    
    const footerIcons = container.querySelectorAll('.footer-icon');
    expect(footerIcons.length).toBe(3); // GitHub, LinkedIn, Email
  });
});
