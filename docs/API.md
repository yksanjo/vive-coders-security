# API Documentation

## Base URL

```
http://localhost:3001
```

## Authentication

Most endpoints require authentication via JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Endpoints

### Scan

#### POST /api/scan

Scan a repository for security issues.

**Request Body:**
```json
{
  "project_id": "uuid",
  "scan_type": "full" | "code" | "config" | "dependency",
  "files": [
    {
      "path": "src/index.js",
      "content": "const apiKey = 'secret123';"
    }
  ],
  "config": {
    "vercel": { ... }
  }
}
```

**Response:**
```json
{
  "scan_id": "uuid",
  "findings_count": 5,
  "findings": [...]
}
```

#### POST /api/scan/file

Scan a single file.

**Request Body:**
```json
{
  "file_path": "src/index.js",
  "content": "const apiKey = 'secret123';",
  "project_id": "uuid"
}
```

### Findings

#### GET /api/findings/project/:projectId

Get all findings for a project.

**Query Parameters:**
- `severity`: Filter by severity (critical, high, medium, low, info)
- `status`: Filter by status (open, fixed, ignored)

#### GET /api/findings/scan/:scanId

Get findings for a specific scan.

#### PATCH /api/findings/:findingId

Update a finding status.

**Request Body:**
```json
{
  "status": "fixed" | "ignored" | "false_positive"
}
```

### Projects

#### GET /api/projects

Get all projects for the authenticated user.

#### POST /api/projects

Create a new project.

#### GET /api/projects/:id

Get a specific project.

### AI

#### POST /api/ai/suggest

Get AI suggestion for a finding.

#### POST /api/ai/fix

Generate fix code for a finding.

#### POST /api/ai/explain

Get explanation of a security issue.











