chrome.runtime.onInstalled.addListener(() => {
  console.log('Vive Coders Security extension installed');
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    if (tab.url.includes('github.com') && tab.url.includes('/pull/')) {
      // Inject content script for GitHub PRs
      chrome.tabs.sendMessage(tabId, { action: 'scanPR' });
    }
  }
});











