# UI/UX Description for Screenshots

## Dashboard Overview Page

**Visual Description:**
A modern, clean dashboard with a gradient blue-to-indigo background. At the top, a header with "Vive Coders Security" title and tagline "AI-powered security scanning for your serverless deployments".

**Key Elements:**
- **Four stat cards** in a grid (Projects, Total Findings, Critical Issues, Recent Scans)
  - Each card has a white background, rounded corners, subtle shadow
  - Large number display with icon (📁, 🔍, ⚠️, 🔄)
  - Color-coded: blue, orange, red, green

- **Projects section** below stats
  - White card with rounded corners
  - "Add Project" button (primary blue)
  - Project list items with:
    - Project name (bold)
    - Platform badge (GitHub, Vercel, Railway, Replit)
    - Creation date
    - Hover effect with border highlight

**Color Scheme:**
- Primary: Blue (#0ea5e9)
- Background: Gradient from blue-50 to indigo-100
- Cards: White with subtle shadows
- Text: Dark gray (#111827) for headings, medium gray (#6B7280) for secondary

## Project Detail Page

**Visual Description:**
Similar gradient background. Project header with back button, project name, and platform.

**Key Elements:**
- **Filter dropdowns** (Severity, Status) in white card
- **Findings list** with color-coded cards:
  - **Critical**: Red background (#FEE2E2), red border
  - **High**: Orange background (#FFEDD5), orange border
  - **Medium**: Yellow background (#FEF3C7), yellow border
  - **Low**: Blue background (#DBEAFE), blue border

- Each finding card shows:
  - Title and description
  - Severity badge
  - File path with line number (monospace font, gray background)
  - Green "Suggested Fix" box if AI suggestion available

## Integrations Page

**Visual Description:**
Grid of integration cards (2x2 layout).

**Key Elements:**
- Each card: White background, rounded, shadow
- Platform name (GitHub, Vercel, Railway, Replit)
- Connection status ("Connected" / "Not connected")
- "Connect" / "Disconnect" button (blue when disconnected, gray when connected)

## Screenshot Recommendations

1. **Main Dashboard** - Show the overview with stats and project list
2. **Project with Findings** - Show a project with multiple findings of different severities
3. **AI Suggestion** - Show a finding with the green "Suggested Fix" box expanded
4. **VS Code Extension** - Show inline warnings in code editor
5. **GitHub PR** - Show security banner on a PR page

## Design Principles

- **Modern & Clean**: Lots of white space, rounded corners, subtle shadows
- **Color-Coded Severity**: Red (critical) → Orange (high) → Yellow (medium) → Blue (low)
- **Responsive**: Works on mobile, tablet, desktop
- **Accessible**: High contrast, readable fonts, clear hierarchy

