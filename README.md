# Aptly Able Learning Preferences & Coaching Style Assessment

A professional, self-contained form application for collecting learning preferences and coaching style assessments. This application calculates learning archetype scores and sends results via email to the Aptly Able coaching team.

## Features

- ✨ Clean, modern UI with Aptly Able branding (#24568d)
- 📊 Automatic archetype scoring (Analyst, Doer, Connector, Explorer)
- 📧 Email submission via EmailJS
- 🛡️ Spam protection with Google reCAPTCHA v2 + honeypot field
- 📱 Fully responsive design
- ✅ Form validation and error handling
- 🎯 Professional user experience with loading states and success messages

## Learning Archetypes

The assessment identifies four learning archetypes:

- **🧠 The Analyst**: Logical, structured, data-driven
- **⚡ The Doer**: Action-oriented, direct, results-focused
- **💬 The Connector**: Collaborative, empathetic, people-centered
- **🌍 The Explorer**: Curious, creative, flexible

## Setup Instructions

### 1. Google reCAPTCHA Setup (Anti-Spam Protection)

This form includes Google reCAPTCHA v2 to prevent spam submissions.

#### Step 1: Get reCAPTCHA Keys

1. Go to [https://www.google.com/recaptcha/admin](https://www.google.com/recaptcha/admin)
2. Click the **+** button to register a new site
3. Fill out the form:
   - **Label**: `Aptly Able Learning Assessment`
   - **reCAPTCHA type**: Select **reCAPTCHA v2** → **"I'm not a robot" Checkbox**
   - **Domains**: Add your domain(s):
     - `aptlyable.com`
     - `www.aptlyable.com`
     - `localhost` (for testing)
   - Accept the terms and click **Submit**
4. Copy your **Site Key** (starts with `6L...`)

#### Step 2: Update the Configuration

Open `index.html` and find line 273. Replace `YOUR_RECAPTCHA_SITE_KEY` with your actual site key:

```html
<div class="g-recaptcha" data-sitekey="6LcXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"></div>
```

Also update `script.js` line 10:

```javascript
const RECAPTCHA_SITE_KEY = '6LcXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
```

**Note**: The reCAPTCHA will work on localhost for testing without any additional configuration.

### 2. EmailJS Configuration

This application uses [EmailJS](https://www.emailjs.com/) to send form submissions. Follow these steps to set it up:

#### Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

#### Step 2: Add an Email Service

1. In your EmailJS dashboard, click "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the prompts to connect your email account
5. Note your **Service ID** (e.g., `service_abc123`)

#### Step 3: Create an Email Template

1. In your EmailJS dashboard, click "Email Templates"
2. Click "Create New Template"
3. Set up your template with these parameters:
   - **Template Name**: `Learning Preferences Assessment`
   - **Subject**: `Learning Preferences Assessment - {{subject}}`
   - **Content**: 
   ```
   New Learning Preferences Assessment Submission
   
   {{message}}
   ```
4. Save the template and note your **Template ID** (e.g., `template_xyz789`)

#### Step 4: Get Your Public Key

1. In your EmailJS dashboard, click "Account"
2. Find your **Public Key** (e.g., `abcdefghijklmnop`)

#### Step 5: Update the Configuration

Open `script.js` and update the `EMAILJS_CONFIG` object:

```javascript
const EMAILJS_CONFIG = {
    serviceId: 'service_abc123',      // Replace with your Service ID
    templateId: 'template_xyz789',     // Replace with your Template ID
    publicKey: 'abcdefghijklmnop'      // Replace with your Public Key
};
```

Also update the team email address in the `handleSubmit` function:

```javascript
to_email: 'your-team-email@aptlyable.com', // Update with your team email
```

### 2. Testing Locally

1. Open `index.html` in a web browser
2. Fill out the assessment form
3. Submit and verify the email is received

You can also use a local server for testing:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

### 3. Embedding on Wix

There are two methods to embed this form on your Wix website:

#### Method A: Using Wix's Custom Code (Recommended)

1. In Wix Editor, click the **Add** button (+)
2. Select **Embed** → **Embed HTML**
3. Upload all files (`index.html`, `styles.css`, `script.js`, and `assets/` folder) to a web hosting service or Wix's media manager
4. In the HTML embed, use an iframe to load your form:

```html
<iframe src="https://your-domain.com/path-to-form/index.html" 
        width="100%" 
        height="2000px" 
        frameborder="0">
</iframe>
```

#### Method B: Direct HTML Embed

1. Upload `styles.css`, `script.js`, and the `assets/` folder to Wix's media manager
2. In Wix Editor, add a **Custom Element** or **HTML iframe**
3. Copy the contents of `index.html` (without the `<html>`, `<head>`, and `<body>` tags)
4. Update the file paths to point to your uploaded files on Wix's CDN

#### Method C: External Hosting

1. Host the entire application on:
   - GitHub Pages (free)
   - Netlify (free)
   - Vercel (free)
   - Your own web hosting
2. Embed using an iframe on your Wix page

**GitHub Pages Example:**

1. Create a new GitHub repository
2. Upload all files to the repository
3. Enable GitHub Pages in Settings → Pages
4. Use the provided URL in an iframe on your Wix site

### 4. Customization

#### Update Colors

Edit `styles.css` and modify the CSS variables:

```css
:root {
    --primary-color: #24568d;
    --primary-dark: #1a3f6b;
    --primary-light: #3a6ba8;
    /* Add your custom colors */
}
```

#### Update Logo

Replace `assets/Aptly-Able-Logo2.jpg` with your desired logo file and update the path in `index.html`:

```html
<img src="assets/your-logo.jpg" alt="Aptly Able Logo" class="logo">
```

#### Modify Questions

Edit the questions in `index.html`. If you add or remove questions, make sure to update:
1. The `ARCHETYPE_MAPPING` object in `script.js`
2. The `formatEmailContent` function in `script.js`
3. The validation logic in the `handleSubmit` function

## File Structure

```
Learning Preferences Submitter/
├── index.html              # Main form structure
├── styles.css              # Styling and branding
├── script.js               # Form logic and EmailJS integration
├── assets/
│   └── Aptly-Able-Logo2.jpg  # Company logo
└── README.md               # This file
```

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Fully responsive

## Troubleshooting

### Email Not Sending

1. Check that EmailJS credentials are correct in `script.js`
2. Verify your EmailJS service is active
3. Check browser console for error messages (F12 → Console)
4. Ensure your EmailJS free tier quota hasn't been exceeded (200 emails/month)

### Form Not Submitting

1. Ensure all 15 questions are answered
2. Check that all reflection questions have text
3. Verify the reCAPTCHA checkbox is checked
4. Verify JavaScript is enabled in the browser
5. Check browser console for errors

### reCAPTCHA Not Showing

1. Check that your reCAPTCHA Site Key is correctly configured in `index.html` (line 273)
2. Verify your domain is registered in Google reCAPTCHA admin
3. Check browser console for reCAPTCHA errors
4. Ensure the reCAPTCHA script is loading (check Network tab in DevTools)
5. Try testing on `localhost` first (it should work without domain registration)

### Styling Issues

1. Verify `styles.css` is loading correctly
2. Check that file paths are correct
3. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

### Logo Not Displaying

1. Verify the logo file exists in the `assets/` folder
2. Check that the path in `index.html` is correct
3. Try using an absolute URL instead of a relative path

## Security Notes

- Never commit your EmailJS credentials to a public repository
- Consider using environment variables for sensitive data
- EmailJS free tier has rate limiting (200 emails/month)
- For production use, consider upgrading to a paid EmailJS plan

## Support

For questions or issues with the form:
- Check the browser console for error messages
- Verify EmailJS configuration
- Contact the development team

## License

© 2025 Aptly Able, LLC. All rights reserved.

## Version History

- **v1.0.0** (2025-10-30): Initial release
  - 15 learning preference questions
  - 3 reflection questions
  - Archetype scoring algorithm
  - EmailJS integration
  - Responsive design with Aptly Able branding

