import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { educationalContent } from '@/lib/backends';
import { Callout, KeyPoints, StatCard, StatGrid, SectionHeader, FeatureList } from '@/components/learn';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const articleContent: Record<string, { content: React.ReactNode }> = {
  'what-is-live-service': {
    content: (
      <>
        <div className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
          Live service games, also known as games-as-a-service (GaaS), are games designed to
          be continuously updated and operated over an extended period. Unlike traditional
          games with a fixed release, live service games evolve through regular content
          updates, events, and ongoing player engagement.
        </div>

        <KeyPoints
          title="What You'll Learn"
          points={[
            'How live service differs from traditional game development',
            'Key characteristics that define successful live service games',
            'Technical infrastructure requirements for ongoing operations',
            'Whether live service is the right model for your game',
          ]}
        />

        <SectionHeader number={1} title="The Shift from Product to Service" />
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Traditional game development followed a simple model: develop a game, ship it, and
          move on to the next project. Live service games fundamentally change this approach.
          The launch is just the beginning - the game continues to grow and evolve based on
          player feedback, data insights, and planned content roadmaps.
        </p>
        <Callout type="info" title="Key Insight">
          This shift requires different thinking about game design, development processes,
          and critically, the technical infrastructure that supports ongoing operations.
        </Callout>

        <SectionHeader number={2} title="Key Characteristics" />
        <FeatureList
          columns={2}
          items={[
            { title: 'Regular Content Updates', description: 'New features, modes, characters, and story content on a regular cadence' },
            { title: 'Live Events', description: 'Time-limited events and seasonal content that create urgency' },
            { title: 'Ongoing Monetization', description: 'Battle passes, cosmetics, and in-app purchases drive revenue' },
            { title: 'Community Focus', description: 'Active community management and player feedback loops' },
            { title: 'Data-Driven Decisions', description: 'Analytics and A/B testing inform development priorities' },
            { title: 'Long-Term Commitment', description: 'Multi-year content roadmaps and team dedication' },
          ]}
        />

        <SectionHeader number={3} title="Success Stories" />
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Some of the most successful games in the world operate as live services:
        </p>
        <div className="grid md:grid-cols-2 gap-4 my-6">
          {[
            { name: 'Fortnite', desc: 'Pioneered the modern battle pass model' },
            { name: 'Genshin Impact', desc: 'Regular character and region releases' },
            { name: 'League of Legends', desc: 'Over a decade of continuous updates' },
            { name: 'Clash of Clans', desc: 'Mobile live service for 10+ years' },
          ].map((game) => (
            <div key={game.name} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="font-semibold text-slate-900 dark:text-slate-100">{game.name}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{game.desc}</div>
            </div>
          ))}
        </div>

        <SectionHeader number={4} title="Technical Requirements" />
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Running a live service game requires robust backend infrastructure:
        </p>
        <FeatureList
          items={[
            { title: 'Player Authentication', description: 'Identity and profile management across devices' },
            { title: 'Cloud Save', description: 'Persistent data storage and synchronization' },
            { title: 'Remote Configuration', description: 'Update game parameters without app releases' },
            { title: 'Virtual Economy', description: 'Currency and transaction processing' },
            { title: 'Analytics', description: 'Player behavior tracking and insights' },
            { title: 'Live Events', description: 'Time-gated content and event scheduling' },
          ]}
        />

        <Callout type="tip" title="Choosing Your Backend">
          The infrastructure you choose will determine how effectively you can operate your game
          over time. Consider platforms that offer integrated solutions for these core capabilities.
        </Callout>

        <SectionHeader number={5} title="Is Live Service Right for You?" />
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Live service isn't right for every game. Ask yourself:
        </p>
        <div className="space-y-3 my-6">
          {[
            'Do you have resources for ongoing development and operations?',
            'Is your game design suited to continuous updates?',
            'Can you commit to a long-term content roadmap?',
            'Do you have a team for live operations, community, and support?',
          ].map((q, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <span className="text-amber-500">?</span>
              <span className="text-amber-800 dark:text-amber-200">{q}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  'pillars-of-live-ops': {
    content: (
      <>
        <div className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
          Successful live operations require mastering several interconnected disciplines.
          These pillars form the foundation of any well-run live service game.
        </div>

        <KeyPoints
          title="The 5 Pillars"
          points={[
            'Content Operations - Regular updates and live events',
            'Economy Management - Virtual currencies and monetization',
            'Player Segmentation - Targeting different player types',
            'Analytics & Experimentation - Data-driven decisions',
            'Community & Support - Building lasting relationships',
          ]}
        />

        <SectionHeader number={1} title="Content Operations" subtitle="The heartbeat of any live service game" />
        <FeatureList
          items={[
            { title: 'Regular Updates', description: 'Weekly, bi-weekly, or monthly content drops' },
            { title: 'Seasonal Content', description: 'Major updates aligned with real-world seasons or anniversaries' },
            { title: 'Live Events', description: 'Time-limited events that create urgency and excitement' },
            { title: 'Remote Configuration', description: 'Tweak game parameters without app updates' },
          ]}
        />
        <Callout type="info">
          Your backend needs to support content scheduling, remote configuration, and the
          ability to deploy changes quickly without requiring players to update their app.
        </Callout>

        <SectionHeader number={2} title="Economy Management" subtitle="Balancing progression with monetization" />
        <FeatureList
          columns={2}
          items={[
            { title: 'Virtual Currencies', description: 'Soft and hard currency systems' },
            { title: 'Item Management', description: 'Inventories, equipment, consumables' },
            { title: 'IAP Validation', description: 'Secure purchase verification' },
            { title: 'Offers & Bundles', description: 'Targeted promotional content' },
          ]}
        />
        <Callout type="tip" title="Pro Tip">
          Economy balance is an ongoing process. You need tools to monitor, adjust, and
          experiment with economic parameters in real-time.
        </Callout>

        <SectionHeader number={3} title="Player Segmentation" subtitle="Not all players are the same" />
        <div className="grid md:grid-cols-3 gap-4 my-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Behavioral</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">New players, veterans, churned players</div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="font-semibold text-green-800 dark:text-green-200 mb-2">Spending</div>
            <div className="text-sm text-green-700 dark:text-green-300">Non-payers, minnows, dolphins, whales</div>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Engagement</div>
            <div className="text-sm text-purple-700 dark:text-purple-300">Daily actives, weekly actives, at-risk</div>
          </div>
        </div>

        <SectionHeader number={4} title="Analytics & Experimentation" subtitle="Data-driven decisions win" />
        <FeatureList
          columns={2}
          items={[
            { title: 'KPI Tracking', description: 'DAU, MAU, retention, revenue metrics' },
            { title: 'Funnel Analysis', description: 'Where players drop off' },
            { title: 'A/B Testing', description: 'Experiment before full rollout' },
            { title: 'Revenue Analytics', description: 'Monetization performance' },
          ]}
        />

        <SectionHeader number={5} title="Community & Support" subtitle="Live service games live and die by their communities" />
        <FeatureList
          items={[
            { title: 'Player Support', description: 'Tools for handling tickets and issues' },
            { title: 'Moderation', description: 'Managing player behavior and content' },
            { title: 'Communication', description: 'In-game messaging and announcements' },
          ]}
        />

        <Callout type="warning" title="Remember">
          Each of these pillars requires specific backend capabilities. When evaluating
          platforms, consider how well they support each pillar and whether you'll need to
          build or integrate additional tools.
        </Callout>
      </>
    ),
  },
  'retention-engagement': {
    content: (
      <>
        <div className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
          Player retention is the lifeblood of live service games. Acquiring new players is
          expensive - keeping existing players engaged is far more valuable.
        </div>

        <StatGrid>
          <StatCard value="25-33%" label="D1 Retention" description="Top 25% mobile games" />
          <StatCard value="7-10%" label="D7 Retention" description="Industry benchmark" />
          <StatCard value="5-10x" label="LTV Multiplier" description="Retained vs. churned" />
        </StatGrid>

        <SectionHeader number={1} title="Understanding Retention Metrics" />
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 font-semibold">Metric</th>
                <th className="text-left py-3 px-4 font-semibold">Definition</th>
                <th className="text-left py-3 px-4 font-semibold">Top 25%</th>
              </tr>
            </thead>
            <tbody className="text-slate-600 dark:text-slate-400">
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-100">D1</td>
                <td className="py-3 px-4">Return the day after install</td>
                <td className="py-3 px-4 text-green-600">25-33%</td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-100">D7</td>
                <td className="py-3 px-4">Still active after a week</td>
                <td className="py-3 px-4 text-green-600">7-10%</td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-100">D30</td>
                <td className="py-3 px-4">Monthly retention</td>
                <td className="py-3 px-4 text-green-600">3-5%</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-100">D90+</td>
                <td className="py-3 px-4">Long-term engagement</td>
                <td className="py-3 px-4 text-green-600">1-3%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <SectionHeader number={2} title="Features That Drive Retention" />

        <h3 className="text-lg font-semibold mt-6 mb-3 text-slate-900 dark:text-slate-100">Daily Engagement Loops</h3>
        <FeatureList
          columns={2}
          items={[
            { title: 'Daily Login Rewards', description: 'Incentivize daily returns' },
            { title: 'Daily Quests', description: 'Goals that reset each day' },
            { title: 'Energy Systems', description: 'Encourage multiple sessions' },
            { title: 'Daily Deals', description: 'Limited-time offers' },
          ]}
        />

        <h3 className="text-lg font-semibold mt-6 mb-3 text-slate-900 dark:text-slate-100">Social Features</h3>
        <FeatureList
          columns={2}
          items={[
            { title: 'Friends & Connections', description: 'Social bonds increase retention' },
            { title: 'Guilds & Clans', description: 'Community obligations' },
            { title: 'Leaderboards', description: 'Competition drives engagement' },
            { title: 'Gifting & Trading', description: 'Social economy mechanics' },
          ]}
        />

        <h3 className="text-lg font-semibold mt-6 mb-3 text-slate-900 dark:text-slate-100">Progression Systems</h3>
        <FeatureList
          columns={2}
          items={[
            { title: 'Account Leveling', description: 'Long-term progression goals' },
            { title: 'Achievements', description: 'Milestones and accomplishments' },
            { title: 'Collections', description: 'Completionist mechanics' },
            { title: 'Skill Trees', description: 'Meaningful upgrade choices' },
          ]}
        />

        <SectionHeader number={3} title="Re-engagement Strategies" />
        <Callout type="tip" title="Win Back Lapsed Players">
          Even with great retention features, players will lapse. Have a plan to bring them back.
        </Callout>
        <FeatureList
          items={[
            { title: 'Push Notifications', description: 'Timely reminders about events and rewards' },
            { title: 'Comeback Bonuses', description: 'Special rewards for returning players' },
            { title: 'Email Campaigns', description: 'Updates about new content' },
            { title: 'Deep Linking', description: 'Direct links to specific content' },
          ]}
        />
      </>
    ),
  },
  'monetization-economy': {
    content: (
      <>
        <div className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
          Sustainable monetization is essential for live service games. A well-designed
          economy balances player satisfaction with revenue generation.
        </div>

        <KeyPoints
          title="Core Principles"
          points={[
            'Value exchange must feel fair to players',
            'Multiple monetization methods reduce risk',
            'Economy balance requires constant tuning',
            'Data informs pricing and offer strategies',
          ]}
        />

        <SectionHeader number={1} title="Monetization Models" />

        <div className="grid gap-4 my-6">
          <div className="p-5 bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-900/30 dark:to-blue-800/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Free-to-Play (F2P)</h3>
            <p className="text-blue-800 dark:text-blue-200 text-sm mb-3">The dominant model for mobile and many PC/console live service games</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded">Free to download</span>
              <span className="text-xs px-2 py-1 bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded">IAP revenue</span>
              <span className="text-xs px-2 py-1 bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded">Careful balance needed</span>
            </div>
          </div>

          <div className="p-5 bg-gradient-to-r from-purple-50 to-purple-100/50 dark:from-purple-900/30 dark:to-purple-800/20 rounded-xl border border-purple-200 dark:border-purple-800">
            <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Battle Pass / Season Pass</h3>
            <p className="text-purple-800 dark:text-purple-200 text-sm mb-3">Popularized by Fortnite, now standard across many games</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 rounded">Premium rewards</span>
              <span className="text-xs px-2 py-1 bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 rounded">Engagement driver</span>
              <span className="text-xs px-2 py-1 bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 rounded">Recurring revenue</span>
            </div>
          </div>

          <div className="p-5 bg-gradient-to-r from-green-50 to-green-100/50 dark:from-green-900/30 dark:to-green-800/20 rounded-xl border border-green-200 dark:border-green-800">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">Subscription</h3>
            <p className="text-green-800 dark:text-green-200 text-sm mb-3">Growing model offering ongoing benefits</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 rounded">Monthly recurring</span>
              <span className="text-xs px-2 py-1 bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 rounded">VIP perks</span>
              <span className="text-xs px-2 py-1 bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 rounded">Predictable revenue</span>
            </div>
          </div>
        </div>

        <SectionHeader number={2} title="Dual Currency Design" />
        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-5 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-white font-bold">S</div>
              <h3 className="font-semibold text-amber-900 dark:text-amber-100">Soft Currency</h3>
            </div>
            <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-1">
              <li>• Earned through gameplay</li>
              <li>• Spent on basic items</li>
              <li>• Keeps players engaged</li>
            </ul>
          </div>
          <div className="p-5 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">H</div>
              <h3 className="font-semibold text-emerald-900 dark:text-emerald-100">Hard Currency</h3>
            </div>
            <ul className="text-sm text-emerald-800 dark:text-emerald-200 space-y-1">
              <li>• Purchased with real money</li>
              <li>• Premium items or acceleration</li>
              <li>• Primary revenue driver</li>
            </ul>
          </div>
        </div>

        <SectionHeader number={3} title="Sink and Faucet Balance" />
        <Callout type="warning" title="Economy Balance is Critical">
          Currency enters the economy (faucets) and leaves (sinks). Get this wrong and your economy breaks.
        </Callout>
        <div className="grid md:grid-cols-3 gap-4 my-6 text-sm">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200">
            <strong>Too many faucets</strong>
            <p className="mt-1 opacity-80">Inflation - purchases feel meaningless</p>
          </div>
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200">
            <strong>Too few faucets</strong>
            <p className="mt-1 opacity-80">Frustration - players feel blocked</p>
          </div>
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200">
            <strong>Too few sinks</strong>
            <p className="mt-1 opacity-80">Accumulation - no reason to purchase</p>
          </div>
        </div>

        <SectionHeader number={4} title="Key Metrics" />
        <StatGrid>
          <StatCard value="ARPDAU" label="Revenue per DAU" description="Daily revenue health" />
          <StatCard value="ARPPU" label="Revenue per Payer" description="Payer value" />
          <StatCard value="2-5%" label="Conversion" description="Free to paying" />
        </StatGrid>
      </>
    ),
  },
  'analytics-optimization': {
    content: (
      <>
        <div className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
          Data-driven decision making separates successful live service games from the rest.
          Analytics help you understand player behavior and optimize every aspect of your game.
        </div>

        <KeyPoints
          title="Analytics Foundations"
          points={[
            'Track the right metrics for your game type',
            'Build dashboards for different stakeholders',
            'Use experimentation to validate changes',
            'Act on insights, not just collect data',
          ]}
        />

        <SectionHeader number={1} title="Essential Metrics" />

        <h3 className="text-lg font-semibold mt-6 mb-3 text-slate-900 dark:text-slate-100">Engagement</h3>
        <div className="grid md:grid-cols-2 gap-3 my-4">
          {[
            { metric: 'DAU/MAU', desc: 'Daily and Monthly Active Users' },
            { metric: 'Session Length', desc: 'Time spent per play session' },
            { metric: 'Sessions/Day', desc: 'Return frequency' },
            { metric: 'Stickiness', desc: 'DAU/MAU ratio' },
          ].map((item) => (
            <div key={item.metric} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="font-medium text-slate-900 dark:text-slate-100">{item.metric}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</div>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold mt-6 mb-3 text-slate-900 dark:text-slate-100">Retention</h3>
        <div className="grid md:grid-cols-2 gap-3 my-4">
          {[
            { metric: 'D1, D7, D30', desc: 'Return rates at intervals' },
            { metric: 'Churn Rate', desc: 'Rate of player loss' },
            { metric: 'Resurrection', desc: 'Churned players who return' },
            { metric: 'Cohort Curves', desc: 'Retention by acquisition date' },
          ].map((item) => (
            <div key={item.metric} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="font-medium text-slate-900 dark:text-slate-100">{item.metric}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</div>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold mt-6 mb-3 text-slate-900 dark:text-slate-100">Monetization</h3>
        <div className="grid md:grid-cols-2 gap-3 my-4">
          {[
            { metric: 'Revenue', desc: 'Total and by source' },
            { metric: 'ARPDAU/ARPPU', desc: 'Revenue per user metrics' },
            { metric: 'Conversion', desc: 'Free to paying rate' },
            { metric: 'LTV', desc: 'Lifetime value' },
          ].map((item) => (
            <div key={item.metric} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="font-medium text-slate-900 dark:text-slate-100">{item.metric}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</div>
            </div>
          ))}
        </div>

        <SectionHeader number={2} title="Funnel Analysis" />
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Understanding where players drop off is crucial for optimization:
        </p>
        <FeatureList
          items={[
            { title: 'FTUE Funnel', description: 'First-time user experience completion rates' },
            { title: 'Conversion Funnel', description: 'Path from install to first purchase' },
            { title: 'Feature Funnels', description: 'Adoption and engagement with specific features' },
          ]}
        />

        <SectionHeader number={3} title="A/B Testing" />
        <Callout type="tip" title="Test Everything">
          Experimentation is essential for optimization. Small changes can have big impacts.
        </Callout>
        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div>
            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-3">Best Practices</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Test one variable at a time
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Ensure statistical significance
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Consider segment effects
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Document and learn from results
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-3">What to Test</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-primary-100 dark:bg-primary-900/40"></span>
                Pricing and offers
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-primary-100 dark:bg-primary-900/40"></span>
                Tutorial and onboarding
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-primary-100 dark:bg-primary-900/40"></span>
                Game balance changes
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-primary-100 dark:bg-primary-900/40"></span>
                UI and UX changes
              </li>
            </ul>
          </div>
        </div>

        <SectionHeader number={4} title="Backend Requirements" />
        <FeatureList
          columns={2}
          items={[
            { title: 'Event Tracking', description: 'Capture player actions' },
            { title: 'Data Warehouse', description: 'Store and process data' },
            { title: 'Dashboards', description: 'Visualize key metrics' },
            { title: 'A/B Framework', description: 'Run experiments' },
            { title: 'Real-time Reports', description: 'Monitor live' },
            { title: 'BI Integration', description: 'Connect external tools' },
          ]}
        />
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

      <article className="max-w-4xl">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary-500/25">
              {contentMeta.order}
            </span>
            <span className="text-sm font-medium text-primary-600 bg-primary-50 dark:bg-primary-900/30 px-3 py-1 rounded-full">
              Guide {contentMeta.order} of {educationalContent.length}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-slate-50">
            {contentMeta.title}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {contentMeta.description}
          </p>
        </header>

        {/* Content */}
        <div className="prose-custom">
          {article.content}
        </div>

        {/* Navigation */}
        <nav className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
          <div className="grid md:grid-cols-2 gap-4">
            {prevArticle ? (
              <Link
                href={`/learn/${prevArticle.slug}`}
                className="group p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md transition-all"
              >
                <span className="text-sm text-slate-500 flex items-center gap-1 mb-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </span>
                <span className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-primary-600 transition-colors">
                  {prevArticle.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextArticle ? (
              <Link
                href={`/learn/${nextArticle.slug}`}
                className="group p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md transition-all text-right"
              >
                <span className="text-sm text-slate-500 flex items-center justify-end gap-1 mb-1">
                  Next
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
                <span className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-primary-600 transition-colors">
                  {nextArticle.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </nav>

        {/* CTA */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-900/30 dark:to-primary-800/20 border border-primary-200 dark:border-primary-800 text-center">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            Ready to compare platforms?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-lg mx-auto">
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
