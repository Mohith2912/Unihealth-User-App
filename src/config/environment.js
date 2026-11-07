// Public runtime configuration only. Never place API keys, private URLs, or
// credentials in this file. Set EXPO_PUBLIC_API_URL per deployment instead.
export const API_URL = (process.env.EXPO_PUBLIC_API_URL || '').replace(/\/$/, '');

export const apiPath = path => API_URL ? `${API_URL}${path}` : path;
