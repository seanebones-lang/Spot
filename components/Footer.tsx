'use client';

import Link from 'next/link';
import { Globe } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10 px-8 py-12 mt-auto">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Company */}
          <div>
            <h5 className="font-bold mb-4 text-white">Company</h5>
            <ul className="space-y-2 text-spotify-text-gray text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/jobs" className="hover:text-white transition-colors">Jobs</Link></li>
              <li><Link href="/for-the-record" className="hover:text-white transition-colors">For the Record</Link></li>
            </ul>
          </div>

          {/* Communities */}
          <div>
            <h5 className="font-bold mb-4 text-white">Communities</h5>
            <ul className="space-y-2 text-spotify-text-gray text-sm">
              <li><Link href="/artist/signup" className="hover:text-white transition-colors">For Artists</Link></li>
              <li><Link href="/developers" className="hover:text-white transition-colors">Developers</Link></li>
              <li><Link href="/advertising" className="hover:text-white transition-colors">Advertising</Link></li>
              <li><Link href="/investors" className="hover:text-white transition-colors">Investors</Link></li>
              <li><Link href="/vendors" className="hover:text-white transition-colors">Vendors</Link></li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h5 className="font-bold mb-4 text-white">Useful links</h5>
            <ul className="space-y-2 text-spotify-text-gray text-sm">
              <li><Link href="/support" className="hover:text-white transition-colors">Support</Link></li>
              <li><Link href="/mobile-app" className="hover:text-white transition-colors">Free Mobile App</Link></li>
              <li><Link href="/popular-by-country" className="hover:text-white transition-colors">Popular by Country</Link></li>
              <li><Link href="/import-music" className="hover:text-white transition-colors">Import your music</Link></li>
            </ul>
          </div>

          {/* EmPulse Plans */}
          <div>
            <h5 className="font-bold mb-4 text-white">EmPulse Plans</h5>
            <ul className="space-y-2 text-spotify-text-gray text-sm">
              <li><Link href="/subscription" className="hover:text-white transition-colors">Premium Individual</Link></li>
              <li><Link href="/subscription" className="hover:text-white transition-colors">Premium Duo</Link></li>
              <li><Link href="/subscription" className="hover:text-white transition-colors">Premium Family</Link></li>
              <li><Link href="/subscription" className="hover:text-white transition-colors">Premium Student</Link></li>
              <li><Link href="/subscription" className="hover:text-white transition-colors">EmPulse Free</Link></li>
              <li><Link href="/audiobooks" className="hover:text-white transition-colors">Audiobooks Access</Link></li>
            </ul>
          </div>
        </div>

        {/* Legal & Privacy Links */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <Link href="/legal" className="text-spotify-text-gray hover:text-white text-xs transition-colors">Legal</Link>
              <Link href="/safety-privacy" className="text-spotify-text-gray hover:text-white text-xs transition-colors">Safety & Privacy Center</Link>
              <Link href="/privacy-policy" className="text-spotify-text-gray hover:text-white text-xs transition-colors">Privacy Policy</Link>
              <Link href="/cookies" className="text-spotify-text-gray hover:text-white text-xs transition-colors">Cookies</Link>
              <Link href="/about-ads" className="text-spotify-text-gray hover:text-white text-xs transition-colors">About Ads</Link>
              <Link href="/accessibility" className="text-spotify-text-gray hover:text-white text-xs transition-colors">Accessibility</Link>
              <Link href="/notice-at-collection" className="text-spotify-text-gray hover:text-white text-xs transition-colors">Notice at Collection</Link>
              <Link href="/privacy-choices" className="text-spotify-text-gray hover:text-white text-xs transition-colors flex items-center gap-1">
                Your Privacy Choices
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="2" y="4" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M5 7l2 2 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
            <div className="flex items-center gap-2 text-spotify-text-gray text-xs">
              <Globe size={14} />
              <span>USA</span>
              <span className="ml-4">© {currentYear} EmPulse Music</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
