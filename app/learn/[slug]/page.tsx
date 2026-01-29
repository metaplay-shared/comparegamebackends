import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { educationalContent } from '@/lib/backends';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const articleContent: Record<string, { content: React.ReactNode }> = {
  'what-is-live-service': {
    content: (
      <>
        <p className="lead">
          Live service games, also known as games-as-a-service (GaaS), are games designed to
          be continuously updated and operated over an extended period. Unlike traditional
          games with a fixed release, live service games evolve through regular content
          updates, events, and ongoing player engagement.
        </p>

        <h2>The Shift from Product to Service</h2>
        <p>
          Traditional game development followed a simple model: develop a game, ship it, and
          move on to the next project. Live service games fundamentally change this approach.
          The launch is just the beginning - the game continues to grow and evolve based on
          player feedback, data insights, and planned content roadmaps.
        </p>
        <p>
          This shift requires different thinking about game design, development processes,
          and critically, the technical infrastructure that supports ongoing operations.
        </p>

        <h2>Key Characteristics of Live Service Games</h2>
        <ul>
          <li>
            <strong>Regular content updates</strong> - New features, game modes, characters,
            items, and story content are released on a regular cadence.
          </li>
          <li>
            <strong>Live events</strong> - Time-limited events, seasonal content, and special
            occasions keep the game fresh and create urgency.
          </li>
          <li>
            <strong>Ongoing monetization</strong> - Revenue comes from continuous engagement
            through battle passes, cosmetics, expansions, and in-app purchases.
          </li>
          <li>
            <strong>Community focus</strong> - Active community management, player feedback
            loops, and social features are essential.
          </li>
          <li>
            <strong>Data-driven decisions</strong> - Analytics, A/B testing, and player behavior
            tracking inform development priorities.
          </li>
        </ul>

        <h2>Examples of Successful Live Service Games</h2>
        <p>
          Some of the most successful games in the world operate as live services:
        </p>
        <ul>
          <li><strong>Fortnite</strong> - Pioneered the modern battle pass model with constant updates</li>
          <li><strong>Genshin Impact</strong> - Regular character and region releases drive engagement</li>
          <li><strong>League of Legends</strong> - Over a decade of continuous updates and esports</li>
          <li><strong>Destiny 2</strong> - Seasonal content model with expansions</li>
          <li><strong>Clash of Clans</strong> - Mobile live service running for over 10 years</li>
        </ul>

        <h2>Technical Requirements</h2>
        <p>
          Running a live service game requires robust backend infrastructure that can handle:
        </p>
        <ul>
          <li>Player authentication and profile management</li>
          <li>Cloud save and data persistence</li>
          <li>Real-time content updates without app store releases</li>
          <li>Virtual economy and transaction processing</li>
          <li>Analytics and player behavior tracking</li>
          <li>Live events and time-gated content</li>
          <li>Multiplayer and social features</li>
          <li>Push notifications and re-engagement</li>
        </ul>
        <p>
          This is where choosing the right game backend becomes critical. The infrastructure
          you choose will determine how effectively you can operate your game over time.
        </p>

        <h2>Is Live Service Right for Your Game?</h2>
        <p>
          Live service isn&apos;t right for every game. Consider these factors:
        </p>
        <ul>
          <li>Do you have the resources for ongoing development and operations?</li>
          <li>Is your game design suited to continuous updates?</li>
          <li>Can you commit to a long-term content roadmap?</li>
          <li>Do you have the team to handle live operations, community, and support?</li>
        </ul>
        <p>
          If you&apos;re building a game meant to run for years with an engaged player community,
          live service is likely the right model. And that means choosing backend infrastructure
          designed specifically for this purpose.
        </p>
      </>
    ),
  },
  'pillars-of-live-ops': {
    content: (
      <>
        <p className="lead">
          Successful live operations require mastering several interconnected disciplines.
          These pillars form the foundation of any well-run live service game.
        </p>

        <h2>1. Content Operations</h2>
        <p>
          The heartbeat of any live service game is its content cadence. This includes:
        </p>
        <ul>
          <li><strong>Regular updates</strong> - Weekly, bi-weekly, or monthly content drops</li>
          <li><strong>Seasonal content</strong> - Major updates aligned with real-world seasons or game anniversaries</li>
          <li><strong>Live events</strong> - Time-limited events that create urgency and excitement</li>
          <li><strong>Remote configuration</strong> - Ability to tweak game parameters without app updates</li>
        </ul>
        <p>
          Your backend needs to support content scheduling, remote configuration, and the
          ability to deploy changes quickly without requiring players to update their app.
        </p>

        <h2>2. Economy Management</h2>
        <p>
          A well-designed game economy balances player progression with monetization:
        </p>
        <ul>
          <li><strong>Virtual currencies</strong> - Soft and hard currency systems</li>
          <li><strong>Item management</strong> - Inventories, equipment, consumables</li>
          <li><strong>IAP validation</strong> - Secure purchase verification</li>
          <li><strong>Offers and bundles</strong> - Targeted promotional content</li>
        </ul>
        <p>
          Economy balance is an ongoing process. You need tools to monitor, adjust, and
          experiment with economic parameters in real-time.
        </p>

        <h2>3. Player Segmentation</h2>
        <p>
          Not all players are the same. Effective live ops requires understanding and
          targeting different player segments:
        </p>
        <ul>
          <li><strong>Behavioral segments</strong> - New players, veterans, churned players</li>
          <li><strong>Spending segments</strong> - Non-payers, minnows, dolphins, whales</li>
          <li><strong>Engagement segments</strong> - Daily actives, weekly actives, at-risk</li>
        </ul>
        <p>
          Your backend should support rich player profiling and the ability to target
          content, offers, and messaging to specific segments.
        </p>

        <h2>4. Analytics & Experimentation</h2>
        <p>
          Data-driven decisions separate successful live service games from struggling ones:
        </p>
        <ul>
          <li><strong>KPI tracking</strong> - DAU, MAU, retention, revenue metrics</li>
          <li><strong>Funnel analysis</strong> - Where players drop off</li>
          <li><strong>A/B testing</strong> - Experiment with features before full rollout</li>
          <li><strong>Revenue analytics</strong> - Understanding monetization performance</li>
        </ul>

        <h2>5. Community & Support</h2>
        <p>
          Live service games live and die by their communities:
        </p>
        <ul>
          <li><strong>Player support</strong> - Tools for handling tickets and issues</li>
          <li><strong>Moderation</strong> - Managing player behavior and content</li>
          <li><strong>Communication</strong> - In-game messaging and announcements</li>
        </ul>

        <h2>The Backend Connection</h2>
        <p>
          Each of these pillars requires specific backend capabilities. When evaluating
          platforms, consider how well they support each pillar and whether you&apos;ll need to
          build or integrate additional tools.
        </p>
      </>
    ),
  },
  'retention-engagement': {
    content: (
      <>
        <p className="lead">
          Player retention is the lifeblood of live service games. Acquiring new players is
          expensive - keeping existing players engaged is far more valuable.
        </p>

        <h2>Understanding Retention Metrics</h2>
        <p>
          Retention is typically measured at specific intervals:
        </p>
        <ul>
          <li><strong>D1 (Day 1)</strong> - Players who return the day after installing</li>
          <li><strong>D7 (Day 7)</strong> - Players still active after a week</li>
          <li><strong>D30 (Day 30)</strong> - Monthly retention</li>
          <li><strong>D90+</strong> - Long-term retention indicating true engagement</li>
        </ul>
        <p>
          Industry benchmarks vary by genre, but typically D1 retention of 35-40% and D7 of
          15-20% are considered good for mobile games.
        </p>

        <h2>Features That Drive Retention</h2>

        <h3>Daily Engagement Loops</h3>
        <ul>
          <li>Daily login rewards</li>
          <li>Daily quests and challenges</li>
          <li>Energy or stamina systems</li>
          <li>Daily deals and limited offers</li>
        </ul>

        <h3>Social Features</h3>
        <ul>
          <li>Friends and social connections</li>
          <li>Guilds and clans</li>
          <li>Leaderboards and competition</li>
          <li>Gifting and trading</li>
        </ul>

        <h3>Progression Systems</h3>
        <ul>
          <li>Character or account leveling</li>
          <li>Achievement systems</li>
          <li>Collection mechanics</li>
          <li>Skill trees and upgrades</li>
        </ul>

        <h3>Live Events</h3>
        <ul>
          <li>Time-limited events with exclusive rewards</li>
          <li>Seasonal content</li>
          <li>Community challenges</li>
          <li>Real-world tie-ins</li>
        </ul>

        <h2>Re-engagement Strategies</h2>
        <p>
          Even with great retention features, players will lapse. Re-engagement tools include:
        </p>
        <ul>
          <li><strong>Push notifications</strong> - Timely reminders about events and rewards</li>
          <li><strong>Comeback bonuses</strong> - Special rewards for returning players</li>
          <li><strong>Email campaigns</strong> - Updates about new content</li>
          <li><strong>Deep linking</strong> - Direct links to specific content</li>
        </ul>

        <h2>Backend Requirements</h2>
        <p>
          Supporting these retention features requires backend capabilities including:
        </p>
        <ul>
          <li>Player segmentation to identify at-risk players</li>
          <li>Push notification infrastructure</li>
          <li>Event scheduling and management</li>
          <li>Analytics to measure feature effectiveness</li>
          <li>Social graph management</li>
          <li>Leaderboard systems</li>
        </ul>
      </>
    ),
  },
  'monetization-economy': {
    content: (
      <>
        <p className="lead">
          Sustainable monetization is essential for live service games. A well-designed
          economy balances player satisfaction with revenue generation.
        </p>

        <h2>Monetization Models</h2>

        <h3>Free-to-Play (F2P)</h3>
        <p>
          The dominant model for mobile and many PC/console live service games:
        </p>
        <ul>
          <li>Free to download and play</li>
          <li>Revenue from in-app purchases</li>
          <li>Requires careful balance to avoid pay-to-win perception</li>
        </ul>

        <h3>Battle Pass / Season Pass</h3>
        <p>
          Popularized by Fortnite, now standard across many games:
        </p>
        <ul>
          <li>Purchase unlocks premium reward track</li>
          <li>Creates engagement through progression</li>
          <li>Recurring revenue each season</li>
        </ul>

        <h3>Subscription</h3>
        <p>
          Growing model offering ongoing benefits:
        </p>
        <ul>
          <li>Monthly recurring revenue</li>
          <li>VIP perks and bonuses</li>
          <li>Often combined with other models</li>
        </ul>

        <h2>Economy Design Principles</h2>

        <h3>Dual Currency</h3>
        <p>
          Most successful F2P games use two currencies:
        </p>
        <ul>
          <li><strong>Soft currency</strong> - Earned through gameplay, spent on basic items</li>
          <li><strong>Hard currency</strong> - Purchased with real money, used for premium items or acceleration</li>
        </ul>

        <h3>Sink and Faucet Balance</h3>
        <p>
          Currency enters the economy (faucets) and leaves (sinks). Balance is critical:
        </p>
        <ul>
          <li>Too many faucets = inflation, purchases feel meaningless</li>
          <li>Too few faucets = frustration, players feel blocked</li>
          <li>Too few sinks = currency accumulates, no reason to purchase</li>
        </ul>

        <h3>Targeted Offers</h3>
        <p>
          Personalized offers based on player behavior and segments:
        </p>
        <ul>
          <li>Starter packs for new players</li>
          <li>Comeback offers for returning players</li>
          <li>Progression-based offers at key moments</li>
          <li>Whale-tier offers for high spenders</li>
        </ul>

        <h2>Key Metrics</h2>
        <ul>
          <li><strong>ARPDAU</strong> - Average Revenue Per Daily Active User</li>
          <li><strong>ARPPU</strong> - Average Revenue Per Paying User</li>
          <li><strong>Conversion rate</strong> - % of players who make a purchase</li>
          <li><strong>LTV</strong> - Lifetime Value of a player</li>
        </ul>

        <h2>Backend Requirements</h2>
        <p>
          Monetization requires robust backend support:
        </p>
        <ul>
          <li>Virtual currency management</li>
          <li>Inventory and item systems</li>
          <li>IAP receipt validation (App Store, Google Play)</li>
          <li>Offer targeting and personalization</li>
          <li>Revenue analytics and reporting</li>
          <li>A/B testing for pricing and offers</li>
        </ul>
      </>
    ),
  },
  'analytics-optimization': {
    content: (
      <>
        <p className="lead">
          Data-driven decision making separates successful live service games from the rest.
          Analytics help you understand player behavior and optimize every aspect of your game.
        </p>

        <h2>Essential Metrics</h2>

        <h3>Engagement Metrics</h3>
        <ul>
          <li><strong>DAU/MAU</strong> - Daily and Monthly Active Users</li>
          <li><strong>Session length</strong> - How long players play per session</li>
          <li><strong>Sessions per day</strong> - How often players return</li>
          <li><strong>Stickiness</strong> - DAU/MAU ratio</li>
        </ul>

        <h3>Retention Metrics</h3>
        <ul>
          <li><strong>D1, D7, D30 retention</strong> - Return rates at key intervals</li>
          <li><strong>Churn rate</strong> - Rate of player loss</li>
          <li><strong>Resurrection rate</strong> - Churned players who return</li>
        </ul>

        <h3>Monetization Metrics</h3>
        <ul>
          <li><strong>Revenue</strong> - Total and by source</li>
          <li><strong>ARPDAU/ARPPU</strong> - Revenue per user metrics</li>
          <li><strong>Conversion rate</strong> - Free to paying conversion</li>
          <li><strong>LTV</strong> - Lifetime value</li>
        </ul>

        <h2>Funnel Analysis</h2>
        <p>
          Understanding where players drop off is crucial:
        </p>
        <ul>
          <li><strong>FTUE funnel</strong> - First-time user experience completion</li>
          <li><strong>Conversion funnel</strong> - Path to first purchase</li>
          <li><strong>Feature funnels</strong> - Adoption of specific features</li>
        </ul>

        <h2>A/B Testing</h2>
        <p>
          Experimentation is essential for optimization:
        </p>
        <ul>
          <li>Test one variable at a time</li>
          <li>Ensure statistical significance</li>
          <li>Consider segment-specific effects</li>
          <li>Document and learn from results</li>
        </ul>
        <p>
          Common things to A/B test:
        </p>
        <ul>
          <li>Pricing and offers</li>
          <li>Tutorial and onboarding</li>
          <li>Game balance changes</li>
          <li>UI and UX changes</li>
          <li>Event timing and rewards</li>
        </ul>

        <h2>Cohort Analysis</h2>
        <p>
          Track metrics by when players joined:
        </p>
        <ul>
          <li>Compare retention across acquisition cohorts</li>
          <li>Identify impact of game changes over time</li>
          <li>Understand seasonal variations</li>
        </ul>

        <h2>Backend Requirements</h2>
        <p>
          Robust analytics requires:
        </p>
        <ul>
          <li>Event tracking infrastructure</li>
          <li>Data warehousing and processing</li>
          <li>Custom dashboard capabilities</li>
          <li>A/B testing framework</li>
          <li>Real-time and historical reporting</li>
          <li>Integration with BI tools</li>
        </ul>
        <p>
          Some backend platforms include analytics, while others require integration
          with dedicated analytics services.
        </p>
      </>
    ),
  },
};

export async function generateStaticParams() {
  return educationalContent.map((content) => ({
    slug: content.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = educationalContent.find((c) => c.slug === slug);

  if (!content) {
    return { title: 'Article Not Found' };
  }

  return {
    title: content.title,
    description: content.description,
  };
}

export default async function LearnArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const contentMeta = educationalContent.find((c) => c.slug === slug);
  const article = articleContent[slug];

  if (!contentMeta || !article) {
    notFound();
  }

  const currentIndex = educationalContent.findIndex((c) => c.slug === slug);
  const prevArticle = currentIndex > 0 ? educationalContent[currentIndex - 1] : null;
  const nextArticle = currentIndex < educationalContent.length - 1 ? educationalContent[currentIndex + 1] : null;

  return (
    <div className="container-page py-12 md:py-16">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <li>
            <Link href="/" className="hover:text-primary-600">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/learn" className="hover:text-primary-600">
              Learn
            </Link>
          </li>
          <li>/</li>
          <li className="text-slate-900 dark:text-slate-50">{contentMeta.title}</li>
        </ol>
      </nav>

      <article className="max-w-3xl">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 font-bold">
              {contentMeta.order}
            </span>
            <span className="text-sm text-slate-500">Guide</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{contentMeta.title}</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {contentMeta.description}
          </p>
        </header>

        {/* Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-li:text-slate-600 dark:prose-li:text-slate-400 prose-strong:text-slate-900 dark:prose-strong:text-slate-100 prose-a:text-primary-600 prose-lead:text-xl prose-lead:text-slate-700 dark:prose-lead:text-slate-300">
          {article.content}
        </div>

        {/* Navigation */}
        <nav className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex justify-between">
            {prevArticle ? (
              <Link
                href={`/learn/${prevArticle.slug}`}
                className="group flex flex-col items-start"
              >
                <span className="text-sm text-slate-500 mb-1">← Previous</span>
                <span className="font-medium text-primary-600 group-hover:underline">
                  {prevArticle.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextArticle ? (
              <Link
                href={`/learn/${nextArticle.slug}`}
                className="group flex flex-col items-end"
              >
                <span className="text-sm text-slate-500 mb-1">Next →</span>
                <span className="font-medium text-primary-600 group-hover:underline">
                  {nextArticle.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </nav>

        {/* CTA */}
        <div className="mt-12 card p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Ready to compare platforms?</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            See how different backend platforms support these live service capabilities.
          </p>
          <Link href="/backends" className="btn-primary">
            Compare Platforms
          </Link>
        </div>
      </article>
    </div>
  );
}
