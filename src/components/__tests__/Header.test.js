import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../Header';

// Mock the scroll utility
jest.mock('../../utils/scrollUtils', () => ({
  handleSmoothScroll: jest.fn(),
}));

describe('Header Component', () => {
  beforeEach(() => {
    // Reset scroll position
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      value: 0,
    });
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0,
    });
  });

  test('renders header with navigation items', () => {
    render(<Header />);
    
    // Check if main navigation items are present
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About Me')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  test('mobile menu toggle functionality', async () => {
    const user = userEvent.setup();
    render(<Header />);
    
    const hamburgerButton = screen.getByRole('button', { name: /toggle navigation menu/i });
    expect(hamburgerButton).toBeInTheDocument();
    
    // Initially mobile menu should not be open
    const nav = screen.getByRole('navigation');
    const menuList = nav.querySelector('ul');
    expect(menuList).not.toHaveClass('mobile-menu-open');
    
    // Click hamburger to open menu
    await user.click(hamburgerButton);
    expect(menuList).toHaveClass('mobile-menu-open');
    
    // Click again to close menu
    await user.click(hamburgerButton);
    expect(menuList).not.toHaveClass('mobile-menu-open');
  });

  test('navigation links have correct href attributes', () => {
    render(<Header />);
    
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '#home');
    expect(screen.getByRole('link', { name: 'Experience' })).toHaveAttribute('href', '#experience');
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '#projects');
    expect(screen.getByRole('link', { name: 'Skills' })).toHaveAttribute('href', '#skills');
    expect(screen.getByRole('link', { name: 'About Me' })).toHaveAttribute('href', '#about-me');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact');
  });

  test('header adds scrolled class when scrolling down', () => {
    const { container } = render(<Header />);
    const header = container.querySelector('header');
    
    // Initially no scrolled class
    expect(header).not.toHaveClass('scrolled');
    
    // Simulate scroll down
    act(() => {
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: 100,
      });
      
      // Trigger scroll event
      const scrollEvent = new Event('scroll');
      window.dispatchEvent(scrollEvent);
    });
    
    expect(header).toHaveClass('scrolled');
  });

  test('mobile menu closes when clicking navigation item', async () => {
    const user = userEvent.setup();
    render(<Header />);
    
    const hamburgerButton = screen.getByRole('button', { name: /toggle navigation menu/i });
    const nav = screen.getByRole('navigation');
    const menuList = nav.querySelector('ul');
    
    // Open mobile menu
    await user.click(hamburgerButton);
    expect(menuList).toHaveClass('mobile-menu-open');
    
    // Click a navigation item
    const homeLink = screen.getByRole('link', { name: 'Home' });
    await user.click(homeLink);
    
    // Menu should close
    expect(menuList).not.toHaveClass('mobile-menu-open');
  });

  test('hamburger button has proper accessibility attributes', () => {
    render(<Header />);
    
    const hamburgerButton = screen.getByRole('button', { name: /toggle navigation menu/i });
    expect(hamburgerButton).toHaveAttribute('aria-label', 'Toggle navigation menu');
  });

  test('header structure is semantically correct', () => {
    render(<Header />);
    
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(6); // 6 navigation links
  });

  test('scrolled state changes only when crossing threshold', () => {
    const { container } = render(<Header />);
    const header = container.querySelector('header');
    
    // Scroll just under threshold (50px)
    act(() => {
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: 49,
      });
      
      const scrollEvent = new Event('scroll');
      window.dispatchEvent(scrollEvent);
    });
    
    expect(header).not.toHaveClass('scrolled');
    
    // Scroll over threshold
    act(() => {
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: 51,
      });
      
      const scrollEvent = new Event('scroll');
      window.dispatchEvent(scrollEvent);
    });
    
    expect(header).toHaveClass('scrolled');
  });
});
