import { configScanner } from '../configScanner';

describe('configScanner', () => {
  describe('scanVercelConfig', () => {
    it('should detect exposed environment variables in vercel.json', () => {
      const config = {
        env: {
          API_KEY: 'secret123',
          SECRET_TOKEN: 'token456',
        },
      };

      const findings = configScanner.scanVercelConfig(config);
      expect(findings.length).toBeGreaterThan(0);
      expect(findings.some(f => f.rule_id === 'vercel-env-exposed')).toBe(true);
    });

    it('should detect misconfigured CORS', () => {
      const config = {
        headers: [
          {
            source: '*',
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
          },
        ],
      };

      const findings = configScanner.scanVercelConfig(config);
      expect(findings.some(f => f.rule_id === 'vercel-cors-misconfigured')).toBe(true);
    });
  });

  describe('scanRailwayConfig', () => {
    it('should detect environment variables in config', () => {
      const config = {
        variables: {
          API_KEY: 'secret123',
        },
      };

      const findings = configScanner.scanRailwayConfig(config);
      expect(findings.some(f => f.rule_id === 'railway-env-in-code')).toBe(true);
    });
  });
});

