import { Router, Request, Response } from 'express';
import { suggestionService } from '../services/ai/suggestionService';
import { fixGenerator } from '../services/ai/fixGenerator';
import { AppError } from '../utils/errors';

const router = Router();

// Get AI suggestion for a finding
router.post('/suggest', async (req: Request, res: Response) => {
  try {
    const { finding, code_context } = req.body;

    if (!finding) {
      throw new AppError('finding is required', 400);
    }

    const suggestion = await suggestionService.generateSuggestion(finding, code_context);
    res.json({ suggestion });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to generate suggestion', 500);
  }
});

// Generate fix code
router.post('/fix', async (req: Request, res: Response) => {
  try {
    const { finding, code_context, original_code } = req.body;

    if (!finding || !original_code) {
      throw new AppError('finding and original_code are required', 400);
    }

    const fix = await fixGenerator.generateFix(finding, original_code, code_context);
    res.json({ fix });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to generate fix', 500);
  }
});

// Explain security issue
router.post('/explain', async (req: Request, res: Response) => {
  try {
    const { finding, code_context } = req.body;

    if (!finding) {
      throw new AppError('finding is required', 400);
    }

    const explanation = await suggestionService.explainIssue(finding, code_context);
    res.json({ explanation });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to generate explanation', 500);
  }
});

export default router;











