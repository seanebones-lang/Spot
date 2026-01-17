'use client';

import Link from 'next/link';
import { Music, CreditCard, Smartphone, User, Users, Settings } from 'lucide-react';

const helpCategories = [
  {
    id: 'app',
    title: 'App Help',
    description: 'Learn how to use common app features and troubleshoot issues.',
    icon: Music,
    color: 'from-spotify-green to-spotify-green/80'
  },
  {
    id: 'plan',
    title: 'Plan Help',
    description: 'Manage Trial, Free, or Premium plans including Duo, Family, and Artist.',
    icon: Settings,
    color: 'from-empulse-purple to-empulse-blue'
  },
  {
    id: 'payment',
    title: 'Payment Help',
    description: 'Find answers for common payment and billing questions.',
    icon: CreditCard,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'device',
    title: 'Device Help',
    description: 'Troubleshoot the app with gaming devices, TVs, speakers, and more.',
    icon: Smartphone,
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'account',
    title: 'Account Help',
    description: 'Get help with logging in, verification, and account settings.',
    icon: User,
    color: 'from-pink-500 to-pink-600'
  },
  {
    id: 'community',
    title: 'Community Help',
    description: 'Find guidance for getting started here in EmPulse Music Community.',
    icon: Users,
    color: 'from-purple-500 to-purple-600'
  }
];

const suggestedArticles = [
  {
    title: 'How can I perform a clean reinstall of the app?',
    category: 'App Help',
    href: '/help'
  },
  {
    title: 'I created a new account. Can I transfer my playlists, saved music and followers?',
    category: 'Account Help',
    href: '/help'
  },
  {
    title: 'How do I close (delete) my EmPulse Music Account?',
    category: 'Account Help',
    href: '/help'
  },
  {
    title: 'Why does EmPulse Music keep pausing / why does the music stop?',
    category: 'App Help',
    href: '/help'
  },
  {
    title: 'How do I change my country settings?',
    category: 'Account Help',
    href: '/help'
  },
  {
    title: 'Upload Guidelines - What information is required for uploads?',
    category: 'Artist Help',
    href: '/help/upload-guidelines'
  },
  {
    title: 'How do I register with a PRO (ASCAP, BMI, SESAC) to collect royalties?',
    category: 'Artist Help',
    href: '/legal/pro-guide'
  }
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-spotify-dark text-white">
      {/* Header */}
      <div className="bg-spotify-dark-gray border-b border-white/10 px-8 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold">EmPulse Music</h1>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/help" className="text-white font-medium">Help</Link>
              <Link href="/support" className="text-spotify-text-gray hover:text-white">Chat</Link>
              <Link href="#" className="text-spotify-text-gray hover:text-white">Ideas</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-spotify-text-gray hover:text-white">Log In</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Main Heading */}
        <div className="mb-12">
          <h2 className="text-5xl font-bold mb-4">VISIT Our Community</h2>
          <p className="text-xl text-spotify-text-gray mb-6">
            Have questions? Find answers from our worldwide Community of expert fans!
          </p>
          <button className="bg-spotify-green hover:bg-spotify-green/80 text-black px-8 py-4 rounded-full font-bold text-lg transition-colors">
            Go to Community
          </button>
        </div>

        {/* Suggested Articles */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold mb-4">Suggested Articles</h3>
          <p className="text-spotify-text-gray mb-6">View top articles for help with common questions.</p>
          <div className="space-y-3">
            {suggestedArticles.map((article, index) => (
              <Link
                key={index}
                href={article.href || '/help'}
                className="flex items-center gap-3 p-4 bg-spotify-light-gray hover:bg-[#3e3e3e] rounded-lg transition-colors cursor-pointer group"
              >
                <span className="text-spotify-green group-hover:translate-x-1 transition-transform">→</span>
                <span className="text-white group-hover:underline">{article.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ Categories */}
        <div>
          <div className="mb-6">
            <h3 className="text-3xl font-bold mb-2">FAQs</h3>
            <p className="text-spotify-text-gray">
              Check the most Frequently Asked Questions before posting. Also includes help on using the Community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  className="bg-spotify-light-gray hover:bg-[#3e3e3e] rounded-lg p-6 transition-colors group"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{category.title}</h4>
                  <p className="text-spotify-text-gray text-sm mb-4">{category.description}</p>
                  <button className="bg-spotify-green hover:bg-spotify-green/80 text-black px-6 py-2 rounded-full font-medium text-sm transition-colors">
                    VIEW ARTICLES
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Assistant CTA */}
        <div className="mt-16 bg-gradient-to-r from-empulse-purple/20 to-empulse-blue/20 rounded-lg p-8 border border-white/10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-empulse-purple to-empulse-blue rounded-full flex items-center justify-center">
              <span className="text-2xl">✨</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold">Get answers with AI (BETA)</h3>
              <p className="text-spotify-text-gray">Ask a question or describe your issue to get quick answers.</p>
            </div>
          </div>
          <Link
            href="/support"
            className="inline-block bg-spotify-green hover:bg-spotify-green/80 text-black px-6 py-3 rounded-full font-medium transition-colors"
          >
            Chat with AI Assistant
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 bg-black border-t border-white/10 px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h5 className="font-bold mb-4 text-white">Company</h5>
              <ul className="space-y-2 text-spotify-text-gray text-sm">
                <li><Link href="#" className="hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-white">Jobs</Link></li>
                <li><Link href="#" className="hover:text-white">For the Record</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4 text-white">Communities</h5>
              <ul className="space-y-2 text-spotify-text-gray text-sm">
                <li><Link href="/artist/signup" className="hover:text-white">For Artists</Link></li>
                <li><Link href="#" className="hover:text-white">Developers</Link></li>
                <li><Link href="#" className="hover:text-white">Advertising</Link></li>
                <li><Link href="#" className="hover:text-white">Investors</Link></li>
                <li><Link href="#" className="hover:text-white">Vendors</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4 text-white">Useful Links</h5>
              <ul className="space-y-2 text-spotify-text-gray text-sm">
                <li><Link href="/help" className="hover:text-white">Support</Link></li>
                <li><Link href="#" className="hover:text-white">Web Player</Link></li>
                <li><Link href="#" className="hover:text-white">Free Mobile App</Link></li>
                <li><Link href="/support" className="hover:text-white">Contact EmPulse Music</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4 text-white">EmPulse Plans</h5>
              <ul className="space-y-2 text-spotify-text-gray text-sm">
                <li><Link href="/subscription" className="hover:text-white">Premium Individual</Link></li>
                <li><Link href="/subscription" className="hover:text-white">Premium Family</Link></li>
                <li><Link href="/subscription" className="hover:text-white">Premium Student</Link></li>
                <li><Link href="/subscription" className="hover:text-white">Artist Plan</Link></li>
                <li><Link href="/subscription" className="hover:text-white">EmPulse Free</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-6 text-spotify-text-gray text-xs">
              <Link href="/legal/terms" className="hover:text-white">Terms of Service</Link>
              <Link href="/legal/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link href="/legal/dmca" className="hover:text-white">DMCA Policy</Link>
              <Link href="/legal/royalty-policy" className="hover:text-white">Royalty Policy</Link>
              <Link href="/legal/pro-guide" className="hover:text-white">PRO Guide</Link>
              <Link href="/help/upload-guidelines" className="hover:text-white">Upload Guidelines</Link>
              <Link href="#" className="hover:text-white">Cookies</Link>
              <Link href="#" className="hover:text-white">About Ads</Link>
              <Link href="#" className="hover:text-white">Accessibility</Link>
            </div>
            <div className="text-spotify-text-gray text-xs">
              © 2026 EmPulse Music AB
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}