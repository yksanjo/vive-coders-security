# Quick Start Guide

## Prerequisites

- Node.js 20+
- PostgreSQL 15+
- Docker (optional, for containerized setup)
- OpenAI API key (for AI features)

## Setup Steps

### 1. Clone and Install

```bash
cd vive-coders-security
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database URL and API keys
npm run migrate
npm run dev
```

Backend will run on `http://localhost:3001`

### 3. Dashboard Setup

```bash
cd dashboard
npm install
npm run dev
```

Dashboard will run on `http://localhost:3000`

### 4. Database Setup

Make sure PostgreSQL is running, then:

```bash
createdb vivecoders_security
cd backend
npm run migrate
```

### 5. Using Docker (Alternative)

```bash
docker-compose up
```

This will start:
- PostgreSQL on port 5432
- Backend on port 3001
- Dashboard on port 3000

## Testing the Setup

### Test Backend API

```bash
curl http://localhost:3001/health
```

### Test File Scanning

```bash
curl -X POST http://localhost:3001/api/scan/file \
  -H "Content-Type: application/json" \
  -d '{
    "file_path": "test.js",
    "content": "const apiKey = process.env.API_KEY;"
  }'
```

### Test Dashboard

Open `http://localhost:3000` in your browser.

## VS Code Extension

1. Open `extensions/vscode-extension` in VS Code
2. Press F5 to launch extension development host
3. Open a file and run "Scan File for Security Issues"

## Chrome Extension

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select `extensions/chrome-extension` directory
5. Navigate to a GitHub PR to test

## Next Steps

- Connect GitHub, Vercel, Railway accounts
- Set up CI/CD integrations
- Configure AI API keys
- Customize security rules

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for production deployment.











