# Vive Coders Security - VS Code Extension

AI-powered security scanning for your code directly in VS Code.

## Features

- 🔍 Real-time file scanning
- ⚠️ Inline security warnings
- 🤖 AI-powered fix suggestions
- 🔄 Auto-scan on save
- 📊 Security score indicator

## Installation

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "Vive Coders Security"
4. Click Install

## Configuration

Add to your `settings.json`:

```json
{
  "viveCodersSecurity.apiUrl": "http://localhost:3001",
  "viveCodersSecurity.enableAutoScan": true
}
```

## Usage

- **Scan Current File**: `Ctrl+Shift+P` → "Scan File for Security Issues"
- **Scan Workspace**: `Ctrl+Shift+P` → "Scan Workspace for Security Issues"

Auto-scan runs on file save by default.

