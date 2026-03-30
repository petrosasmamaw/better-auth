# Email Verification Setup Guide

## Overview
Your UNIFIND application now uses Gmail to send email verification messages to users during registration and password reset requests.

## Gmail Configuration Steps

### 1. Enable Gmail App Password

To use Gmail with this application, you need to use an **App Password** (not your regular Gmail password).

#### Steps:
1. Go to your Google Account: https://myaccount.google.com/
2. Select **Security** from the left menu
3. Enable **2-Step Verification** if you haven't already:
   - Click "2-Step Verification"
   - Follow the prompts to add a second verification method
4. After 2-Step Verification is enabled, go back to Security
5. Find **App passwords** option (appears only if 2-Step Verification is enabled)
6. Select **Mail** and **Windows Computer** (or your platform)
7. Google will generate a 16-character app password
8. Copy this password

### 2. Update Environment Variables

Open the `.env.local` file in the root of the FrontendFindItems folder and update:

```
EMAIL_SERVICE=gmail
EMAIL_USER=petrosasmamaw@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx    (your 16-character app password)
EMAIL_FROM=petrosasmamaw@gmail.com
BETTER_AUTH_SECRET=your-random-secret-key-here
```

**Important:** Replace the spaces in the app password if copied with them. Gmail may add spaces for readability but they should be removed when pasting into `.env.local`.

### 3. Update Database URL

Make sure your `DATABASE_URL` in `.env.local` is correctly set to your PostgreSQL database:

```
DATABASE_URL=postgres://username:password@localhost:5432/unifind
```

## How It Works

When a user:
1. **Signs up** → Email verification is sent automatically
2. **Requests password reset** → Password reset email is sent
3. **Tries to sign in without verifying email** → Gets a 403 error prompting to verify first

## Email Templates

The emails are styled with:
- Professional HTML layout
- Blue call-to-action buttons
- Clickable verification/reset links
- Backup plain text link option
- Footer with company branding

## Testing

To test email sending:

1. Create a test user account with an email address you have access to
2. Check your inbox for the verification email
3. Click the verification link to complete registration

## Troubleshooting

### Email not sending
- **Check app password:** Make sure you're using the 16-character Google App Password, not your regular Gmail password
- **2-Step Verification:** Confirm 2-Step Verification is enabled on your Google Account
- **Check logs:** Look at server console for error messages from nodemailer
- **Gmail security:** Sometimes Google blocks sign-in attempts - look for security alerts in your Gmail

### Wrong email sending from
- Make sure `EMAIL_FROM` matches your Gmail address in `.env.local`

### Environment variables not loading
- Restart your development server after updating `.env.local`
- Make sure `.env.local` is in the root of the FrontendFindItems folder

## Files Updated

- **`src/lib/auth.js`** - Updated auth configuration with proper email verification
- **`src/lib/email.js`** - New: Email service using nodemailer
- **`src/lib/emailTemplates.js`** - New: HTML email templates
- **`.env.local`** - New: Environment variables configuration
- **`package.json`** - Added nodemailer dependency

## Additional Notes

- Never commit `.env.local` to version control (it's in .gitignore by default)
- The email verification link expires in 24 hours by default
- Both send functions are wrapped with error handling and logging

For more information on better-auth email configuration, visit:
https://better-auth.com/docs/authentication/email-password#require-email-verification
