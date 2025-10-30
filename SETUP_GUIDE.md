# Google Apps Script Setup Guide

## Quick Setup (5 minutes)

This guide will walk you through setting up the **FREE** Gmail-based email system for your form.

### Step 1: Create Google Apps Script

1. Go to [https://script.google.com](https://script.google.com)
2. Click **"New Project"**
3. Delete any existing code in the editor
4. Copy ALL the code from `google-apps-script.gs` and paste it into the editor
5. Click the disk icon or press `Ctrl+S` (Cmd+S on Mac) to save
6. Name your project: **"Aptly Able Assessment Emailer"**

### Step 2: Deploy as Web App

1. Click **"Deploy"** → **"New deployment"**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **"Web app"**
4. Fill in the settings:
   - **Description**: `Aptly Able Form Handler`
   - **Execute as**: **Me** (your@gmail.com)
   - **Who has access**: **Anyone**
5. Click **"Deploy"**
6. You may need to authorize the script:
   - Click **"Authorize access"**
   - Choose your Google account
   - Click **"Advanced"** → **"Go to Aptly Able Assessment Emailer (unsafe)"**
   - Click **"Allow"**
7. **COPY THE WEB APP URL** - it will look like:
   ```
   https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXXXXXXXXX/exec
   ```

### Step 3: Update Your Form

1. Open `script.js` in your code editor
2. Find line 3:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
   ```
3. Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL'` with your actual URL:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXXXXXXXXX/exec';
   ```
4. Save the file

### Step 4: Test It!

1. Open `index.html` in your browser
2. Fill out the assessment form
3. Click Submit
4. Check **info@aptlyable.com** inbox for the email

## That's It! 🎉

Your form now sends emails for FREE using Gmail. No monthly fees, no limits (up to 100 emails/day).

---

## Troubleshooting

### Email Not Received

1. **Check Gmail spam folder** - first submission might go to spam
2. **Verify the email address** in `google-apps-script.gs` line 21:
   ```javascript
   var recipient = "info@aptlyable.com";
   ```
3. **Check Google Apps Script logs**:
   - Go to [script.google.com](https://script.google.com)
   - Open your project
   - Click "Executions" on the left sidebar
   - Look for errors

### "Script not found" Error

- Make sure you deployed the script as "Anyone" can access
- Try creating a new deployment

### Authorization Issues

- Make sure you clicked "Allow" during authorization
- The script needs permission to send emails on your behalf

### Still Not Working?

1. Open browser developer console (F12)
2. Look for error messages
3. Check that `GOOGLE_SCRIPT_URL` is correctly set in `script.js`

---

## Email Limits

- **Free Gmail**: 100 emails per day
- **Google Workspace**: 1,500 emails per day

This should be more than enough for a learning assessment form!

---

## Making Changes

### Update Recipient Email

Edit `google-apps-script.gs` line 21:
```javascript
var recipient = "newemail@aptlyable.com";
```

Then deploy again (**Deploy** → **New deployment**)

### Update Email Format

The `formatEmailBody()` function in `google-apps-script.gs` controls the email format. Edit it and deploy again.

### Testing Without Sending

Use the `testEmail()` function in Google Apps Script editor:
1. Select `testEmail` from the function dropdown
2. Click the ▶️ Run button
3. Check the logs (View → Logs)

---

## Security Notes

✅ **Safe**: The web app URL is public but only accepts form data
✅ **Secure**: Only you can modify the script
✅ **Private**: Form submissions go directly to your email
❌ **Don't share**: Your Google Apps Script URL in public repositories (though it's relatively safe)

