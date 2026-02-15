const API_URL = 'http://localhost:3001';

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'scanPR') {
    scanGitHubPR();
  }
  return true;
});

async function scanGitHubPR() {
  const url = window.location.href;
  if (!url.includes('github.com') || !url.includes('/pull/')) {
    return;
  }

  // Extract PR number and repo info from URL
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/);
  if (!match) return;

  const [, owner, repo, prNumber] = match;

  try {
    // Get PR files
    const response = await fetch(`${API_URL}/api/scan/github-pr`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ owner, repo, prNumber }),
    });

    const data = await response.json();
    if (data.findings && data.findings.length > 0) {
      displayFindings(data.findings);
    }
  } catch (error) {
    console.error('Failed to scan PR', error);
  }
}

function displayFindings(findings: any[]) {
  // Create a banner at the top of the PR page
  const banner = document.createElement('div');
  banner.style.cssText = `
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 6px;
    padding: 16px;
    margin: 16px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  `;

  const criticalCount = findings.filter((f) => f.severity === 'critical').length;
  const highCount = findings.filter((f) => f.severity === 'high').length;

  banner.innerHTML = `
    <div style="display: flex; align-items: center; gap: 12px;">
      <span style="font-size: 20px;">🔒</span>
      <div>
        <strong>Vive Coders Security Scan</strong>
        <div style="margin-top: 4px; font-size: 14px; color: #666;">
          Found ${findings.length} security issue(s): 
          ${criticalCount > 0 ? `<span style="color: #dc2626;">${criticalCount} critical</span>` : ''}
          ${highCount > 0 ? `<span style="color: #ea580c;">${highCount} high</span>` : ''}
        </div>
      </div>
    </div>
  `;

  // Insert at the top of the PR conversation
  const prConversation = document.querySelector('.js-discussion-sidebar')?.parentElement;
  if (prConversation) {
    prConversation.insertBefore(banner, prConversation.firstChild);
  }
}











