'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Project {
  id: string;
  name: string;
  platform: string;
  repository_url?: string;
  created_at: string;
}

interface Stats {
  totalProjects: number;
  totalFindings: number;
  criticalFindings: number;
  recentScans: number;
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalProjects: 0,
    totalFindings: 0,
    criticalFindings: 0,
    recentScans: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
    fetchStats();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, {
        headers: {
          'x-user-id': 'demo-user-id', // In production, get from auth
        },
      });
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Failed to fetch projects', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // TODO: Implement stats endpoint
      setStats({
        totalProjects: projects.length,
        totalFindings: 0,
        criticalFindings: 0,
        recentScans: 0,
      });
    } catch (error) {
      console.error('Failed to fetch stats', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Vive Coders Security
          </h1>
          <p className="text-gray-600">
            AI-powered security scanning for your serverless deployments
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Projects"
            value={stats.totalProjects}
            icon="📁"
            color="blue"
          />
          <StatCard
            title="Total Findings"
            value={stats.totalFindings}
            icon="🔍"
            color="orange"
          />
          <StatCard
            title="Critical Issues"
            value={stats.criticalFindings}
            icon="⚠️"
            color="red"
          />
          <StatCard
            title="Recent Scans"
            value={stats.recentScans}
            icon="🔄"
            color="green"
          />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">Projects</h2>
            <Link
              href="/projects/new"
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
            >
              Add Project
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-8">Loading projects...</div>
          ) : projects.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No projects yet. Add your first project to get started!
            </div>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-900">{project.name}</h3>
                      <p className="text-sm text-gray-500 capitalize">{project.platform}</p>
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(project.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: string;
  color: string;
}) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    orange: 'bg-orange-100 text-orange-800',
    red: 'bg-red-100 text-red-800',
    green: 'bg-green-100 text-green-800',
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`text-4xl ${colorClasses[color as keyof typeof colorClasses]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}











