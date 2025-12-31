interface DependencyFinding {
  package_name: string;
  version: string;
  rule_id: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  title: string;
  description: string;
  recommendation?: string;
}

// Known vulnerable packages (simplified - in production, use npm audit or Snyk API)
const knownVulnerabilities: Record<string, { severity: string; description: string }> = {
  'express': { severity: 'medium', description: 'Some versions have security vulnerabilities' },
  'lodash': { severity: 'high', description: 'Versions < 4.17.21 have prototype pollution vulnerability' },
  'axios': { severity: 'medium', description: 'Some versions have SSRF vulnerability' },
};

export const dependencyScanner = {
  scanPackageJson(packageJson: any): DependencyFinding[] {
    const findings: DependencyFinding[] = [];
    const allDeps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    for (const [packageName, version] of Object.entries(allDeps)) {
      const vuln = knownVulnerabilities[packageName];
      if (vuln) {
        findings.push({
          package_name: packageName,
          version: version as string,
          rule_id: 'vulnerable-dependency',
          severity: vuln.severity as any,
          title: `Vulnerable Dependency: ${packageName}`,
          description: vuln.description,
          recommendation: `Update ${packageName} to the latest secure version`,
        });
      }

      // Check for outdated packages (simplified check)
      if (this.isOutdated(version as string)) {
        findings.push({
          package_name: packageName,
          version: version as string,
          rule_id: 'outdated-dependency',
          severity: 'low',
          title: `Potentially Outdated Package: ${packageName}`,
          description: `Package version ${version} may be outdated. Consider updating to the latest version.`,
          recommendation: `Run: npm update ${packageName}`,
        });
      }
    }

    return findings;
  },

  scanRequirementsTxt(content: string): DependencyFinding[] {
    const findings: DependencyFinding[] = [];
    const lines = content.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      // Parse package==version format
      const match = trimmed.match(/^([^=<>!]+)([=<>!]+)(.+)$/);
      if (match) {
        const packageName = match[1].trim();
        const version = match[3].trim();

        // Check for known vulnerabilities
        const vuln = knownVulnerabilities[packageName];
        if (vuln) {
          findings.push({
            package_name: packageName,
            version,
            rule_id: 'vulnerable-dependency',
            severity: vuln.severity as any,
            title: `Vulnerable Dependency: ${packageName}`,
            description: vuln.description,
            recommendation: `Update ${packageName} to the latest secure version`,
          });
        }
      }
    }

    return findings;
  },

  isOutdated(version: string): boolean {
    // Simplified check - in production, compare with npm registry
    // For now, flag versions with ^ or ~ as potentially outdated
    return version.startsWith('^') || version.startsWith('~') || version === '*';
  },
};

