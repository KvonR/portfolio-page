import React, { useState, useRef } from 'react';
import './Contact.css'; 
import { Parallax } from 'react-scroll-parallax'; // ADDED
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ submitted: false, success: false, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ submitted: false, success: false, message: '' });

    // EmailJS configuration - using environment variables for security
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        setStatus({
          submitted: true,
          success: true,
          message: 'Your message has been sent! I\'ll get back to you soon.'
        });
        setFormData({ name: '', email: '', message: '' });
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error('Error sending email:', error.text);
        setStatus({
          submitted: true,
          success: false,
          message: 'There was an error sending your message. Please try again later.'
        });
        setIsSubmitting(false);
      });
  };

  return (
    <section id="contact">
      <Parallax speed={-5}> {/* ADDED Parallax for header */}
        <h2 className="section-header glitch" data-text="Contact Me">Contact Me</h2>
      </Parallax>
      <Parallax speed={10} className="contact-content-parallax-wrapper"> {/* ADDED Parallax for content */}
        <form ref={form} onSubmit={handleSubmit} className={isSubmitting ? 'submitting' : ''}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </label>
          <label>
            Message:
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </label>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>
          
          {status.submitted && (
            <div className={`submit-status ${status.success ? 'success' : 'error'}`}>
              {status.message}
            </div>
          )}
        </form>
        <div className="contact-links">
          <p className="contact-item">
            <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
            <a href="mailto:kevinrahimi75@gmail.com">kevinrahimi75@gmail.com</a>
          </p>
          <p className="contact-item">
            <FontAwesomeIcon icon={faLinkedin} className="contact-icon" />
            <a href="https://www.linkedin.com/in/rkev/">linkedin.com/in/rkev</a>
          </p>
          <p className="contact-item">
            <FontAwesomeIcon icon={faGithub} className="contact-icon" />
            <a href="https://github.com/kvonr">github.com/kvonr</a>
          </p>
        </div>
      </Parallax>
    </section>
  );
};

export default Contact;
