# Push to GitHub

## Option 1: Create New Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `vive-coders-security`
3. Description: Use the one-line pitch: **"Snyk for serverless developers: AI-powered security scanning that catches vulnerabilities in your Vercel/Railway/Replit deployments before they ship, with instant fix suggestions."**
4. Choose Public or Private
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Option 2: Push to Existing Repository

Run these commands:

```bash
cd /Users/yoshikondo/vive-coders-security

# Add your GitHub username here
GITHUB_USERNAME="your-username"

# Add remote
git remote add origin https://github.com/${GITHUB_USERNAME}/vive-coders-security.git

# Rename branch to main (GitHub standard)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Quick Push Script

Or use the provided script:

```bash
cd /Users/yoshikondo/vive-coders-security
./push-to-github.sh your-username
```

## Repository Description for GitHub

Use this as your GitHub repository description:

**"AI-powered security scanning for serverless deployments (Vercel/Railway/Replit) - catch vulnerabilities before they ship with instant AI fix suggestions"**

## Topics/Tags for GitHub

Suggested topics:
- `security`
- `devsecops`
- `serverless`
- `vercel`
- `railway`
- `replit`
- `ai-powered`
- `code-scanner`
- `vulnerability-detection`
- `developer-tools`
- `typescript`
- `nextjs`
- `vscode-extension`

