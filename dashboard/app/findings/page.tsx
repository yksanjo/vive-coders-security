'use client';

import { useState, useEffect } from 'react';

interface Finding {
  id: string;
  project_id: string;
  file_path: string;
  line_number?: number;
  rule_id: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  title: string;
  description?: string;
  status: string;
}

export default function FindingsPage() {
  const [findings, setFindings] = useState<Finding[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch all findings across projects
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">All Findings</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          {loading ? (
            <div className="text-center py-8">Loading findings...</div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Findings view coming soon...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}











