import { logger } from '../../utils/logger';

export class ReplitIntegration {
  private apiKey: string | null = null;

  authenticate(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getRepl(replId: string): Promise<any> {
    if (!this.apiKey) {
      throw new Error('Replit not authenticated');
    }

    try {
      const response = await fetch(`https://api.replit.com/v1/repls/${replId}`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Replit API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      logger.error('Failed to get Replit repl', error);
      throw error;
    }
  }

  async getReplFiles(replId: string, path: string = ''): Promise<Array<{ path: string; content: string }>> {
    if (!this.apiKey) {
      throw new Error('Replit not authenticated');
    }

    try {
      const response = await fetch(`https://api.replit.com/v1/repls/${replId}/files/${path}`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Replit API error: ${response.statusText}`);
      }

      const data = await response.json();
      // Replit API structure may vary, adjust based on actual API
      return [];
    } catch (error) {
      logger.error('Failed to get Replit files', error);
      throw error;
    }
  }
}

export const replitIntegration = new ReplitIntegration();

