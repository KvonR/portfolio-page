import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app with main navigation', () => {
  render(<App />);
  
  // Check if the main navigation elements are present
  const homeLinks = screen.getAllByText(/home/i);
  const aboutLinks = screen.getAllByText(/about me/i);
  const skillsLinks = screen.getAllByText(/skills/i);
  
  // Should have at least one of each navigation link
  expect(homeLinks.length).toBeGreaterThan(0);
  expect(aboutLinks.length).toBeGreaterThan(0);
  expect(skillsLinks.length).toBeGreaterThan(0);
  
  // Check that the navigation container exists
  const nav = screen.getByRole('navigation');
  expect(nav).toBeInTheDocument();
});
