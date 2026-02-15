'use client';

import { useState } from 'react';

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState([
    { platform: 'github', connected: false },
    { platform: 'vercel', connected: false },
    { platform: 'railway', connected: false },
    { platform: 'replit', connected: false },
  ]);

  const handleConnect = async (platform: string) => {
    // TODO: Implement OAuth flow
    console.log(`Connecting ${platform}...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Integrations</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {integrations.map((integration) => (
            <div
              key={integration.platform}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold capitalize text-gray-900">
                    {integration.platform}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {integration.connected ? 'Connected' : 'Not connected'}
                  </p>
                </div>
                <button
                  onClick={() => handleConnect(integration.platform)}
                  className={`px-4 py-2 rounded-lg ${
                    integration.connected
                      ? 'bg-gray-200 text-gray-700'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  } transition`}
                >
                  {integration.connected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}











