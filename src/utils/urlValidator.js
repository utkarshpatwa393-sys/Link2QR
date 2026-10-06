/**
 * Validates a user-entered URL for QR code generation.
 * Handles HTTP, HTTPS, paths, query parameters, hashes, and domains.
 * Returns an object with { isValid: boolean, error: string | null, url: string }
 */
export function validateUrl(rawInput) {
  if (!rawInput || typeof rawInput !== 'string') {
    return {
      isValid: false,
      error: 'Please enter a link first.',
      url: ''
    };
  }

  const trimmed = rawInput.trim();

  if (trimmed.length === 0) {
    return {
      isValid: false,
      error: 'Please enter a link first.',
      url: ''
    };
  }

  // Check standard URL parsing
  try {
    const parsed = new URL(trimmed);

    // Require HTTP or HTTPS protocol
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return {
        isValid: false,
        error: 'Please enter a valid URL.',
        url: trimmed
      };
    }

    // Hostname check
    const hostname = parsed.hostname;
    if (!hostname || hostname.length === 0) {
      return {
        isValid: false,
        error: 'Please enter a valid URL.',
        url: trimmed
      };
    }

    // Must be either localhost or have a valid domain structure (with dots and valid characters)
    if (hostname !== 'localhost') {
      // Must contain at least one dot (e.g. google.com) and no spaces/invalid characters
      if (!hostname.includes('.')) {
        return {
          isValid: false,
          error: 'Please enter a valid URL.',
          url: trimmed
        };
      }

      // Valid domain regex (RFC 1035 / standard hostnames or IP addresses)
      const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
      const ipRegex = /^(?:\d{1,3}\.){3}\d{1,3}$/;

      if (!domainRegex.test(hostname) && !ipRegex.test(hostname)) {
        return {
          isValid: false,
          error: 'Please enter a valid URL.',
          url: trimmed
        };
      }
    }

    return {
      isValid: true,
      error: null,
      url: trimmed
    };
  } catch {
    return {
      isValid: false,
      error: 'Please enter a valid URL.',
      url: trimmed
    };
  }
}

/**
 * Format URL for clean UI display (shortened with ellipsis if very long)
 */
export function formatDisplayUrl(url, maxLength = 45) {
  if (!url) return '';
  if (url.length <= maxLength) return url;
  return url.substring(0, maxLength - 3) + '...';
}
