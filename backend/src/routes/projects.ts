import { Router, Request, Response } from 'express';
import {
  createProject,
  getProjectsByUserId,
  getProjectById,
  updateProject,
  deleteProject,
} from '../db/models/Project';
import { AppError } from '../utils/errors';

const router = Router();

// Get all projects for user (in real app, get user_id from JWT)
router.get('/', async (req: Request, res: Response) => {
  try {
    const user_id = req.headers['x-user-id'] as string; // Temporary, should use JWT
    if (!user_id) {
      throw new AppError('User ID required', 401);
    }

    const projects = await getProjectsByUserId(user_id);
    res.json({ projects });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to fetch projects', 500);
  }
});

// Get project by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await getProjectById(id);

    if (!project) {
      throw new AppError('Project not found', 404);
    }

    res.json({ project });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to fetch project', 500);
  }
});

// Create project
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, platform, platform_project_id, repository_url, deployment_url, config } = req.body;
    const user_id = req.headers['x-user-id'] as string; // Temporary, should use JWT

    if (!user_id) {
      throw new AppError('User ID required', 401);
    }

    if (!name || !platform) {
      throw new AppError('name and platform are required', 400);
    }

    const project = await createProject({
      user_id,
      name,
      platform,
      platform_project_id,
      repository_url,
      deployment_url,
      config,
    });

    res.status(201).json({ project });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to create project', 500);
  }
});

// Update project
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const project = await updateProject(id, updates);
    res.json({ project });
  } catch (error) {
    throw new AppError('Failed to update project', 500);
  }
});

// Delete project
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteProject(id);
    res.json({ message: 'Project deleted' });
  } catch (error) {
    throw new AppError('Failed to delete project', 500);
  }
});

export default router;

