# Vive Coders Security

AI-powered security plugin for developers deploying on serverless platforms (Vercel, Railway, Replit). Real-time code scanning, AI-powered fix suggestions, and zero-friction CI/CD integration.

## Features

- 🔍 **Real-time Code Scanning**: Detect security issues as you code
- 🤖 **AI-Powered Fixes**: Generate secure code replacements automatically
- 🔌 **Multi-Platform Support**: VS Code, Chrome, and Replit extensions
- 🚀 **CI/CD Integration**: Automatic scanning on PRs and deployments
- 📊 **Dashboard**: Centralized view of all security findings
- ⚡ **Zero-Friction Setup**: One-click integration with platforms

## Quick Start

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database and API keys
npm run dev
```

### Dashboard

```bash
cd dashboard
npm install
npm run dev
```

### VS Code Extension

```bash
cd extensions/vscode-extension
npm install
npm run compile
# Press F5 to launch extension development host
```

## Architecture

- **Backend**: Node.js, Express, TypeScript, PostgreSQL
- **Frontend**: Next.js 14, React, Tailwind CSS
- **Extensions**: VS Code API, Chrome Extension API, Replit API
- **AI**: OpenAI/Anthropic for security suggestions
- **CI/CD**: GitHub Actions, Vercel, Railway integrations

## Documentation

See [docs/](docs/) for detailed documentation:
- [API Documentation](docs/API.md)
- [Integration Guide](docs/INTEGRATION.md)
- [Deployment Guide](docs/DEPLOYMENT.md)

## License

MIT

