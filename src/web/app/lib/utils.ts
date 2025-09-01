/**
 * Utility functions for the campaign website
 */

/**
 * Get the base path for the application
 */
export function getBasePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH || '';
}

/**
 * Prepend the base path to a public asset URL
 * This ensures that public assets work correctly with GitHub Pages
 */
export function assetUrl(path: string): string {
  const basePath = getBasePath();
  // Ensure the path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}

/**
 * Get campaign configuration from environment variables
 */
export function getCampaignConfig() {
  return {
    candidateName: process.env.NEXT_PUBLIC_CANDIDATE_NAME || '[CANDIDATE_NAME]',
    position: process.env.NEXT_PUBLIC_CANDIDATE_POSITION || '[CANDIDATE_POSITION]',
    electionYear: process.env.NEXT_PUBLIC_CANDIDATE_ELECTION_YEAR || '[ELECTION_YEAR]',
    party: process.env.NEXT_PUBLIC_CANDIDATE_PARTY || '[PARTY]',
    slogan: process.env.NEXT_PUBLIC_CAMPAIGN_SLOGAN || '[CAMPAIGN_SLOGAN]',
    email: process.env.NEXT_PUBLIC_CAMPAIGN_EMAIL || '[CAMPAIGN_EMAIL]',
    phone: process.env.NEXT_PUBLIC_CAMPAIGN_PHONE || '[CAMPAIGN_PHONE]',
    address: process.env.NEXT_PUBLIC_CAMPAIGN_ADDRESS || '[CAMPAIGN_ADDRESS]',
    city: process.env.NEXT_PUBLIC_CAMPAIGN_CITY || '[CAMPAIGN_CITY]',
    state: process.env.NEXT_PUBLIC_CAMPAIGN_STATE || '[CAMPAIGN_STATE]',
    zip: process.env.NEXT_PUBLIC_CAMPAIGN_ZIP || '[CAMPAIGN_ZIP]',
    officeHours: process.env.NEXT_PUBLIC_CAMPAIGN_OFFICE_HOURS || '[OFFICE_HOURS]',
    domain: process.env.NEXT_PUBLIC_CAMPAIGN_DOMAIN || '[CAMPAIGN_DOMAIN]',
    social: {
      twitter: process.env.NEXT_PUBLIC_TWITTER_HANDLE || '[TWITTER_HANDLE]',
      facebook: process.env.NEXT_PUBLIC_FACEBOOK_PAGE || '[FACEBOOK_PAGE]',
      instagram: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || '[INSTAGRAM_HANDLE]',
      youtube: process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL || '[YOUTUBE_CHANNEL]',
    },
  };
}