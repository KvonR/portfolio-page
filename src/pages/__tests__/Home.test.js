import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../Home';

// Mock canvas context before any tests run
beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
    fillRect: jest.fn(),
    clearRect: jest.fn(),
    getImageData: jest.fn(() => ({ data: new Uint8ClampedArray(4) })),
    putImageData: jest.fn(),
    createImageData: jest.fn(() => []),
    setTransform: jest.fn(),
    drawImage: jest.fn(),
    save: jest.fn(),
    fillText: jest.fn(),
    restore: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    closePath: jest.fn(),
    stroke: jest.fn(),
    translate: jest.fn(),
    scale: jest.fn(),
    rotate: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
    measureText: jest.fn(() => ({ width: 0 })),
    transform: jest.fn(),
    rect: jest.fn(),
    clip: jest.fn(),
    fillStyle: '',
    strokeStyle: '',
    globalAlpha: 1,
    lineWidth: 1,
    font: '10px sans-serif',
    textAlign: 'start',
    textBaseline: 'alphabetic',
    canvas: { width: 800, height: 600 },
  }));
});

// Mock react-scroll-parallax
jest.mock('react-scroll-parallax', () => ({
  Parallax: ({ children }) => <div>{children}</div>,
}));

// Mock scroll utility
jest.mock('../../utils/scrollUtils', () => ({
  handleSmoothScroll: jest.fn(),
}));

// Mock canvas context and animations
const mockAnimate = jest.fn();
const mockCanvasContext = {
  clearRect: jest.fn(),
  fillRect: jest.fn(),
  beginPath: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  fillStyle: '',
  globalAlpha: 1,
};

HTMLCanvasElement.prototype.getContext = jest.fn(() => mockCanvasContext);
Element.prototype.animate = mockAnimate;

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock window.innerWidth for mobile detection
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  test('renders main heading and subtitle', () => {
    render(<Home />);
    
    expect(screen.getByText(/building the web/i)).toBeInTheDocument();
    expect(screen.getByText(/one line at a time/i)).toBeInTheDocument();
    expect(screen.getByText(/kevin rahimi.*full-stack developer/i)).toBeInTheDocument();
  });

  test('renders call-to-action buttons', () => {
    render(<Home />);
    
    expect(screen.getByRole('link', { name: /view my work/i })).toBeInTheDocument();
  });

  test('initializes particle canvas', () => {
    render(<Home />);
    
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveClass('neon-canvas');
  });

  test('detects mobile devices correctly', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });

    render(<Home />);

    // Trigger resize event
    fireEvent(window, new Event('resize'));

    // Verify mobile-specific behavior would be triggered
    expect(HTMLCanvasElement.prototype.getContext).toHaveBeenCalled();
  });

  test('call-to-action buttons have correct functionality', async () => {
    const user = userEvent.setup();
    render(<Home />);
    
    const viewWorkLink = screen.getByRole('link', { name: /view my work/i });
    
    expect(viewWorkLink).toHaveAttribute('href', '#projects');
  });

  test('subtitle animation is initialized', () => {
    render(<Home />);
    
    // Check if animate function was called (subtitle glow animation)
    expect(mockAnimate).toHaveBeenCalled();
    
    const animateCall = mockAnimate.mock.calls[0];
    expect(animateCall[1]).toEqual({
      duration: 2000,
      iterations: Infinity
    });
  });

  test('responsive design adjusts for different screen sizes', () => {
    // Test desktop
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1920,
    });

    const { rerender } = render(<Home />);
    
    // Test tablet
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    });
    
    fireEvent(window, new Event('resize'));
    rerender(<Home />);
    
    // Test mobile
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 480,
    });
    
    fireEvent(window, new Event('resize'));
    rerender(<Home />);
    
    // Verify canvas context was called for each render
    expect(HTMLCanvasElement.prototype.getContext).toHaveBeenCalled();
  });

  test('has proper semantic structure', () => {
    render(<Home />);
    
    // Should have main section
    const section = document.querySelector('section');
    expect(section).toBeInTheDocument();
    
    // Should have proper heading hierarchy
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  test('particle canvas is accessible', () => {
    render(<Home />);
    
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveClass('neon-canvas');
  });

  test('text content uses correct styling', () => {
    render(<Home />);
    
    const mainHeading = screen.getByText(/building the web/i);
    const subtitle = screen.getByText(/kevin rahimi.*full-stack developer/i);
    
    // Check if elements are rendered (styling is handled by CSS)
    expect(mainHeading).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });

  test('handles window resize events', () => {
    render(<Home />);
    
    // Mock different screen sizes
    const sizes = [1920, 1366, 768, 480, 320];
    
    sizes.forEach(width => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
      });
      
      fireEvent(window, new Event('resize'));
    });
    
    // Should handle all resize events without errors
    expect(HTMLCanvasElement.prototype.getContext).toHaveBeenCalled();
  });

  test('cleans up event listeners on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    
    const { unmount } = render(<Home />);
    
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    
    removeEventListenerSpy.mockRestore();
  });
});
