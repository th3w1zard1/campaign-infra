'use client';

import { useState } from 'react';
import Link from 'next/link';
import NewsletterSignup from '../components/NewsletterSignup';
import { getCampaignConfig } from '../lib/utils';

type FAQ = {
  question: string;
  answer: string;
};

type FAQCategories = {
  campaign: FAQ[];
  platform: FAQ[];
  involvement: FAQ[];
  contact: FAQ[];
  [key: string]: FAQ[];
};

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState<string>('campaign');
  const campaign = getCampaignConfig();

  const faqs: FAQCategories = {
    campaign: [
      {
        question: `What position is ${campaign.candidateName} running for?`,
        answer: `${campaign.candidateName} is running for ${campaign.position}. They're campaigning to represent the community and bring effective leadership to local government.`
      },
      {
        question: "When is the election?",
        answer: "The election will be held on [ELECTION_DATE]. Early voting will be available starting [EARLY_VOTING_START]. We encourage all supporters to make a plan to vote early if possible."
      },
      {
        question: "How is the campaign funded?",
        answer: `${campaign.candidateName}'s campaign is funded entirely through grassroots donations from individuals who believe in their vision. They do not accept corporate PAC money or donations from special interest groups that don't align with their values.`
      },
      {
        question: `Does ${campaign.candidateName} have prior political experience?`,
        answer: `Yes, ${campaign.candidateName} currently serves as [CURRENT_ROLES] and has extensive experience in [RELEVANT_EXPERIENCE]. They also have experience in [OTHER_EXPERIENCE].`
      },
      {
        question: `Which party is ${campaign.candidateName} affiliated with?`,
        answer: `${campaign.candidateName} is running as ${campaign.party}. They are actively involved with [PARTY_INVOLVEMENT].`
      }
    ],
    platform: [
      {
        question: `What are ${campaign.candidateName}'s top priorities if elected?`,
        answer: `${campaign.candidateName}'s top priorities include [PRIORITY_1], [PRIORITY_2], [PRIORITY_3], and [OTHER_KEY_PRIORITIES]. They are committed to [OVERALL_VISION] for the community.`
      },
      {
        question: `How does ${campaign.candidateName} plan to address [KEY_ISSUE]?`,
        answer: `${campaign.candidateName} plans to address [KEY_ISSUE] through [APPROACH]. This includes [SPECIFIC_STRATEGY_1], [SPECIFIC_STRATEGY_2], and [IMPLEMENTATION_PLAN].`
      },
      {
        question: `What experience does ${campaign.candidateName} have with [RELEVANT_AREA]?`,
        answer: `${campaign.candidateName} has [YEARS/TYPE] experience in [RELEVANT_AREA]. They have [SPECIFIC_ACHIEVEMENTS] and [RELEVANT_BACKGROUND].`
      },
      {
        question: `How will ${campaign.candidateName}'s [POLICY_AREA] proposal work?`,
        answer: `${campaign.candidateName}'s [POLICY_AREA] proposal includes [DETAILS]. It also includes [SUPPORT_MEASURES] specifically designed to [INTENDED_OUTCOME].`
      },
      {
        question: `What is ${campaign.candidateName}'s stance on [KEY_POLICY_AREA]?`,
        answer: `${campaign.candidateName} supports [POLICY_STANCE] that includes [APPROACH_1], [APPROACH_2], and [APPROACH_3]. They believe in [PHILOSOPHY] through [IMPLEMENTATION_METHODS].`
      }
    ],
    involvement: [
      {
        question: "How can I volunteer for the campaign?",
        answer: "You can volunteer by visiting our Volunteer page and filling out the form. We need help with canvassing, phone banking, event organizing, social media, and more. No experience necessary – we'll provide all the training you need!"
      },
      {
        question: "Can I make a donation to the campaign?",
        answer: "Yes! Donations of any size are greatly appreciated and help fund our grassroots campaign. You can donate through our secure donation page. All donations are subject to campaign finance limits and reporting requirements."
      },
      {
        question: "I have expertise in a specific area (like healthcare, education, etc.). Can I help shape policy?",
        answer: "Absolutely! We welcome policy input from experts in all fields. Please contact us through our Contact page and mention your area of expertise. We'll connect you with the appropriate policy team."
      },
      {
        question: "Can high school or college students get involved?",
        answer: "Yes! We have a vibrant youth outreach program and offer internship opportunities for students. It's a great way to learn about local politics and make a difference in your community."
      },
      {
        question: `How can I host a house party or fundraiser for ${campaign.candidateName}?`,
        answer: "We would be thrilled to have you host an event! Please fill out the form on our Events page or contact our events coordinator directly at events@[CAMPAIGN_DOMAIN] to discuss details and get support from our team."
      }
    ],
    contact: [
      {
        question: "How can I contact the campaign directly?",
        answer: `You can reach us through our Contact page form, by email at ${campaign.email}, or by phone at ${campaign.phone}. Our campaign office is located at ${campaign.address}, ${campaign.city}, ${campaign.state} and is open ${campaign.officeHours}.`
      },
      {
        question: `Does ${campaign.candidateName} do interviews or speaking engagements?`,
        answer: `Yes, ${campaign.candidateName} is available for interviews, forums, debates, and speaking engagements as their schedule permits. Please contact our communications team at ${campaign.email} with your request and details.`
      },
      {
        question: "How can local businesses indicate their support?",
        answer: "Local businesses can show their support by contacting our campaign directly through our Contact page. We also welcome opportunities to visit your business and meet with employees to discuss our platform."
      },
      {
        question: `I have an issue in my neighborhood I'd like ${campaign.candidateName} to know about. How can I share it?`,
        answer: `${campaign.candidateName} wants to hear about the issues that matter to you! Please use our Contact form to describe the issue, or attend one of our community listening sessions which are held regularly in different neighborhoods.`
      },
      {
        question: "How can I stay updated on campaign news and events?",
        answer: "The best way to stay updated is to sign up for our newsletter at the bottom of this page. You can also follow us on social media platforms including Facebook, Twitter, and Instagram."
      }
    ]
  };

  return (
    <>
      <section className="py-16 md:py-24 bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-blue-100">
              Find answers to common questions about {campaign.candidateName}&apos;s campaign, platform, and how you can get involved.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex -mb-px" aria-label="Tabs">
              {Object.keys(faqs).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-lg ${activeTab === tab
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="space-y-8">
            {faqs[activeTab].map((faq: FAQ, index: number) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Don&apos;t see your question answered here?</p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </>
  );
} 