import { query } from '../index';

export interface Finding {
  id: string;
  scan_id: string;
  project_id: string;
  file_path: string;
  line_number?: number;
  column_number?: number;
  rule_id: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  title: string;
  description?: string;
  code_snippet?: string;
  fix_suggestion?: string;
  ai_explanation?: string;
  status: 'open' | 'fixed' | 'ignored' | 'false_positive';
  created_at: Date;
  updated_at: Date;
}

export const createFinding = async (findingData: Partial<Finding>): Promise<Finding> => {
  const {
    scan_id,
    project_id,
    file_path,
    line_number,
    column_number,
    rule_id,
    severity,
    title,
    description,
    code_snippet,
    fix_suggestion,
    ai_explanation,
  } = findingData;

  const result = await query(
    `INSERT INTO findings (
      scan_id, project_id, file_path, line_number, column_number,
      rule_id, severity, title, description, code_snippet,
      fix_suggestion, ai_explanation
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
     RETURNING *`,
    [
      scan_id, project_id, file_path, line_number, column_number,
      rule_id, severity, title, description, code_snippet,
      fix_suggestion, ai_explanation,
    ]
  );
  return result.rows[0];
};

export const getFindingsByScanId = async (scan_id: string): Promise<Finding[]> => {
  const result = await query(
    'SELECT * FROM findings WHERE scan_id = $1 ORDER BY severity DESC, line_number ASC',
    [scan_id]
  );
  return result.rows;
};

export const getFindingsByProjectId = async (
  project_id: string,
  filters?: { severity?: string; status?: string }
): Promise<Finding[]> => {
  let queryText = 'SELECT * FROM findings WHERE project_id = $1';
  const params: any[] = [project_id];

  if (filters?.severity) {
    queryText += ' AND severity = $2';
    params.push(filters.severity);
  }

  if (filters?.status) {
    queryText += ` AND status = $${params.length + 1}`;
    params.push(filters.status);
  }

  queryText += ' ORDER BY severity DESC, created_at DESC';

  const result = await query(queryText, params);
  return result.rows;
};

export const updateFinding = async (id: string, updates: Partial<Finding>): Promise<Finding> => {
  const fields = Object.keys(updates).map((key, index) => `${key} = $${index + 2}`).join(', ');
  const values = Object.values(updates);
  const result = await query(
    `UPDATE findings SET ${fields}, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`,
    [id, ...values]
  );
  return result.rows[0];
};

