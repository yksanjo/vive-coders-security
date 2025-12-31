# 🔒 Vive Coders Security

**AI-powered security scanning for serverless deployments - catch vulnerabilities before they ship, with instant fix suggestions.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎯 One-Line Pitch

**"Snyk for serverless developers: AI-powered security scanning that catches vulnerabilities in your Vercel/Railway/Replit deployments before they ship, with instant fix suggestions."**

## ✨ Features

- 🔍 **Real-time Code Scanning**: Detect security issues as you code
- 🤖 **AI-Powered Fixes**: Generate secure code replacements automatically
- 🔌 **Multi-Platform Support**: VS Code, Chrome, and Replit extensions
- 🚀 **CI/CD Integration**: Automatic scanning on PRs and deployments
- 📊 **Dashboard**: Centralized view of all security findings
- ⚡ **Zero-Friction Setup**: One-click integration with platforms

## 🏗️ Architecture

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────┐
│  VS Code /      │────▶│   Backend    │────▶│  PostgreSQL │
│  Chrome /       │     │   API        │     │  Database   │
│  Replit         │     │              │     └─────────────┘
└─────────────────┘     └──────┬───────┘
                                │
                    ┌───────────┼───────────┐
                    │           │           │
              ┌─────▼───┐  ┌───▼────┐  ┌──▼──────┐
              │ Scanner │  │   AI   │  │ GitHub │
              │ Engine  │  │Service │  │ Vercel │
              └─────────┘  └────────┘  │Railway │
                                       └────────┘
```

## 🚀 Quick Start

### Get Started in 5 Minutes

```bash
# 1. Clone the repository
git clone https://github.com/yksanjo/vive-coders-security.git
cd vive-coders-security

# 2. Start everything with Docker
docker-compose up

# 3. Open dashboard
# http://localhost:3000
```

**That's it!** See [GET_STARTED.md](GET_STARTED.md) for the quickest path, or [VIVE_CODERS_GUIDE.md](VIVE_CODERS_GUIDE.md) for the complete step-by-step guide.

### Manual Setup

See [QUICKSTART.md](QUICKSTART.md) for detailed manual setup instructions.

## 📸 UI Preview

### Dashboard Overview
- **Modern gradient background** (blue to indigo)
- **Four stat cards**: Projects, Total Findings, Critical Issues, Recent Scans
- **Project list** with platform badges and quick access
- **Color-coded severity**: Red (critical) → Orange (high) → Yellow (medium) → Blue (low)

### Project Detail Page
- **Filterable findings list** by severity and status
- **AI-powered fix suggestions** in green highlight boxes
- **File path and line number** for each finding
- **One-click status updates** (fixed, ignored, false positive)

### VS Code Extension
- **Inline diagnostics** with severity indicators
- **Real-time scanning** on file save
- **Quick-fix suggestions** in the Problems panel

See [UI_DESCRIPTION.md](UI_DESCRIPTION.md) for detailed UI descriptions.

## 🛠️ Technology Stack

- **Backend**: Node.js, Express, TypeScript, PostgreSQL
- **Frontend**: Next.js 14, React, Tailwind CSS
- **Extensions**: VS Code API, Chrome Extension API
- **AI**: OpenAI API for security suggestions
- **CI/CD**: GitHub Actions, Vercel Functions, Railway Webhooks

## 📚 Documentation

### Getting Started
- **[Get Started in 5 Minutes](GET_STARTED.md)** ⚡ - Fastest way to get running
- **[Complete Step-by-Step Guide](VIVE_CODERS_GUIDE.md)** 📖 - Full guide for Vive Coders
- [Quick Start Guide](QUICKSTART.md) - Detailed setup instructions

### Reference
- [API Documentation](docs/API.md)
- [Integration Guide](docs/INTEGRATION.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [UI/UX Description](UI_DESCRIPTION.md)
- [Screenshot Guide](SCREENSHOT_GUIDE.md)

## 🎯 Target Users

- **Indie developers** deploying on Vercel/Railway/Replit
- **Startups** needing security without enterprise complexity
- **Teams** wanting AI-powered security suggestions
- **Developers** who deploy fast and need security confidence

## 🔐 Security Features Detected

- Exposed environment variables
- Hardcoded secrets (API keys, tokens, passwords)
- SQL injection patterns
- XSS vulnerabilities
- Missing authentication
- Weak cryptography
- Misconfigured CORS
- Vulnerable dependencies

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🚧 Status

MVP Complete - Ready for testing and deployment.

See [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md) for detailed status.

---

**Built for developers who deploy fast and need security confidence.**
