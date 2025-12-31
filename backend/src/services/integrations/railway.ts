import { logger } from '../../utils/logger';

export class RailwayIntegration {
  private apiToken: string | null = null;

  authenticate(token: string) {
    this.apiToken = token;
  }

  async getProject(projectId: string): Promise<any> {
    if (!this.apiToken) {
      throw new Error('Railway not authenticated');
    }

    try {
      const response = await fetch(`https://api.railway.app/v1/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Railway API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      logger.error('Failed to get Railway project', error);
      throw error;
    }
  }

  async getEnvironmentVariables(projectId: string): Promise<any[]> {
    if (!this.apiToken) {
      throw new Error('Railway not authenticated');
    }

    try {
      const response = await fetch(`https://api.railway.app/v1/projects/${projectId}/variables`, {
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Railway API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      logger.error('Failed to get Railway environment variables', error);
      throw error;
    }
  }

  async createWebhook(projectId: string, webhookUrl: string): Promise<void> {
    if (!this.apiToken) {
      throw new Error('Railway not authenticated');
    }

    try {
      const response = await fetch(`https://api.railway.app/v1/projects/${projectId}/webhooks`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: webhookUrl,
          events: ['deployment.created', 'deployment.updated'],
        }),
      });

      if (!response.ok) {
        throw new Error(`Railway API error: ${response.statusText}`);
      }
    } catch (error) {
      logger.error('Failed to create Railway webhook', error);
      throw error;
    }
  }
}

export const railwayIntegration = new RailwayIntegration();

