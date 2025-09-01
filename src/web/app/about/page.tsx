'use client';

import Achievements from '../components/Achievements';
import NewsletterSignup from '../components/NewsletterSignup';
import { getCampaignConfig } from '../lib/utils';

export default function AboutPage() {
  const campaign = getCampaignConfig();
  
  return (
    <>
      <section className="page-header">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">
                Meet {campaign.candidateName}
              </h1>
              <p className="text-xl text-primary-100 mb-6">
                A passionate advocate for the community with the experience and vision to lead us forward.
              </p>
              <div className="prose prose-lg max-w-none text-primary-100">
                <p>
                  {/* TODO: Replace with candidate's background story */}
                  For over [X] years, {campaign.candidateName} has been a dedicated public servant and community advocate.
                  From [early career/background] to [current roles], they have consistently worked to improve the lives of residents.
                </p>
                <p>
                  {/* TODO: Replace with candidate's local connection */}
                  [Born and raised / Long-time resident] in [location], {campaign.candidateName} understands the unique challenges and opportunities
                  our community faces. After [educational background], they [returned to/chose to make their home in] [location] to dedicate their career to
                  public service.
                </p>
                <p>
                  {/* TODO: Replace with candidate's current roles and experience */}
                  {campaign.candidateName} currently serves as [current positions/roles] and has experience in [relevant areas].
                  Their hands-on approach to [community work/organizing/leadership] has resulted in [specific achievements].
                </p>
                <p>
                  {/* TODO: Replace with candidate's professional experience */}
                  As a former [previous role] and [other experience], {campaign.candidateName} has [specific achievements and impact].
                  Their [approach/philosophy] to [relevant area] has earned recognition for [specific accomplishments].
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="platform-card">
                <div className="h-96 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center rounded-t-lg">
                  <span className="text-white text-2xl font-bold">{campaign.candidateName}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-foreground">{campaign.candidateName}</h3>
                  <p className="text-primary-campaign font-medium">Candidate for {campaign.position}</p>
                  <ul className="mt-3 text-muted-foreground">
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-campaign" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Precinct Committeeperson, Democratic Party of Lane County
                    </li>
                    <li className="flex items-center mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-campaign" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      DSA Electoral-Legislative Group Steering Committee
                    </li>
                    <li className="flex items-center mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-campaign" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Former Environmental Steward
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title text-center">
              My Vision & Values
            </h2>

            <div className="prose prose-lg max-w-none dark:prose-dark">
              <h3 className="text-foreground">Community First</h3>
              <p className="text-muted-foreground">
                I believe that effective governance starts with listening to the community.
                Every policy decision should be made with the direct input of those it will affect.
                My door will always be open to hear your concerns, ideas, and feedback.
              </p>

              <h3 className="text-foreground">Economic Opportunity for All</h3>
              <p className="text-muted-foreground">
                Eugene deserves an economy that works for everyone. I&apos;m committed to policies that
                create good-paying jobs, support small businesses, ensure corporations pay their fair share,
                and ensure that economic growth benefits all residents, not just a select few.
              </p>

              <h3 className="text-foreground">Environmental Stewardship</h3>
              <p className="text-muted-foreground">
                Our community is blessed with natural beauty that we must protect for future generations.
                I will champion sustainable policies that preserve our environment, implement ecological
                restoration initiatives, and advocate for a carbon tax to address climate change while
                allowing for responsible development and growth.
              </p>

              <h3 className="text-foreground">Justice and Equality</h3>
              <p className="text-muted-foreground">
                I am committed to fighting for women&apos;s rights, including strengthening protections for
                sexual assault survivors. I will also work to decriminalize drug use and focus on
                treatment rather than criminalization. Every person deserves dignity, respect, and equal
                protection under the law.
              </p>

              <h3 className="text-foreground">Housing for All</h3>
              <p className="text-muted-foreground">
                I believe housing is a human right. I will work to provide free housing for the homeless and
                increase the supply of affordable housing for all Eugene residents. No one should have to
                worry about having a safe place to call home.
              </p>

              <h3 className="text-foreground">Labor Rights</h3>
              <p className="text-muted-foreground">
                Workers deserve fair wages and safe working conditions. I will advocate for increasing the
                minimum wage and strengthening enforcement of labor laws to ensure all workers in Eugene
                are treated with dignity and can support their families.
              </p>

              <h3 className="text-foreground">Transparent Leadership</h3>
              <p className="text-muted-foreground">
                You deserve a leader who is honest, accessible, and accountable. I pledge to maintain
                the highest standards of transparency in all aspects of governance and decision-making.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Achievements />

      <section className="content-section-alt">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-title">
              Personal Life
            </h2>
            <div className="prose prose-lg mx-auto dark:prose-dark">
              <p className="text-muted-foreground">
                {/* TODO: Replace with candidate's personal interests and community involvement */}
                When not working for the community, {campaign.candidateName} enjoys [personal interests/hobbies]
                and [community activities]. They are particularly passionate about [specific interests]
                and [community involvement activities].
              </p>
              <p className="text-muted-foreground">
                {/* TODO: Replace with candidate's family/personal life (optional - only include if candidate wants to share) */}
                {campaign.candidateName} [family situation] and [other personal details if desired].
                They are [community involvement] and [volunteer activities].
              </p>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </>
  );
} 
