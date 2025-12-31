import { query } from '../index';

export interface User {
  id: string;
  email: string;
  password_hash?: string;
  github_id?: string;
  vercel_id?: string;
  railway_id?: string;
  replit_id?: string;
  created_at: Date;
  updated_at: Date;
}

export const createUser = async (userData: Partial<User>): Promise<User> => {
  const { email, password_hash, github_id } = userData;
  const result = await query(
    `INSERT INTO users (email, password_hash, github_id)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [email, password_hash, github_id]
  );
  return result.rows[0];
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const result = await query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0] || null;
};

export const getUserById = async (id: string): Promise<User | null> => {
  const result = await query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const updateUser = async (id: string, updates: Partial<User>): Promise<User> => {
  const fields = Object.keys(updates).map((key, index) => `${key} = $${index + 2}`).join(', ');
  const values = Object.values(updates);
  const result = await query(
    `UPDATE users SET ${fields}, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`,
    [id, ...values]
  );
  return result.rows[0];
};

