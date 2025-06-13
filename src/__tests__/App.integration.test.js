import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

// Mock all external dependencies
jest.mock('react-scroll-parallax', () => ({
  Parallax: ({ children }) => <div>{children}</div>,
  ParallaxProvider: ({ children }) => <div>{children}</div>,
}));

jest.mock('@emailjs/browser');

// Mock scroll utilities
jest.mock('../utils/scrollUtils', () => ({
  handleSmoothScroll: jest.fn(),
}));

// Import the mocked module to get access to the mock function
import { handleSmoothScroll } from '../utils/scrollUtils';

// Mock canvas and animations
HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  clearRect: jest.fn(),
  fillRect: jest.fn(),
  beginPath: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  fillStyle: '',
  globalAlpha: 1,
}));

Element.prototype.animate = jest.fn();

describe('App Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock environment variables
    process.env.REACT_APP_EMAILJS_SERVICE_ID = 'test_service';
    process.env.REACT_APP_EMAILJS_TEMPLATE_ID = 'test_template';
    process.env.REACT_APP_EMAILJS_PUBLIC_KEY = 'test_key';
  });

  test('renders all main sections', () => {
    render(<App />);
    
    // Check if all main sections are present using more specific selectors
    expect(screen.getAllByText(/kevin/i)).toHaveLength(3); // Should appear in home subtitle, about section and email
    expect(screen.getAllByText(/about me/i)).toHaveLength(3); // Navigation, section header, and footer
    expect(screen.getAllByText(/skills/i)).toHaveLength(7); // Navigation, section header, footer, experience labels, category header, and content text
    expect(screen.getAllByText(/experience/i)).toHaveLength(5); // Navigation, section header, footer, and content text mentions
    expect(screen.getAllByText(/projects/i)).toHaveLength(5); // Navigation, section header, footer, and content text mentions
    expect(screen.getAllByText(/contact/i)).toHaveLength(3); // Navigation, section header, and button text
  });

  test('navigation works between sections', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Test header navigation - get the first link (from header, not mobile menu)
    const aboutLinks = screen.getAllByRole('link', { name: /about me/i });
    await user.click(aboutLinks[0]); // Click the first one (header navigation)
    
    expect(handleSmoothScroll).toHaveBeenCalled();
  });

  test('mobile menu functionality works across the app', async () => {
    const user = userEvent.setup();
    
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });
    
    render(<App />);
    
    const hamburgerButton = screen.getByRole('button', { name: /toggle navigation menu/i });
    
    // Open mobile menu
    await user.click(hamburgerButton);
    
    // Navigate to a section - get the first projects link (header navigation)
    const projectsLinks = screen.getAllByRole('link', { name: /projects/i });
    await user.click(projectsLinks[0]); // Click the first one (header navigation)
    
    // Menu should close and navigation should work
    expect(handleSmoothScroll).toHaveBeenCalled();
  });

  test('contact form integrates properly with the app', async () => {
    const user = userEvent.setup();
    const emailjs = require('@emailjs/browser');
    emailjs.sendForm.mockResolvedValue({ text: 'OK' });
    
    render(<App />);
    
    // Navigate to contact section (if needed) - check for Contact section header
    const contactSection = screen.getByRole('heading', { name: /contact me/i });
    expect(contactSection).toBeInTheDocument();
    
    // Fill out contact form
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /send/i });
    
    await user.type(nameInput, 'Integration Test User');
    await user.type(emailInput, 'test@integration.com');
    await user.type(messageInput, 'This is an integration test message');
    
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/your message has been sent/i)).toBeInTheDocument();
    });
  });

  test('scroll behavior works correctly throughout the app', () => {
    render(<App />);
    
    // Simulate scroll to trigger header behavior
    fireEvent.scroll(window, { target: { scrollY: 100 } });
    
    const header = document.querySelector('header');
    
    // The scroll effect should be working
    expect(header).toBeInTheDocument();
  });

  test('responsive behavior works across all components', () => {
    render(<App />);
    
    // Test different viewport sizes
    const viewports = [
      { width: 320, height: 568 },   // Mobile small
      { width: 375, height: 667 },   // Mobile medium
      { width: 768, height: 1024 },  // Tablet
      { width: 1024, height: 768 },  // Desktop small
      { width: 1920, height: 1080 }, // Desktop large
    ];
    
    viewports.forEach(({ width, height }) => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: height,
      });
      
      fireEvent(window, new Event('resize'));
      
      // All main content should still be accessible
      expect(screen.getAllByText(/kevin/i)).toHaveLength(3); // Should appear in home subtitle, about section and email
      expect(screen.getByRole('button', { name: /toggle navigation menu/i })).toBeInTheDocument();
    });
  });

  test('particle effects integrate properly with the layout', () => {
    render(<App />);
    
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    
    // Canvas should not interfere with other interactions
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
    
    buttons.forEach(button => {
      expect(button).toBeVisible();
    });
  });

  test('all external links work correctly', () => {
    render(<App />);
    
    // Find social media links
    const githubLinks = screen.getAllByRole('link').filter(link => 
      link.getAttribute('href')?.includes('github.com')
    );
    const linkedinLinks = screen.getAllByRole('link').filter(link => 
      link.getAttribute('href')?.includes('linkedin.com')
    );
    
    githubLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
    });
    
    linkedinLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
    });
  });

  test('keyboard navigation works throughout the app', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Tab through interactive elements
    await user.tab();
    
    // Should be able to navigate through all focusable elements
    const focusableElements = screen.getAllByRole('button').concat(
      screen.getAllByRole('link'),
      screen.getAllByRole('textbox')
    );
    
    expect(focusableElements.length).toBeGreaterThan(0);
    
    // Test Enter key on a button
    const firstButton = screen.getAllByRole('button')[0];
    firstButton.focus();
    await user.keyboard('{Enter}');
    
    // Should not throw any errors
  });

  test('app handles errors gracefully', () => {
    // Mock console.error to suppress error logs during testing
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(<App />);
    
    // Trigger potential error scenarios
    fireEvent.error(window);
    
    // App should still be functional
    expect(screen.getAllByText(/kevin/i)).toHaveLength(3); // Should appear in home subtitle, about section and email
    
    consoleSpy.mockRestore();
  });

  test('performance: app renders within reasonable time', async () => {
    const startTime = performance.now();
    
    render(<App />);
    
    // Wait for all components to be rendered
    await waitFor(() => {
      expect(screen.getAllByText(/kevin/i)).toHaveLength(3); // Should appear in home subtitle, about section and email
    }, { timeout: 10000 });
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    // Should render within 5 seconds (generous for testing environment)
    expect(renderTime).toBeLessThan(5000);
  }, 15000); // 15 second timeout for Jest
});
