# Integration Guide

## GitHub Actions

1. Add the workflow file to `.github/workflows/security-scan.yml`
2. Set secrets:
   - `VIVE_CODERS_SECURITY_API_URL`
   - `VIVE_CODERS_SECURITY_API_KEY`
3. The workflow will automatically run on PRs

## Vercel

1. Deploy the security check function to Vercel
2. Set environment variables:
   - `VIVE_CODERS_SECURITY_API_URL`
   - `VIVE_CODERS_SECURITY_API_KEY`
3. Configure as a pre-deploy hook

## Railway

1. Set up a webhook in Railway project settings
2. Point it to your security check endpoint
3. Set environment variables

## VS Code Extension

1. Install from VS Code marketplace
2. Configure API URL in settings
3. Enable auto-scan on save

## Chrome Extension

1. Load unpacked extension
2. Navigate to GitHub PRs
3. Extension will automatically scan

