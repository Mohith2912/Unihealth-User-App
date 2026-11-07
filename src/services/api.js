import { apiPath } from '../config/environment';

export async function getServiceHealth() {
  const response = await fetch(apiPath('/api/health'), {
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) throw new Error('Service is unavailable.');
  return response.json();
}

// Patient authentication and PHI endpoints deliberately remain server-owned.
// Add an authenticated API endpoint before connecting a patient workflow.
