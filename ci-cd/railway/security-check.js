/**
 * Railway Webhook Handler for Security Checks
 * Set this as a webhook in Railway project settings
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

  return res.status(200).json({
    success: true,
    findings: data.findings || [],
    message: `Found ${data.findings?.length || 0} security issue(s)`,
  });
}

