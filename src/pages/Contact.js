import React, { useState } from 'react';
import './Contact.css'; 
import { Parallax } from 'react-scroll-parallax'; // ADDED
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent!\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact">
      <Parallax speed={-5}> {/* ADDED Parallax for header */}
        <h2 className="section-header glitch" data-text="Contact Me">Contact Me</h2>
      </Parallax>
      <Parallax speed={10} className="contact-content-parallax-wrapper"> {/* ADDED Parallax for content */}
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
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
            />
          </label>
          <label>
            Message:
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Send</button>
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
