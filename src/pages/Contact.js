import React, { useState } from 'react';
import './Contact.css'; // Assuming you will create Contact.css for styling

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with actual form submission logic (e.g., API call)
    alert(`Message sent!\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact">
      <h2 className="section-header">Contact</h2>
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
      <p>Email: <a href="mailto:kev.r@example.com">kev.r@example.com</a></p>
      <p>LinkedIn: <a href="https://linkedin.com/in/kvonr">linkedin.com/in/kvonr</a></p>
      <p>GitHub: <a href="https://github.com/kvonr">github.com/kvonr</a></p>
    </section>
  );
};

export default Contact;
