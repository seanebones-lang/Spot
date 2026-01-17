'use client';

import { Download, Info } from 'lucide-react';
import Link from 'next/link';

export default function RoyaltyPolicyPage() {
  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Royalty Policy</h1>
        
        <div className="bg-spotify-light-gray rounded-lg p-8 space-y-6">
          <div className="text-sm text-spotify-text-gray">
            <p>Last Updated: December 2025</p>
            <p>Effective Date: December 2025</p>
          </div>

          <div className="bg-blue-600/20 border border-blue-600/50 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Info size={24} className="text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-blue-400 mb-1">How Royalties Work</h3>
                <p className="text-sm text-white/80">
                  Royalties are calculated based on streaming activity and distributed according to ownership splits and 
                  platform fees. Performance royalties are collected by PROs, while mechanical royalties are paid via MLC.
                </p>
              </div>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Types of Royalties</h2>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-spotify-dark-gray rounded-lg p-4">
                  <h3 className="font-bold text-spotify-green mb-2">Performance Royalties</h3>
                  <p className="text-sm text-white/80 mb-2">
                    Collected when music is "performed" via streams, radio, TV, or live venues.
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-xs text-white/80">
                    <li>~$0.005 per stream (typical)</li>
                    <li>Collected by PROs (ASCAP, BMI, SESAC, GMR)</li>
                    <li>You must register with a PRO to collect</li>
                  </ul>
                </div>
                <div className="bg-spotify-dark-gray rounded-lg p-4">
                  <h3 className="font-bold text-spotify-green mb-2">Mechanical Royalties</h3>
                  <p className="text-sm text-white/80 mb-2">
                    Paid for composition rights in streaming (songwriter/composer royalties).
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-xs text-white/80">
                    <li>~15.35% of revenue (per MLC)</li>
                    <li>Paid to MLC (we report usage quarterly)</li>
                    <li>MLC distributes to composers/songwriters</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-white/80 mt-2">
                For more information, see our <Link href="/legal/pro-guide" className="text-spotify-green hover:underline">PRO Registration Guide</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Revenue Share Model</h2>
              
              <div className="bg-spotify-dark-gray rounded-lg p-4 mb-4">
                <h3 className="font-bold mb-2">Artist Revenue Share: $0.004 per stream</h3>
                <p className="text-sm text-white/80 mb-2">
                  This is <strong>higher than Spotify</strong> ($0.003-$0.005 typical). Our platform fee (10-20%) is deducted 
                  before artist payouts, providing transparent and competitive royalty rates.
                </p>
              </div>

              <h3 className="text-xl font-bold mt-4 mb-2">2.1 Revenue Distribution</h3>
              <div className="bg-yellow-600/20 border border-yellow-600/50 rounded-lg p-4 mb-4">
                <p className="font-bold text-yellow-400 mb-2">Revenue Breakdown (Per Stream):</p>
                <ol className="list-decimal list-inside space-y-1 ml-4 text-sm text-white/80">
                  <li><strong>Platform Fee (10-20%):</strong> Deducted before artist payout</li>
                  <li><strong>Mechanical Royalties (~15.35%):</strong> Paid to MLC for composition rights</li>
                  <li><strong>Artist Payout ($0.004/stream):</strong> Paid to you based on ownership percentages</li>
                  <li><strong>Performance Royalties (~$0.005/stream):</strong> Collected by PROs (if you're registered)</li>
                </ol>
              </div>

              <h3 className="text-xl font-bold mt-4 mb-2">2.2 Ownership Percentages</h3>
              <p>
                Artist payouts are distributed according to ownership percentages you provide during upload:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                <li>Composition ownership splits (must total 100%)</li>
                <li>Master recording ownership (typically 100% for direct uploads)</li>
                <li>Publisher shares (if applicable)</li>
              </ul>
              <p className="mt-2 text-yellow-400 font-bold">
                <strong>Important:</strong> Accurate ownership percentages are critical for fair royalty distribution. 
                Incorrect percentages may result in disputes or delayed payouts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Payout Schedule</h2>
              
              <div className="bg-spotify-dark-gray rounded-lg p-4">
                <h3 className="font-bold mb-2">Monthly Payouts</h3>
                <ol className="list-decimal list-inside space-y-2 ml-4 text-sm text-white/80">
                  <li><strong>Stream Tracking:</strong> Streaming activity is tracked daily and aggregated monthly</li>
                  <li><strong>Calculation Period:</strong> Royalties calculated on 1st of each month for previous month</li>
                  <li><strong>Payout Processing:</strong> Payouts processed within 7-14 business days after calculation</li>
                  <li><strong>Minimum Payout:</strong> $25 minimum threshold (unpaid balance rolls over to next month)</li>
                  <li><strong>Payment Methods:</strong> Stripe, PayPal, or ACH (for U.S. artists)</li>
                </ol>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Royalty Calculation Details</h2>
              
              <h3 className="text-xl font-bold mt-4 mb-2">4.1 Stream Counting</h3>
              <p>Streams are counted when:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>A track is played for at least 30 seconds (minimum threshold)</li>
                <li>User is logged in with a valid account</li>
                <li>Track is played through official platform player (not unauthorized downloads)</li>
                <li>Playback occurs within licensed territory (if territory restrictions apply)</li>
              </ul>

              <h3 className="text-xl font-bold mt-4 mb-2">4.2 Geographic Distribution</h3>
              <p>
                Royalties are calculated based on geographic distribution of streams. Premium tier subscribers may generate 
                higher per-stream rates than free tier users (ad-supported).
              </p>

              <h3 className="text-xl font-bold mt-4 mb-2">4.3 Subscription Tier Impact</h3>
              <div className="bg-spotify-dark-gray rounded-lg p-4">
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-white/80">
                  <li><strong>Premium Tier:</strong> Higher per-stream rate (no ads)</li>
                  <li><strong>Free Tier:</strong> Lower per-stream rate (ad-supported)</li>
                  <li><strong>Artist Tier:</strong> Same rates as Premium, plus revenue share opportunities</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Transparency and Reporting</h2>
              
              <div className="bg-spotify-dark-gray rounded-lg p-4">
                <h3 className="font-bold mb-2">Artist Dashboard Features:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4 text-sm text-white/80">
                  <li><strong>Real-Time Streaming Stats:</strong> Live or near real-time stream counts</li>
                  <li><strong>Monthly Royalty Statements:</strong> Detailed breakdown of earnings per track</li>
                  <li><strong>Payout History:</strong> Complete record of all payouts (downloadable PDFs)</li>
                  <li><strong>Revenue Analytics:</strong> Trends, top-performing tracks, geographic distribution</li>
                  <li><strong>Mood Tag Performance:</strong> Analytics on which mood tags drive streams</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Tax Requirements</h2>
              
              <div className="bg-yellow-600/20 border border-yellow-600/50 rounded-lg p-4">
                <p className="font-bold text-yellow-400 mb-2">⚠️ Tax Documentation Required</p>
                <p className="text-sm text-white/80 mb-2">
                  All artists must provide tax documentation before receiving payouts:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-white/80">
                  <li><strong>U.S. Artists:</strong> W-9 form (required for tax reporting to IRS)</li>
                  <li><strong>International Artists:</strong> Equivalent tax documentation (W-8BEN or country-specific forms)</li>
                  <li><strong>Reporting:</strong> We report all payouts to IRS (Form 1099 for U.S. artists)</li>
                </ul>
              </div>
              <p className="mt-2 text-sm text-white/80">
                Payouts may be delayed until tax documentation is complete and verified.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Disputes and Adjustments</h2>
              
              <p>If you believe there's an error in your royalty calculation:</p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Review your monthly statement in the Artist Dashboard</li>
                <li>Check stream counts and ownership percentages</li>
                <li>Contact support at <a href="mailto:royalties@yourplatform.com" className="text-spotify-green hover:underline">royalties@yourplatform.com</a> with detailed information</li>
                <li>Disputes are reviewed within 30 days</li>
                <li>Adjustments (if valid) are applied to next month's payout</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Recoupment (Artist-Investor Model)</h2>
              
              <p className="text-sm text-white/80">
                If you've received advances or investment through our Artist-Investor program, royalties may be subject 
                to recoupment. Your dashboard will show recoupment status and remaining balance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Additional Resources</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <Link href="/legal/pro-guide" className="text-spotify-green hover:underline">
                    PRO Registration Guide
                  </Link> - How to register with PROs to collect performance royalties
                </li>
                <li>
                  <Link href="/help/upload-guidelines" className="text-spotify-green hover:underline">
                    Upload Guidelines
                  </Link> - How to provide accurate metadata for royalty distribution
                </li>
                <li>
                  <Link href="/legal/terms" className="text-spotify-green hover:underline">
                    Terms of Service
                  </Link> - Complete legal terms and conditions
                </li>
                <li>
                  <a href="mailto:royalties@yourplatform.com" className="text-spotify-green hover:underline">
                    royalties@yourplatform.com
                  </a> - Contact support for royalty questions
                </li>
              </ul>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-spotify-text-gray/30">
            <div className="flex items-center gap-4">
              <button className="btn-secondary flex items-center gap-2">
                <Download size={18} />
                Download PDF
              </button>
              <Link href="/legal/terms" className="text-spotify-green hover:underline">
                View Terms of Service →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
