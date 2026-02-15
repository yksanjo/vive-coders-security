#!/bin/bash

# Push Vive Coders Security to GitHub
# Usage: ./push-to-github.sh <github-username>

if [ -z "$1" ]; then
  echo "Usage: ./push-to-github.sh <github-username>"
  echo "Example: ./push-to-github.sh yoshikondo"
  exit 1
fi

GITHUB_USERNAME=$1
REPO_NAME="vive-coders-security"

echo "🚀 Pushing to GitHub..."
echo "Repository: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}"

# Check if remote already exists
if git remote get-url origin > /dev/null 2>&1; then
  echo "Remote 'origin' already exists. Updating..."
  git remote set-url origin https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git
else
  echo "Adding remote 'origin'..."
  git remote add origin https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git
fi

# Rename branch to main if needed
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "Renaming branch from '${CURRENT_BRANCH}' to 'main'..."
  git branch -M main
fi

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Successfully pushed to GitHub!"
  echo "📦 Repository: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}"
  echo ""
  echo "Next steps:"
  echo "1. Go to https://github.com/${GITHUB_USERNAME}/${REPO_NAME}"
  echo "2. Add repository description:"
  echo "   'AI-powered security scanning for serverless deployments (Vercel/Railway/Replit) - catch vulnerabilities before they ship with instant AI fix suggestions'"
  echo "3. Add topics: security, devsecops, serverless, vercel, railway, replit, ai-powered"
else
  echo ""
  echo "❌ Failed to push. Make sure:"
  echo "1. Repository exists at https://github.com/${GITHUB_USERNAME}/${REPO_NAME}"
  echo "2. You have push access to the repository"
  echo "3. You're authenticated with GitHub (check: gh auth status)"
fi











