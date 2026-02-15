import OpenAI from 'openai';
import { logger } from '../../utils/logger';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface Finding {
  rule_id: string;
  severity: string;
  title: string;
  description: string;
  code_snippet?: string;
  file_path: string;
  line_number?: number;
}

export const suggestionService = {
  async generateSuggestion(finding: Finding, codeContext?: string): Promise<string> {
    try {
      const prompt = `You are a security expert. Analyze this security finding and provide a clear, actionable suggestion to fix it.

Finding:
- Rule: ${finding.rule_id}
- Severity: ${finding.severity}
- Title: ${finding.title}
- Description: ${finding.description}
${finding.code_snippet ? `- Code:\n\`\`\`\n${finding.code_snippet}\n\`\`\`` : ''}
${codeContext ? `- Context:\n\`\`\`\n${codeContext}\n\`\`\`` : ''}

Provide a concise suggestion (2-3 sentences) on how to fix this security issue. Focus on practical, implementable solutions.`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are a security expert providing actionable security fix suggestions for developers.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 200,
        temperature: 0.3,
      });

      return response.choices[0]?.message?.content || 'Unable to generate suggestion';
    } catch (error) {
      logger.error('Failed to generate AI suggestion', error);
      return 'Unable to generate suggestion at this time. Please review the security finding manually.';
    }
  },

  async explainIssue(finding: Finding, codeContext?: string): Promise<string> {
    try {
      const prompt = `Explain why this security issue is risky and what could happen if it's not fixed.

Finding:
- Rule: ${finding.rule_id}
- Severity: ${finding.severity}
- Title: ${finding.title}
- Description: ${finding.description}
${finding.code_snippet ? `- Code:\n\`\`\`\n${finding.code_snippet}\n\`\`\`` : ''}
${codeContext ? `- Context:\n\`\`\`\n${codeContext}\n\`\`\`` : ''}

Provide a clear explanation (3-4 sentences) of why this is a security risk and what potential attacks or issues could occur.`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are a security expert explaining security vulnerabilities to developers.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 300,
        temperature: 0.3,
      });

      return response.choices[0]?.message?.content || 'Unable to generate explanation';
    } catch (error) {
      logger.error('Failed to generate AI explanation', error);
      return 'Unable to generate explanation at this time.';
    }
  },
};











