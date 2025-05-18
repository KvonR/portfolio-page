# Setting up EmailJS for Contact Form

Follow these steps to set up EmailJS for your portfolio contact form:

## 1. Create an EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/) and sign up for a free account
2. Verify your email address

## 2. Create an Email Service

1. In your EmailJS dashboard, go to "Email Services" and click "Add New Service"
2. Choose an email provider (Gmail, Outlook, etc.) and connect your email account
3. Name your service (e.g., "portfolio_contact") and save it
4. Note the Service ID

## 3. Create an Email Template

1. Go to "Email Templates" and click "Create New Template"
2. Design your email template with the following variables:
   - `{{name}}` - Sender's name
   - `{{email}}` - Sender's email
   - `{{message}}` - Message content
3. Here's a sample template:

```
Subject: New Portfolio Contact from {{name}}

Name: {{name}}
Email: {{email}}

Message:
{{message}}
```

4. Save the template and note the Template ID

## 4. Get Your Public Key

1. Go to "Account" > "API Keys"
2. Copy your Public Key

## 5. Update Your Contact.js File

1. Replace the placeholders in your Contact.js file:
   - Replace `YOUR_EMAILJS_SERVICE_ID` with your Service ID
   - Replace `YOUR_EMAILJS_TEMPLATE_ID` with your Template ID
   - Replace `YOUR_EMAILJS_PUBLIC_KEY` with your Public Key

```javascript
const serviceId = 'YOUR_EMAILJS_SERVICE_ID';
const templateId = 'YOUR_EMAILJS_TEMPLATE_ID';
const publicKey = 'YOUR_EMAILJS_PUBLIC_KEY';
```

## 6. Test Your Contact Form

1. Fill out the contact form on your portfolio page
2. Submit it and check if you receive the email
3. Make any adjustments to the template as needed

## Notes

- The free plan of EmailJS allows 200 emails per month
- Make sure the form field names (name, email, message) match the variables in your template
- More information can be found in the [EmailJS documentation](https://www.emailjs.com/docs/)
