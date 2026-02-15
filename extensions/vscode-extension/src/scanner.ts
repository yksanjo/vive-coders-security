import axios from 'axios';
import * as vscode from 'vscode';

interface Finding {
  file_path: string;
  line_number: number;
  rule_id: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  title: string;
  description: string;
  code_snippet: string;
}

export const scanner = {
  async scanFile(filePath: string, content: string): Promise<Finding[]> {
    const config = vscode.workspace.getConfiguration('viveCodersSecurity');
    const apiUrl = config.get<string>('apiUrl', 'http://localhost:3001');

    try {
      const response = await axios.post(`${apiUrl}/api/scan/file`, {
        file_path: filePath,
        content,
      });

      return response.data.findings || [];
    } catch (error) {
      console.error('Failed to scan file', error);
      // Fallback to local scanning if API is unavailable
      return this.localScan(filePath, content);
    }
  },

  localScan(filePath: string, content: string): Finding[] {
    // Basic local scanning patterns
    const findings: Finding[] = [];
    const lines = content.split('\n');

    // Check for process.env usage
    const envVarPattern = /process\.env\.\w+/g;
    let match;
    while ((match = envVarPattern.exec(content)) !== null) {
      const lineNumber = content.substring(0, match.index).split('\n').length;
      findings.push({
        file_path: filePath,
        line_number: lineNumber,
        rule_id: 'exposed-env-var',
        severity: 'high',
        title: 'Exposed Environment Variable',
        description: 'Environment variables should not be exposed in client-side code',
        code_snippet: lines[lineNumber - 1] || '',
      });
    }

    return findings;
  },

  shouldScanFile(filePath: string): boolean {
    const extensions = ['.js', '.ts', '.jsx', '.tsx', '.py', '.java', '.go', '.rs', '.php'];
    const ext = filePath.substring(filePath.lastIndexOf('.'));
    return extensions.includes(ext);
  },
};











