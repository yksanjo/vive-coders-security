# Screenshot Guide for GitHub README

## Recommended Screenshots

### 1. Dashboard Overview (Main Screenshot)
**File to capture**: `dashboard/app/page.tsx` rendered

**What to show:**
- Gradient blue-to-indigo background
- Four stat cards in a row (Projects: 5, Total Findings: 23, Critical Issues: 3, Recent Scans: 12)
- "Projects" section with 2-3 project cards
- "Add Project" button visible

**Caption**: "Modern dashboard with real-time security metrics and project overview"

### 2. Project with Findings
**File to capture**: `dashboard/app/projects/[id]/page.tsx` rendered

**What to show:**
- Project header with name and platform badge
- Filter dropdowns (Severity: All, Status: Open)
- 3-4 findings cards with different severities:
  - 1 Critical (red) - "Hardcoded Secret"
  - 1 High (orange) - "Exposed Environment Variable"
  - 1 Medium (yellow) - "Missing Authentication"
- At least one finding with green "Suggested Fix" box expanded

**Caption**: "Color-coded findings with AI-powered fix suggestions"

### 3. VS Code Extension
**What to show:**
- VS Code editor with code file open
- Red/yellow squiggly lines under vulnerable code
- Problems panel open showing security issues
- Hover tooltip showing security warning

**Caption**: "Real-time security scanning directly in VS Code"

### 4. GitHub PR Integration
**What to show:**
- GitHub PR page
- Security banner at top showing "Found 5 security issues: 2 critical, 3 high"
- Comment from security bot with findings summary

**Caption**: "Automatic security scanning on pull requests"

## How to Take Screenshots

### Option 1: Run Dashboard Locally
```bash
cd dashboard
npm install
npm run dev
# Open http://localhost:3000
# Take screenshots using Cmd+Shift+4 (Mac) or Snipping Tool (Windows)
```

### Option 2: Use Browser DevTools
1. Open dashboard in browser
2. Right-click → Inspect
3. Toggle device toolbar (Cmd+Shift+M)
4. Set to Desktop view (1920x1080)
5. Take screenshot

### Option 3: Use Screenshot Tools
- **Mac**: Cmd+Shift+4 (area), Cmd+Shift+3 (full screen)
- **Windows**: Snipping Tool or Win+Shift+S
- **Browser Extensions**: Full Page Screen Capture (Chrome)

## Screenshot Specifications

- **Format**: PNG or JPG
- **Resolution**: 1920x1080 or higher
- **File size**: < 500KB (optimize if needed)
- **Naming**: `dashboard-overview.png`, `project-findings.png`, etc.

## Adding Screenshots to README

1. Create `screenshots/` directory
2. Add screenshots there
3. Update README.md with:

```markdown
## 📸 Screenshots

### Dashboard Overview
![Dashboard](screenshots/dashboard-overview.png)

### Project Findings
![Findings](screenshots/project-findings.png)

### VS Code Extension
![VS Code](screenshots/vscode-extension.png)
```

## Mockup Alternative

If you can't run the app yet, you can:
1. Use the UI description in `UI_DESCRIPTION.md` to create mockups
2. Use tools like Figma, Canva, or Excalidraw
3. Create simple wireframes showing the layout

## Quick Mockup Description for Designers

**Dashboard:**
- Header: "Vive Coders Security" (large, bold)
- 4 stat cards in grid: White cards, blue numbers, icons
- Projects section: White card, list of projects with badges
- Background: Gradient from light blue to light indigo

**Findings Page:**
- Project name at top
- Filter bar with dropdowns
- List of colored cards (red, orange, yellow, blue)
- Each card: Title, description, file path, fix suggestion box

