/**
 * Validates that a URL is safe for external navigation (http or https only).
 * Rejects javascript:, data:, and other non-http(s) protocols to prevent XSS.
 */
export function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
}
