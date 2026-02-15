import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { logger } from './utils/logger';
import { errorHandler } from './utils/errors';

// Routes
import scanRoutes from './routes/scan';
import findingsRoutes from './routes/findings';
import projectsRoutes from './routes/projects';
import integrationsRoutes from './routes/integrations';
import aiRoutes from './routes/ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/scan', scanRoutes);
app.use('/api/findings', findingsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/integrations', integrationsRoutes);
app.use('/api/ai', aiRoutes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

export default app;











