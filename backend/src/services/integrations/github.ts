import { Octokit } from '@octokit/rest';
import { logger } from '../../utils/logger';

export class GitHubIntegration {
  private octokit: Octokit | null = null;

  authenticate(token: string) {
    this.octokit = new Octokit({ auth: token });
  }

  async getRepositoryFiles(owner: string, repo: string, path: string = ''): Promise<Array<{ path: string; content: string }>> {
    if (!this.octokit) {
      throw new Error('GitHub not authenticated');
    }

    try {
      const { data } = await this.octokit.repos.getContent({
        owner,
        repo,
        path,
      });

      const files: Array<{ path: string; content: string }> = [];

      if (Array.isArray(data)) {
        for (const item of data) {
          if (item.type === 'file') {
            const fileContent = await this.octokit.repos.getContent({
              owner,
              repo,
              path: item.path,
            });

            if ('content' in fileContent.data && fileContent.data.content) {
              const content = Buffer.from(fileContent.data.content, 'base64').toString('utf-8');
              files.push({
                path: item.path,
                content,
              });
            }
          } else if (item.type === 'dir') {
            // Recursively get files from subdirectories
            const subFiles = await this.getRepositoryFiles(owner, repo, item.path);
            files.push(...subFiles);
          }
        }
      }

      return files;
    } catch (error) {
      logger.error('Failed to get repository files', error);
      throw error;
    }
  }

  async createPRComment(owner: string, repo: string, prNumber: number, comment: string): Promise<void> {
    if (!this.octokit) {
      throw new Error('GitHub not authenticated');
    }

    try {
      await this.octokit.issues.createComment({
        owner,
        repo,
        issue_number: prNumber,
        body: comment,
      });
    } catch (error) {
      logger.error('Failed to create PR comment', error);
      throw error;
    }
  }

  async getPRFiles(owner: string, repo: string, prNumber: number): Promise<Array<{ path: string; content: string }>> {
    if (!this.octokit) {
      throw new Error('GitHub not authenticated');
    }

    try {
      const { data: pr } = await this.octokit.pulls.get({
        owner,
        repo,
        pull_number: prNumber,
      });

      const { data: files } = await this.octokit.pulls.listFiles({
        owner,
        repo,
        pull_number: prNumber,
      });

      const fileContents: Array<{ path: string; content: string }> = [];

      for (const file of files) {
        if (file.status === 'removed') continue;

        try {
          const { data: contentData } = await this.octokit.repos.getContent({
            owner,
            repo,
            path: file.filename,
            ref: pr.head.sha,
          });

          if ('content' in contentData && contentData.content) {
            const content = Buffer.from(contentData.content, 'base64').toString('utf-8');
            fileContents.push({
              path: file.filename,
              content,
            });
          }
        } catch (error) {
          logger.warn(`Failed to get content for file ${file.filename}`, error);
        }
      }

      return fileContents;
    } catch (error) {
      logger.error('Failed to get PR files', error);
      throw error;
    }
  }
}

export const githubIntegration = new GitHubIntegration();











