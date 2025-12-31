'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Finding {
  id: string;
  file_path: string;
  line_number?: number;
  rule_id: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  title: string;
  description?: string;
  code_snippet?: string;
  fix_suggestion?: string;
  status: string;
}

interface Project {
  id: string;
  name: string;
  platform: string;
  repository_url?: string;
}

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [findings, setFindings] = useState<Finding[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<{ severity?: string; status?: string }>({});

  useEffect(() => {
    fetchProject();
    fetchFindings();
  }, [projectId, filter]);

  const fetchProject = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${projectId}`);
      const data = await response.json();
      setProject(data.project);
    } catch (error) {
      console.error('Failed to fetch project', error);
    }
  };

  const fetchFindings = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (filter.severity) queryParams.append('severity', filter.severity);
      if (filter.status) queryParams.append('status', filter.status);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/findings/project/${projectId}?${queryParams}`
      );
      const data = await response.json();
      setFindings(data.findings || []);
    } catch (error) {
      console.error('Failed to fetch findings', error);
    } finally {
      setLoading(false);
    }
  };

  const severityColors = {
    critical: 'bg-red-100 text-red-800 border-red-300',
    high: 'bg-orange-100 text-orange-800 border-orange-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    low: 'bg-blue-100 text-blue-800 border-blue-300',
    info: 'bg-gray-100 text-gray-800 border-gray-300',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="text-primary-600 hover:underline mb-4 inline-block">
          ← Back to Projects
        </Link>

        {project && (
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.name}</h1>
            <p className="text-gray-600 capitalize">{project.platform}</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex gap-4 mb-4">
            <select
              value={filter.severity || ''}
              onChange={(e) => setFilter({ ...filter, severity: e.target.value || undefined })}
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option value="">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
              <option value="info">Info</option>
            </select>

            <select
              value={filter.status || ''}
              onChange={(e) => setFilter({ ...filter, status: e.target.value || undefined })}
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option value="">All Statuses</option>
              <option value="open">Open</option>
              <option value="fixed">Fixed</option>
              <option value="ignored">Ignored</option>
            </select>
          </div>

          {loading ? (
            <div className="text-center py-8">Loading findings...</div>
          ) : findings.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No findings found. Great job! 🎉
            </div>
          ) : (
            <div className="space-y-4">
              {findings.map((finding) => (
                <div
                  key={finding.id}
                  className={`border rounded-lg p-4 ${severityColors[finding.severity]}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{finding.title}</h3>
                      <p className="text-sm mt-1">{finding.description}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${severityColors[finding.severity]}`}>
                      {finding.severity}
                    </span>
                  </div>

                  <div className="mt-2 text-sm">
                    <p className="font-mono text-xs bg-gray-100 p-2 rounded mt-2">
                      {finding.file_path}
                      {finding.line_number && `:${finding.line_number}`}
                    </p>
                  </div>

                  {finding.fix_suggestion && (
                    <div className="mt-3 p-3 bg-green-50 rounded border border-green-200">
                      <p className="text-sm font-semibold text-green-900 mb-1">Suggested Fix:</p>
                      <p className="text-sm text-green-800">{finding.fix_suggestion}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

