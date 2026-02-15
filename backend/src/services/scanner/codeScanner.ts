interface Finding {
  file_path: string;
  line_number: number;
  column_number?: number;
  rule_id: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  title: string;
  description: string;
  code_snippet: string;
}

interface SecurityRule {
  id: string;
  pattern: RegExp;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  title: string;
  description: string;
}

const securityRules: SecurityRule[] = [
  // Exposed environment variables
  {
    id: 'exposed-env-var',
    pattern: /process\.env\.\w+|process\.env\[['"]\w+['"]\]/g,
    severity: 'high',
    title: 'Exposed Environment Variable',
    description: 'Environment variables should not be exposed in client-side code or committed to repositories',
  },
  // Hardcoded secrets
  {
    id: 'hardcoded-secret',
    pattern: /(api[_-]?key|secret|password|token|auth[_-]?token)\s*[:=]\s*['"]([^'"]{10,})['"]/gi,
    severity: 'critical',
    title: 'Hardcoded Secret',
    description: 'Secrets should never be hardcoded in source code. Use environment variables or secret management.',
  },
  // SQL injection patterns
  {
    id: 'sql-injection',
    pattern: /(query|execute|exec)\s*\([^)]*\+[^)]*['"]/gi,
    severity: 'critical',
    title: 'Potential SQL Injection',
    description: 'String concatenation in SQL queries can lead to SQL injection attacks. Use parameterized queries.',
  },
  // eval() usage
  {
    id: 'eval-usage',
    pattern: /\beval\s*\(/gi,
    severity: 'critical',
    title: 'Use of eval()',
    description: 'eval() can execute arbitrary code and is a security risk. Avoid using eval().',
  },
  // innerHTML with user input
  {
    id: 'xss-innerhtml',
    pattern: /\.innerHTML\s*=\s*[^;]*(req\.|params\.|query\.|body\.)/gi,
    severity: 'high',
    title: 'Potential XSS via innerHTML',
    description: 'Setting innerHTML with user input can lead to XSS attacks. Use textContent or sanitize input.',
  },
  // Missing authentication
  {
    id: 'missing-auth',
    pattern: /(app\.(get|post|put|delete|patch))\s*\([^,]+,\s*(async\s*)?\([^)]*\)\s*=>/gi,
    severity: 'medium',
    title: 'Route Without Authentication',
    description: 'API routes should verify authentication before processing requests.',
  },
  // Weak crypto
  {
    id: 'weak-crypto',
    pattern: /(md5|sha1)\s*\(/gi,
    severity: 'medium',
    title: 'Weak Cryptographic Hash',
    description: 'MD5 and SHA1 are cryptographically broken. Use SHA-256 or stronger algorithms.',
  },
  // Insecure random
  {
    id: 'insecure-random',
    pattern: /Math\.random\s*\(/g,
    severity: 'low',
    title: 'Insecure Random Number Generation',
    description: 'Math.random() is not cryptographically secure. Use crypto.randomBytes() for security-sensitive operations.',
  },
];

export const codeScanner = {
  scanFile(filePath: string, content: string): Finding[] {
    const findings: Finding[] = [];
    const lines = content.split('\n');

    for (const rule of securityRules) {
      const matches = Array.from(content.matchAll(rule.pattern));

      for (const match of matches) {
        if (match.index === undefined) continue;

        // Find line number
        const lineNumber = content.substring(0, match.index).split('\n').length;
        const lineContent = lines[lineNumber - 1] || '';
        const columnNumber = match.index - content.substring(0, match.index).lastIndexOf('\n') - 1;

        // Extract code snippet (3 lines before and after)
        const startLine = Math.max(0, lineNumber - 4);
        const endLine = Math.min(lines.length, lineNumber + 2);
        const codeSnippet = lines.slice(startLine, endLine).join('\n');

        findings.push({
          file_path: filePath,
          line_number: lineNumber,
          column_number: columnNumber,
          rule_id: rule.id,
          severity: rule.severity,
          title: rule.title,
          description: rule.description,
          code_snippet: codeSnippet,
        });
      }
    }

    return findings;
  },

  scanDirectory(files: Array<{ path: string; content: string }>): Finding[] {
    const allFindings: Finding[] = [];

    for (const file of files) {
      // Only scan relevant file types
      if (this.shouldScanFile(file.path)) {
        const findings = this.scanFile(file.path, file.content);
        allFindings.push(...findings);
      }
    }

    return allFindings;
  },

  shouldScanFile(filePath: string): boolean {
    const extensions = ['.js', '.ts', '.jsx', '.tsx', '.py', '.java', '.go', '.rs', '.php'];
    const ext = filePath.substring(filePath.lastIndexOf('.'));
    return extensions.includes(ext);
  },
};











