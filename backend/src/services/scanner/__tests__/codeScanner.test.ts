import { codeScanner } from '../codeScanner';

describe('codeScanner', () => {
  describe('scanFile', () => {
    it('should detect exposed environment variables', () => {
      const content = `const apiKey = process.env.API_KEY;
console.log(apiKey);`;

      const findings = codeScanner.scanFile('test.js', content);
      expect(findings.length).toBeGreaterThan(0);
      expect(findings.some(f => f.rule_id === 'exposed-env-var')).toBe(true);
    });

    it('should detect hardcoded secrets', () => {
      const content = `const apiKey = "sk_live_1234567890abcdef";`;

      const findings = codeScanner.scanFile('test.js', content);
      expect(findings.some(f => f.rule_id === 'hardcoded-secret')).toBe(true);
    });

    it('should detect SQL injection patterns', () => {
      const content = `const query = "SELECT * FROM users WHERE id = " + userId;`;

      const findings = codeScanner.scanFile('test.js', content);
      expect(findings.some(f => f.rule_id === 'sql-injection')).toBe(true);
    });

    it('should detect eval usage', () => {
      const content = `eval(userInput);`;

      const findings = codeScanner.scanFile('test.js', content);
      expect(findings.some(f => f.rule_id === 'eval-usage')).toBe(true);
    });

    it('should return empty array for safe code', () => {
      const content = `const x = 1;
const y = 2;
console.log(x + y);`;

      const findings = codeScanner.scanFile('test.js', content);
      expect(findings.length).toBe(0);
    });
  });

  describe('shouldScanFile', () => {
    it('should return true for JavaScript files', () => {
      expect(codeScanner.shouldScanFile('test.js')).toBe(true);
      expect(codeScanner.shouldScanFile('test.ts')).toBe(true);
      expect(codeScanner.shouldScanFile('test.jsx')).toBe(true);
      expect(codeScanner.shouldScanFile('test.tsx')).toBe(true);
    });

    it('should return false for non-code files', () => {
      expect(codeScanner.shouldScanFile('test.txt')).toBe(false);
      expect(codeScanner.shouldScanFile('test.md')).toBe(false);
    });
  });
});

