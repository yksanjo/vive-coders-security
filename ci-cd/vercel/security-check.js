/**
 * Vercel Serverless Function for Security Checks
 * Deploy this as a Vercel Function
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { deployment } = req.body;

  // Call Vive Coders Security API
  const response = await fetch(`${process.env.VIVE_CODERS_SECURITY_API_URL}/api/scan`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.VIVE_CODERS_SECURITY_API_KEY}`,
    },
    body: JSON.stringify({
      project_id: deployment.projectId,
      scan_type: 'full',
      config: deployment.config,
    }),
  });

  const data = await response.json();

  if (data.findings && data.findings.length > 0) {
    const criticalFindings = data.findings.filter((f) => f.severity === 'critical');
    if (criticalFindings.length > 0) {
      return res.status(400).json({
        error: 'Critical security issues found',
        findings: criticalFindings,
      });
    }
  }

  return res.status(200).json({ success: true, findings: data.findings || [] });
}

