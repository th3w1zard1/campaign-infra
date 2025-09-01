'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BackgroundDecorator } from './BackgroundDecorator';
import { getCampaignConfig } from '../lib/utils';

interface HeroProps {
  className?: string;
}

const Hero = ({ className = '' }: HeroProps) => {
  const campaign = getCampaignConfig();
  
  return (
    <div className={`hero-section ${className}`}>
      {/* Background decorative elements */}
      <BackgroundDecorator />

      <div className="container-custom py-24 md:py-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12 text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 font-display">
              <span className="text-white">Vote</span>{' '}
              <span className="text-white text-6xl md:text-7xl lg:text-8xl block font-black tracking-tight">
                {campaign.candidateName}
              </span>
            </h1>
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-secondary-200">
              {campaign.position}
            </div>
            <div className="text-xl md:text-2xl font-semibold text-secondary-300 mb-8">
              {campaign.electionYear}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/platform"
                className="btn-secondary text-lg px-8 py-4 bg-secondary-500 hover:bg-secondary-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                View Platform
              </Link>
              <Link
                href="/get-involved"
                className="btn-outline text-lg px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Get Involved
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/candidate-profile.jpg`}
                alt={`${campaign.candidateName}, Candidate for ${campaign.position}`}
                fill
                style={{ objectFit: 'cover' }}
                priority
                className="transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
          <path
            fill="hsl(var(--background))"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;