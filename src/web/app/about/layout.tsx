import { getCampaignConfig } from '../lib/utils';

const campaign = getCampaignConfig();

export const metadata = {
  title: `About ${campaign.candidateName} | ${campaign.position} Candidate`,
  description: `Learn about ${campaign.candidateName}, candidate for ${campaign.position}. Discover their background, values, and vision for the community.`,
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}