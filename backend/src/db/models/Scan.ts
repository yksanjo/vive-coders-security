import { query } from '../index';

export interface Scan {
  id: string;
  project_id: string;
  scan_type: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  files_scanned: number;
  findings_count: number;
  started_at: Date;
  completed_at?: Date;
  metadata?: Record<string, any>;
}

export const createScan = async (scanData: Partial<Scan>): Promise<Scan> => {
  const { project_id, scan_type, metadata } = scanData;
  const result = await query(
    `INSERT INTO scans (project_id, scan_type, metadata)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [project_id, scan_type, JSON.stringify(metadata || {})]
  );
  return result.rows[0];
};

export const updateScan = async (id: string, updates: Partial<Scan>): Promise<Scan> => {
  const fields = Object.keys(updates).map((key, index) => {
    if (key === 'metadata') {
      return `metadata = $${index + 2}::jsonb`;
    }
    return `${key} = $${index + 2}`;
  }).join(', ');
  const values = Object.values(updates).map(v => typeof v === 'object' && v !== null ? JSON.stringify(v) : v);
  const result = await query(
    `UPDATE scans SET ${fields} WHERE id = $1 RETURNING *`,
    [id, ...values]
  );
  return result.rows[0];
};

export const getScansByProjectId = async (project_id: string): Promise<Scan[]> => {
  const result = await query(
    'SELECT * FROM scans WHERE project_id = $1 ORDER BY started_at DESC LIMIT 50',
    [project_id]
  );
  return result.rows;
};

export const getScanById = async (id: string): Promise<Scan | null> => {
  const result = await query('SELECT * FROM scans WHERE id = $1', [id]);
  return result.rows[0] || null;
};

