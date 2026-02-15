import { logger } from '../../utils/logger';

export class VercelIntegration {
  private apiToken: string | null = null;

  authenticate(token: string) {
    this.apiToken = token;
  }

  async getDeploymentConfig(projectId: string): Promise<any> {
    if (!this.apiToken) {
      throw new Error('Vercel not authenticated');
    }

    try {
      const response = await fetch(`https://api.vercel.com/v9/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Vercel API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      logger.error('Failed to get Vercel deployment config', error);
      throw error;
    }
  }

  async getEnvironmentVariables(projectId: string): Promise<any[]> {
    if (!this.apiToken) {
      throw new Error('Vercel not authenticated');
    }

    try {
      const response = await fetch(`https://api.vercel.com/v9/projects/${projectId}/env`, {
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Vercel API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      logger.error('Failed to get Vercel environment variables', error);
      throw error;
    }
  }

  async createDeploymentHook(projectId: string, webhookUrl: string): Promise<void> {
    if (!this.apiToken) {
      throw new Error('Vercel not authenticated');
    }

    try {
      const response = await fetch(`https://api.vercel.com/v1/integrations/deploy-hooks`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Vive Coders Security',
          url: webhookUrl,
          projectId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Vercel API error: ${response.statusText}`);
      }
    } catch (error) {
      logger.error('Failed to create Vercel deployment hook', error);
      throw error;
    }
  }
}

export const vercelIntegration = new VercelIntegration();











