import { query } from '../index';

export interface Project {
  id: string;
  user_id: string;
  name: string;
  platform: string;
  platform_project_id?: string;
  repository_url?: string;
  deployment_url?: string;
  config?: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

export const createProject = async (projectData: Partial<Project>): Promise<Project> => {
  const { user_id, name, platform, platform_project_id, repository_url, deployment_url, config } = projectData;
  const result = await query(
    `INSERT INTO projects (user_id, name, platform, platform_project_id, repository_url, deployment_url, config)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [user_id, name, platform, platform_project_id, repository_url, deployment_url, JSON.stringify(config || {})]
  );
  return result.rows[0];
};

export const getProjectsByUserId = async (user_id: string): Promise<Project[]> => {
  const result = await query('SELECT * FROM projects WHERE user_id = $1 ORDER BY created_at DESC', [user_id]);
  return result.rows;
};

export const getProjectById = async (id: string): Promise<Project | null> => {
  const result = await query('SELECT * FROM projects WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const updateProject = async (id: string, updates: Partial<Project>): Promise<Project> => {
  const fields = Object.keys(updates).map((key, index) => {
    if (key === 'config') {
      return `config = $${index + 2}::jsonb`;
    }
    return `${key} = $${index + 2}`;
  }).join(', ');
  const values = Object.values(updates).map(v => typeof v === 'object' ? JSON.stringify(v) : v);
  const result = await query(
    `UPDATE projects SET ${fields}, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`,
    [id, ...values]
  );
  return result.rows[0];
};

export const deleteProject = async (id: string): Promise<void> => {
  await query('DELETE FROM projects WHERE id = $1', [id]);
};

