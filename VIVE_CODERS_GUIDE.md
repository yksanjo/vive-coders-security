# 🚀 Vive Coders Security - Step-by-Step Guide

A complete guide to get started with AI-powered security scanning for your serverless deployments.

## 📋 Table of Contents

1. [Quick Start (5 minutes)](#quick-start-5-minutes)
2. [Full Setup Guide](#full-setup-guide)
3. [Using VS Code Extension](#using-vs-code-extension)
4. [Using Chrome Extension](#using-chrome-extension)
5. [Setting Up CI/CD Integration](#setting-up-cicd-integration)
6. [Connecting Your Projects](#connecting-your-projects)
7. [Understanding Findings](#understanding-findings)
8. [Troubleshooting](#troubleshooting)

---

## 🏃 Quick Start (5 minutes)

### Step 1: Clone the Repository

```bash
git clone https://github.com/yksanjo/vive-coders-security.git
cd vive-coders-security
```

### Step 2: Start with Docker (Easiest)

```bash
# Make sure Docker is running
docker-compose up
```

This starts:
- ✅ PostgreSQL database (port 5432)
- ✅ Backend API (port 3001)
- ✅ Dashboard (port 3000)

### Step 3: Open Dashboard

Open your browser and go to:
```
http://localhost:3000
```

You should see the Vive Coders Security dashboard!

### Step 4: Test It Out

1. Click "Add Project"
2. Enter a project name (e.g., "My Vercel App")
3. Select platform (Vercel, Railway, or Replit)
4. The dashboard will show your project

**🎉 You're ready to scan!**

---

## 📚 Full Setup Guide

### Prerequisites

- **Node.js 20+** - [Download here](https://nodejs.org/)
- **PostgreSQL 15+** - [Download here](https://www.postgresql.org/download/)
- **Docker** (optional) - [Download here](https://www.docker.com/)
- **OpenAI API Key** (for AI features) - [Get one here](https://platform.openai.com/api-keys)

### Option A: Docker Setup (Recommended)

#### Step 1: Clone Repository

```bash
git clone https://github.com/yksanjo/vive-coders-security.git
cd vive-coders-security
```

#### Step 2: Configure Environment

```bash
# Copy environment template
cp backend/.env.example backend/.env

# Edit backend/.env and add:
# - DATABASE_URL (if using external DB)
# - OPENAI_API_KEY (for AI features)
# - JWT_SECRET (generate a random string)
```

#### Step 3: Start Services

```bash
docker-compose up
```

Wait for all services to start (you'll see "Server running on port 3001" and Next.js ready messages).

#### Step 4: Run Database Migrations

```bash
# In a new terminal
docker-compose exec backend npm run migrate
```

#### Step 5: Access Dashboard

Open: **http://localhost:3000**

---

### Option B: Manual Setup

#### Step 1: Set Up Database

```bash
# Create PostgreSQL database
createdb vivecoders_security

# Or using psql:
psql -c "CREATE DATABASE vivecoders_security;"
```

#### Step 2: Configure Backend

```bash
cd backend

# Install dependencies
npm install

# Copy and edit environment file
cp .env.example .env
# Edit .env with your settings:
# - DATABASE_URL=postgresql://username:password@localhost:5432/vivecoders_security
# - OPENAI_API_KEY=your_key_here
# - JWT_SECRET=your_secret_here
```

#### Step 3: Run Migrations

```bash
npm run migrate
```

#### Step 4: Start Backend

```bash
npm run dev
```

Backend will run on **http://localhost:3001**

#### Step 5: Set Up Dashboard

```bash
# In a new terminal
cd dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

Dashboard will run on **http://localhost:3000**

---

## 💻 Using VS Code Extension

### Step 1: Install Extension

#### Option A: From Source (Development)

```bash
cd extensions/vscode-extension
npm install
npm run compile
```

Then in VS Code:
1. Press `F5` to launch Extension Development Host
2. A new VS Code window opens with the extension loaded

#### Option B: Package Extension (For Distribution)

```bash
cd extensions/vscode-extension
npm install -g vsce  # Install VS Code Extension Manager
vsce package
```

Then install the `.vsix` file in VS Code:
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Click "..." menu → "Install from VSIX"
4. Select the generated `.vsix` file

### Step 2: Configure Extension

1. Open VS Code Settings (Cmd+, or Ctrl+,)
2. Search for "Vive Coders Security"
3. Set API URL: `http://localhost:3001` (or your backend URL)
4. Enable "Auto Scan on Save"

### Step 3: Use the Extension

#### Manual Scan

1. Open any `.js`, `.ts`, `.jsx`, `.tsx` file
2. Press `Ctrl+Shift+P` (Cmd+Shift+P on Mac)
3. Type "Scan File for Security Issues"
4. Press Enter

#### Auto Scan

- The extension automatically scans files when you save (if enabled)
- Security issues appear as:
  - **Red squiggles** = Critical/High severity
  - **Yellow squiggles** = Medium severity
  - **Blue squiggles** = Low/Info severity

#### View Findings

1. Open Problems panel (View → Problems)
2. Look for "Vive Coders Security" issues
3. Click on an issue to see details
4. Hover over code to see security warning

---

## 🌐 Using Chrome Extension

### Step 1: Build Extension

```bash
cd extensions/chrome-extension

# Install dependencies (if any)
npm install

# The extension is ready to use
```

### Step 2: Load Extension in Chrome

1. Open Chrome
2. Go to `chrome://extensions/`
3. Enable **"Developer mode"** (toggle in top right)
4. Click **"Load unpacked"**
5. Select the `extensions/chrome-extension` folder

### Step 3: Configure Extension

1. Click the extension icon in Chrome toolbar
2. Set API URL (default: `http://localhost:3001`)
3. Make sure backend is running

### Step 4: Use on GitHub PRs

1. Navigate to any GitHub Pull Request
2. The extension automatically scans the PR
3. A security banner appears at the top showing:
   - Number of findings
   - Critical/High severity counts
4. Click the extension icon to see detailed findings

### Step 5: Use on Vercel/Railway Pages

1. Navigate to your Vercel or Railway deployment page
2. The extension scans the deployment configuration
3. Security issues are highlighted automatically

---

## 🔄 Setting Up CI/CD Integration

### GitHub Actions

#### Step 1: Add Workflow File

Create `.github/workflows/security-scan.yml` in your repository:

```yaml
name: Security Scan

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run Security Scan
        run: |
          curl -X POST ${{ secrets.VIVE_CODERS_API_URL }}/api/scan \
            -H "Content-Type: application/json" \
            -H "Authorization: Bearer ${{ secrets.VIVE_CODERS_API_KEY }}" \
            -d '{"project_id": "${{ github.repository }}", "scan_type": "code"}'
```

#### Step 2: Add Secrets to GitHub

1. Go to your repository on GitHub
2. Settings → Secrets and variables → Actions
3. Add secrets:
   - `VIVE_CODERS_API_URL`: `https://your-api-url.com` (or `http://localhost:3001` for local)
   - `VIVE_CODERS_API_KEY`: Your API key (if using authentication)

#### Step 3: Test

1. Create a pull request
2. GitHub Actions will automatically run the security scan
3. Check the Actions tab to see results

### Vercel Integration

#### Step 1: Deploy Security Check Function

Copy `ci-cd/vercel/security-check.js` to your Vercel project as an API route:

```bash
# In your Vercel project
mkdir -p api/security-check
cp vive-coders-security/ci-cd/vercel/security-check.js api/security-check/index.js
```

#### Step 2: Set Environment Variables

In Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add:
   - `VIVE_CODERS_SECURITY_API_URL`
   - `VIVE_CODERS_SECURITY_API_KEY`

#### Step 3: Configure Pre-Deploy Hook

1. Go to Project Settings → Git
2. Add pre-deploy hook pointing to your security check function

### Railway Integration

#### Step 1: Set Up Webhook

1. Go to Railway project settings
2. Navigate to Webhooks
3. Add webhook URL: `https://your-backend-url.com/api/webhooks/railway`

#### Step 2: Configure Environment Variables

In Railway dashboard:
1. Go to Variables
2. Add:
   - `VIVE_CODERS_SECURITY_API_URL`
   - `VIVE_CODERS_SECURITY_API_KEY`

---

## 🔗 Connecting Your Projects

### Step 1: Add Project via Dashboard

1. Open dashboard: `http://localhost:3000`
2. Click **"Add Project"** button
3. Fill in:
   - **Name**: Your project name
   - **Platform**: Vercel, Railway, Replit, or GitHub
   - **Repository URL**: (optional) GitHub repo URL
   - **Deployment URL**: (optional) Your app URL

### Step 2: Connect GitHub Integration

1. Go to **Integrations** page
2. Click **"Connect"** next to GitHub
3. Authorize with GitHub OAuth
4. Select repositories to scan

### Step 3: Connect Vercel Integration

1. Go to **Integrations** page
2. Click **"Connect"** next to Vercel
3. Enter your Vercel API token
4. Select projects to monitor

### Step 4: Connect Railway Integration

1. Go to **Integrations** page
2. Click **"Connect"** next to Railway
3. Enter your Railway API token
4. Select projects to monitor

---

## 🔍 Understanding Findings

### Severity Levels

- 🔴 **Critical**: Immediate security risk (e.g., hardcoded secrets, SQL injection)
- 🟠 **High**: Significant security issue (e.g., exposed env vars, missing auth)
- 🟡 **Medium**: Moderate risk (e.g., weak crypto, misconfigured CORS)
- 🔵 **Low**: Minor issue (e.g., insecure random, outdated dependencies)
- ⚪ **Info**: Informational (e.g., best practices)

### Finding Details

Each finding shows:
- **Title**: What the issue is
- **Description**: Why it's a problem
- **File Path**: Where it was found
- **Line Number**: Exact location
- **Code Snippet**: The vulnerable code
- **Fix Suggestion**: AI-generated solution (if available)

### Taking Action

1. **Review Finding**: Read the description and code snippet
2. **Check AI Suggestion**: Look at the green "Suggested Fix" box
3. **Apply Fix**: Copy the suggested code or implement manually
4. **Update Status**: Mark as "Fixed", "Ignored", or "False Positive"

---

## 🐛 Troubleshooting

### Backend Won't Start

**Problem**: `Error: Cannot connect to database`

**Solution**:
```bash
# Check PostgreSQL is running
pg_isready

# Check DATABASE_URL in .env
# Should be: postgresql://user:password@localhost:5432/vivecoders_security
```

### Dashboard Shows "Failed to fetch"

**Problem**: Dashboard can't connect to backend

**Solution**:
1. Check backend is running: `curl http://localhost:3001/health`
2. Check `NEXT_PUBLIC_API_URL` in dashboard
3. Check CORS settings in backend

### VS Code Extension Not Working

**Problem**: No security warnings appear

**Solution**:
1. Check API URL in VS Code settings
2. Make sure backend is running
3. Check Output panel for errors (View → Output → "Vive Coders Security")

### Chrome Extension Not Scanning

**Problem**: No security banner on GitHub PRs

**Solution**:
1. Check extension is enabled in `chrome://extensions/`
2. Refresh the GitHub page
3. Check browser console for errors (F12)

### Database Migration Fails

**Problem**: `relation already exists`

**Solution**:
```bash
# Drop and recreate database
dropdb vivecoders_security
createdb vivecoders_security
cd backend
npm run migrate
```

---

## 📞 Need Help?

- **Documentation**: Check `docs/` folder
- **API Docs**: See `docs/API.md`
- **Issues**: Open an issue on GitHub
- **Quick Start**: See `QUICKSTART.md`

---

## 🎯 Next Steps

1. ✅ Set up your first project
2. ✅ Run a security scan
3. ✅ Review findings
4. ✅ Apply AI-suggested fixes
5. ✅ Set up CI/CD integration
6. ✅ Connect your platforms (Vercel, Railway, Replit)

**Happy secure coding! 🔒**

