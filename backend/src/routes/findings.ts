import { Router, Request, Response } from 'express';
import { getFindingsByProjectId, getFindingsByScanId, updateFinding } from '../db/models/Finding';
import { AppError } from '../utils/errors';

const router = Router();

// Get findings for a project
router.get('/project/:projectId', async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const { severity, status } = req.query;

    const findings = await getFindingsByProjectId(projectId, {
      severity: severity as string,
      status: status as string,
    });

    res.json({ findings });
  } catch (error) {
    throw new AppError('Failed to fetch findings', 500);
  }
});

// Get findings for a scan
router.get('/scan/:scanId', async (req: Request, res: Response) => {
  try {
    const { scanId } = req.params;
    const findings = await getFindingsByScanId(scanId);
    res.json({ findings });
  } catch (error) {
    throw new AppError('Failed to fetch findings', 500);
  }
});

// Update finding status
router.patch('/:findingId', async (req: Request, res: Response) => {
  try {
    const { findingId } = req.params;
    const { status, ...updates } = req.body;

    const finding = await updateFinding(findingId, { status, ...updates });
    res.json({ finding });
  } catch (error) {
    throw new AppError('Failed to update finding', 500);
  }
});

export default router;

