import { readFileSync } from 'fs';
import { join } from 'path';
import { query } from './index';
import { logger } from '../utils/logger';

async function runMigrations() {
  try {
    logger.info('Running database migrations...');

    const migrationFiles = [
      '001_initial_schema.sql',
    ];

    for (const file of migrationFiles) {
      const migrationPath = join(__dirname, 'migrations', file);
      const migrationSQL = readFileSync(migrationPath, 'utf-8');
      
      logger.info(`Running migration: ${file}`);
      await query(migrationSQL);
      logger.info(`Completed migration: ${file}`);
    }

    logger.info('All migrations completed successfully');
    process.exit(0);
  } catch (error) {
    logger.error('Migration failed', error);
    process.exit(1);
  }
}

runMigrations();

