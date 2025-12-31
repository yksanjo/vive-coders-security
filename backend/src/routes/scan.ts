import { Router, Request, Response } from 'express';
import { createScan, updateScan } from '../db/models/Scan';
import { createFinding } from '../db/models/Finding';
import { codeScanner } from '../services/scanner/codeScanner';
import { configScanner } from '../services/scanner/configScanner';
import { dependencyScanner } from '../services/scanner/dependencyScanner';
import { AppError } from '../utils/errors';

const router = Router();

// Scan entire repository
router.post('/', async (req: Request, res: Response) => {
  try {
    const { project_id, scan_type = 'full', files, config } = req.body;

    if (!project_id) {
      throw new AppError('project_id is required', 400);
    }

    // Create scan record
    const scan = await createScan({
      project_id,
      scan_type,
      status: 'running',
      metadata: { files, config },
    });

    // Perform scan based on type
    let findings: any[] = [];

    if (scan_type === 'full' || scan_type === 'code') {
      if (files && Array.isArray(files)) {
        for (const file of files) {
          const fileFindings = codeScanner.scanFile(file.path, file.content);
          findings.push(...fileFindings);
        }
      }
    }

    if (scan_type === 'full' || scan_type === 'config') {
      if (config) {
        const configType = config.vercel ? 'vercel' : config.railway ? 'railway' : 'vercel';
        const configFindings = configScanner.scan(config, configType);
        findings.push(...configFindings);
      }
    }

    if (scan_type === 'full' || scan_type === 'dependency') {
      // Dependency scanning would require package.json/requirements.txt
      // For now, placeholder
    }

    // Save findings
    for (const finding of findings) {
      await createFinding({
        scan_id: scan.id,
        project_id,
        ...finding,
      });
    }

    // Update scan status
    await updateScan(scan.id, {
      status: 'completed',
      files_scanned: files?.length || 0,
      findings_count: findings.length,
      completed_at: new Date(),
    });

    res.json({
      scan_id: scan.id,
      findings_count: findings.length,
      findings,
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to perform scan', 500);
  }
});

// Scan single file
router.post('/file', async (req: Request, res: Response) => {
  try {
    const { file_path, content, project_id } = req.body;

    if (!file_path || !content) {
      throw new AppError('file_path and content are required', 400);
    }

    const findings = await codeScanner.scanFile(file_path, content);

    res.json({
      file_path,
      findings_count: findings.length,
      findings,
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to scan file', 500);
  }
});

export default router;

