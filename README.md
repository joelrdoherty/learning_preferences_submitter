# Aptly Able Learning Preferences & Coaching Style Assessment

A professional, self-contained form application for collecting learning preferences and coaching style assessments. This application calculates learning archetype scores and sends results via email to the Aptly Able coaching team.

## Features

- ✨ Clean, modern UI with Aptly Able branding (#24568d)
- 📊 Automatic archetype scoring (Analyst, Doer, Connector, Explorer)
- 📧 FREE email submission via Google Apps Script + Gmail (no monthly fees!)
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

### 2. Google Apps Script Setup (FREE Email Sending!)

This application uses Google Apps Script to send emails via your Gmail account - completely free! No monthly fees.

**📖 See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed step-by-step instructions.**

Quick overview:

#### Step 1: Create Google Apps Script

1. Go to [https://script.google.com](https://script.google.com)
2. Create a new project
3. Copy the code from `google-apps-script.gs` into the editor
4. Save the project

#### Step 2: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Choose **Web app** type
3. Set "Execute as" to **Me**
4. Set "Who has access" to **Anyone**
5. Click **Deploy** and authorize the app
6. **Copy the deployment URL** (looks like: `https://script.google.com/macros/s/AKfycbx.../exec`)

#### Step 3: Update Configuration

Open `script.js` and update the Google Apps Script URL:

```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxXXXXXXXXXXX/exec';
```

That's it! The email will be sent to `info@aptlyable.com` (configured in the Google Apps Script)

### 3. Testing Locally

1. Open `index.html` in a web browser
2. Fill out the assessment form
3. Submit and verify the email is received at info@aptlyable.com

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

### 4. Embedding on Wix

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

### 5. Customization

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
├── index.html                 # Main form structure
├── styles.css                 # Styling and branding
├── script.js                  # Form logic and submission handling
├── google-apps-script.gs      # Google Apps Script code for email sending
├── assets/
│   └── Aptly-Able-Logo2.jpg  # Company logo
├── SETUP_GUIDE.md             # Detailed setup instructions
└── README.md                  # This file
```

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Fully responsive

## Troubleshooting

### Email Not Sending

1. Check that Google Apps Script URL is correct in `script.js`
2. Verify your Google Apps Script is deployed as "Anyone" can access
3. Check browser console for error messages (F12 → Console)
4. Check your Gmail spam folder
5. Check Google Apps Script execution logs at script.google.com

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

- The Google Apps Script URL can be public (it only accepts form data)
- Only you can modify or view the Google Apps Script code
- Gmail sending limits: 100 emails/day (free), 1500/day (Google Workspace)
- Form submissions go directly to your inbox
- reCAPTCHA and honeypot field protect against spam

## Support

For questions or issues with the form:
- Check the browser console for error messages
- Verify Google Apps Script configuration
- See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed troubleshooting

## License

© 2025 Aptly Able, LLC. All rights reserved.

## Version History

- **v1.1.0** (2025-10-30): Switched to Google Apps Script
  - FREE email sending via Gmail (no monthly fees!)
  - Removed EmailJS dependency
  - Added comprehensive setup guide
  - All other features remain the same

- **v1.0.0** (2025-10-30): Initial release
  - 15 learning preference questions
  - 3 reflection questions
  - Archetype scoring algorithm
  - Email integration
  - Responsive design with Aptly Able branding
  - Spam protection with reCAPTCHA

