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

interface FixResult {
  fixed_code: string;
  explanation: string;
  changes: string[];
}

export const fixGenerator = {
  async generateFix(
    finding: Finding,
    originalCode: string,
    codeContext?: string
  ): Promise<FixResult> {
    try {
      const prompt = `You are a security expert. Fix this security vulnerability in the code.

Finding:
- Rule: ${finding.rule_id}
- Severity: ${finding.severity}
- Title: ${finding.title}
- Description: ${finding.description}
${finding.code_snippet ? `- Vulnerable Code:\n\`\`\`\n${finding.code_snippet}\n\`\`\`` : ''}

Original Code:
\`\`\`
${originalCode}
\`\`\`
${codeContext ? `\nContext:\n\`\`\`\n${codeContext}\n\`\`\`` : ''}

Provide the fixed code that addresses the security issue. Return ONLY the fixed code block, no explanations. Make minimal changes to preserve functionality.`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are a security expert fixing code vulnerabilities. Return only the fixed code, no markdown formatting or explanations.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 1000,
        temperature: 0.2,
      });

      const fixedCode = response.choices[0]?.message?.content?.trim() || originalCode;

      // Extract explanation
      const explanationPrompt = `Briefly explain what was changed to fix the security issue (1-2 sentences).`;
      const explanationResponse = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are a security expert explaining code fixes.',
          },
          {
            role: 'user',
            content: explanationPrompt,
          },
        ],
        max_tokens: 100,
        temperature: 0.3,
      });

      const explanation = explanationResponse.choices[0]?.message?.content || 'Security issue fixed';

      return {
        fixed_code: fixedCode,
        explanation,
        changes: this.detectChanges(originalCode, fixedCode),
      };
    } catch (error) {
      logger.error('Failed to generate AI fix', error);
      return {
        fixed_code: originalCode,
        explanation: 'Unable to generate fix at this time. Please review the security finding manually.',
        changes: [],
      };
    }
  },

  detectChanges(original: string, fixed: string): string[] {
    const changes: string[] = [];
    const originalLines = original.split('\n');
    const fixedLines = fixed.split('\n');

    // Simple diff detection
    for (let i = 0; i < Math.max(originalLines.length, fixedLines.length); i++) {
      if (originalLines[i] !== fixedLines[i]) {
        if (originalLines[i] && fixedLines[i]) {
          changes.push(`Line ${i + 1}: Modified`);
        } else if (!originalLines[i]) {
          changes.push(`Line ${i + 1}: Added`);
        } else {
          changes.push(`Line ${i + 1}: Removed`);
        }
      }
    }

    return changes;
  },
};

