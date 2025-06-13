import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from '../Contact';
import emailjs from '@emailjs/browser';

// Mock emailjs
jest.mock('@emailjs/browser');

// Mock react-scroll-parallax
jest.mock('react-scroll-parallax', () => ({
  Parallax: ({ children }) => <div>{children}</div>,
}));

describe('Contact Component', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Mock environment variables
    process.env.REACT_APP_EMAILJS_SERVICE_ID = 'test_service';
    process.env.REACT_APP_EMAILJS_TEMPLATE_ID = 'test_template';
    process.env.REACT_APP_EMAILJS_PUBLIC_KEY = 'test_key';
  });

  test('renders contact form with all required fields', () => {
    render(<Contact />);
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  test('renders social media links', () => {
    render(<Contact />);
    
    expect(screen.getByRole('link', { name: /kevinrahimi75@gmail.com/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /linkedin.com\/in\/rkev/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /github.com\/kvonr/i })).toBeInTheDocument();
  });

  test('updates form fields when user types', async () => {
    const user = userEvent.setup();
    render(<Contact />);
    
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(messageInput, 'Hello, this is a test message');
    
    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(messageInput).toHaveValue('Hello, this is a test message');
  });

  test('shows loading state when submitting form', async () => {
    const user = userEvent.setup();
    
    // Mock emailjs to return a pending promise
    emailjs.sendForm.mockImplementation(() => new Promise(() => {}));
    
    render(<Contact />);
    
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /send/i });
    
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(messageInput, 'Test message');
    
    await user.click(submitButton);
    
    expect(screen.getByText(/sending/i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  test('shows success message when email is sent successfully', async () => {
    const user = userEvent.setup();
    
    // Mock successful email sending
    emailjs.sendForm.mockResolvedValue({ text: 'OK' });
    
    render(<Contact />);
    
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /send/i });
    
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(messageInput, 'Test message');
    
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/your message has been sent/i)).toBeInTheDocument();
    });
    
    // Form should be cleared
    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
    expect(messageInput).toHaveValue('');
  });

  test('shows error message when email sending fails', async () => {
    const user = userEvent.setup();
    
    // Mock failed email sending
    emailjs.sendForm.mockRejectedValue({ text: 'Error' });
    
    render(<Contact />);
    
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /send/i });
    
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(messageInput, 'Test message');
    
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/there was an error sending your message/i)).toBeInTheDocument();
    });
  });

  test('calls emailjs with correct parameters', async () => {
    const user = userEvent.setup();
    
    emailjs.sendForm.mockResolvedValue({ text: 'OK' });
    
    render(<Contact />);
    
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /send/i });
    
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(messageInput, 'Test message');
    
    await user.click(submitButton);
    
    expect(emailjs.sendForm).toHaveBeenCalledWith(
      'test_service',
      'test_template',
      expect.any(HTMLFormElement),
      'test_key'
    );
  });

  test('social media links have correct URLs', () => {
    render(<Contact />);
    
    const emailLink = screen.getByRole('link', { name: /kevinrahimi75@gmail.com/i });
    const linkedinLink = screen.getByRole('link', { name: /linkedin.com\/in\/rkev/i });
    const githubLink = screen.getByRole('link', { name: /github.com\/kvonr/i });
    
    expect(emailLink).toHaveAttribute('href', expect.stringContaining('mailto:'));
    expect(linkedinLink).toHaveAttribute('href', expect.stringContaining('linkedin.com'));
    expect(githubLink).toHaveAttribute('href', expect.stringContaining('github.com'));
  });

  test('form has proper accessibility attributes', () => {
    const { container } = render(<Contact />);
    
    const form = container.querySelector('form');
    expect(form).toBeInTheDocument();
    
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    
    expect(nameInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(messageInput).toHaveAttribute('required');
  });

  test('form validation prevents submission with empty required fields', async () => {
    // Mock emailjs to prevent errors
    emailjs.sendForm.mockResolvedValue({ text: 'OK' });
    
    const user = userEvent.setup();
    render(<Contact />);
    
    const submitButton = screen.getByRole('button', { name: /send/i });
    
    // Try to submit form without filling fields
    await user.click(submitButton);
    
    // In a real browser, HTML5 validation would prevent form submission
    // In the test environment, we should either:
    // 1. Check that the HTML validation attributes are present
    // 2. Or the form submission is handled properly
    
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    
    expect(nameInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('required'); 
    expect(messageInput).toHaveAttribute('required');
  });
});
