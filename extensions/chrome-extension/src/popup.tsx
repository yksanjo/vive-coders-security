import React from 'react';

function Popup() {
  return (
    <div style={{ width: '300px', padding: '16px' }}>
      <h2 style={{ margin: '0 0 12px 0', fontSize: '18px' }}>
        🔒 Vive Coders Security
      </h2>
      <p style={{ fontSize: '14px', color: '#666', margin: '0 0 16px 0' }}>
        AI-powered security scanning for your code
      </p>
      <button
        style={{
          width: '100%',
          padding: '8px',
          background: '#0ea5e9',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        onClick={() => {
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]?.id) {
              chrome.tabs.sendMessage(tabs[0].id, { action: 'scanPR' });
            }
          });
        }}
      >
        Scan Current Page
      </button>
    </div>
  );
}

export default Popup;











