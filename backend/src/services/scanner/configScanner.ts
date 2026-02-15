interface ConfigFinding {
  file_path: string;
  line_number?: number;
  rule_id: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  title: string;
  description: string;
  code_snippet?: string;
}

interface ConfigRule {
  id: string;
  check: (config: any) => ConfigFinding[];
}

const configRules: ConfigRule[] = [
  {
    id: 'vercel-env-exposed',
    check: (config: any) => {
      const findings: ConfigFinding[] = [];
      if (config.env && typeof config.env === 'object') {
        // Check if sensitive env vars are exposed
        const sensitiveKeys = ['SECRET', 'KEY', 'TOKEN', 'PASSWORD', 'API_KEY'];
        for (const [key, value] of Object.entries(config.env)) {
          if (sensitiveKeys.some(sk => key.toUpperCase().includes(sk))) {
            findings.push({
              file_path: 'vercel.json',
              rule_id: 'vercel-env-exposed',
              severity: 'high',
              title: 'Sensitive Environment Variable in Config',
              description: `Environment variable "${key}" should be set in Vercel dashboard, not in vercel.json`,
            });
          }
        }
      }
      return findings;
    },
  },
  {
    id: 'vercel-cors-misconfigured',
    check: (config: any) => {
      const findings: ConfigFinding[] = [];
      if (config.headers) {
        const corsHeader = config.headers.find((h: any) => 
          h.source === '*' || h.headers?.['Access-Control-Allow-Origin'] === '*'
        );
        if (corsHeader) {
          findings.push({
            file_path: 'vercel.json',
            rule_id: 'vercel-cors-misconfigured',
            severity: 'medium',
            title: 'Overly Permissive CORS Configuration',
            description: 'CORS allowing all origins (*) can expose your API to unauthorized requests',
          });
        }
      }
      return findings;
    },
  },
  {
    id: 'railway-env-in-code',
    check: (config: any) => {
      const findings: ConfigFinding[] = [];
      if (config.variables && typeof config.variables === 'object') {
        findings.push({
          file_path: 'railway.json',
          rule_id: 'railway-env-in-code',
          severity: 'high',
          title: 'Environment Variables in Config File',
          description: 'Environment variables should be set in Railway dashboard, not committed to code',
        });
      }
      return findings;
    },
  },
  {
    id: 'missing-security-headers',
    check: (config: any) => {
      const findings: ConfigFinding[] = [];
      if (!config.headers || !Array.isArray(config.headers)) {
        findings.push({
          file_path: 'vercel.json',
          rule_id: 'missing-security-headers',
          severity: 'medium',
          title: 'Missing Security Headers',
          description: 'Consider adding security headers like X-Frame-Options, X-Content-Type-Options, etc.',
        });
      }
      return findings;
    },
  },
];

export const configScanner = {
  scan(config: any, configType: 'vercel' | 'railway' | 'replit' = 'vercel'): ConfigFinding[] {
    const findings: ConfigFinding[] = [];

    for (const rule of configRules) {
      // Filter rules by config type if needed
      if (configType === 'vercel' && !rule.id.includes('vercel') && !rule.id.includes('security')) {
        continue;
      }
      if (configType === 'railway' && !rule.id.includes('railway')) {
        continue;
      }

      const ruleFindings = rule.check(config);
      findings.push(...ruleFindings);
    }

    return findings;
  },

  scanVercelConfig(config: any): ConfigFinding[] {
    return this.scan(config, 'vercel');
  },

  scanRailwayConfig(config: any): ConfigFinding[] {
    return this.scan(config, 'railway');
  },

  scanReplitConfig(config: any): ConfigFinding[] {
    return this.scan(config, 'replit');
  },
};











