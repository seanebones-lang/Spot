'use client';

import { Download, ExternalLink } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="bg-spotify-light-gray rounded-lg p-8 space-y-6">
          <div className="text-sm text-spotify-text-gray">
            <p>Last Updated: December 2025</p>
            <p>Effective Date: December 2025</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using this music streaming platform (the "Service"), you agree to be bound by these Terms of Service 
                ("Terms"). If you do not agree to these Terms, do not use the Service. We reserve the right to modify these Terms at 
                any time, and such modifications shall be effective immediately upon posting.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. User Accounts</h2>
              <p>
                To access certain features of the Service, you must register for an account. You agree to provide accurate, current, 
                and complete information during registration and to update such information as necessary. You are responsible for 
                maintaining the confidentiality of your account credentials and for all activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Content Upload and Artist Agreements</h2>
              <h3 className="text-xl font-bold mt-4 mb-2">3.1 Direct Upload Requirements</h3>
              <p>
                Artists who upload content directly to the Service (the "Uploader") must comply with all legal requirements for 
                music distribution in the United States, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Providing complete and accurate metadata, including full legal names of all composers, songwriters, and lyricists</li>
                <li>Declaring ownership percentages for composition and master recording rights</li>
                <li>Obtaining all necessary licenses for covers, samples, and interpolations</li>
                <li>Ensuring compliance with Performance Rights Organizations (PROs): ASCAP, BMI, SESAC, and Global Music Rights</li>
                <li>Complying with Mechanical Licensing Collective (MLC) requirements</li>
              </ul>

              <h3 className="text-xl font-bold mt-4 mb-2">3.2 Legal Warranties and Representations</h3>
              <p className="font-bold text-red-400 mb-2">By uploading content, you warrant and represent that:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Master Recording Ownership:</strong> You own and/or control 100% of the master recording rights for the 
                  uploaded content, or you have valid licenses from all rights holders to distribute the recording.
                </li>
                <li>
                  <strong>Original Composition:</strong> The composition is original, or you have obtained all necessary licenses 
                  for any interpolations, samples, or covers. You have properly cleared all third-party material.
                </li>
                <li>
                  <strong>Samples and Covers Cleared:</strong> All samples, interpolations, and covers have been properly cleared. 
                  For covers, you have obtained mechanical licenses via the Harry Fox Agency (HFA) or Mechanical Licensing Collective 
                  (MLC) as required by law.
                </li>
                <li>
                  <strong>Metadata Accuracy:</strong> All metadata provided during upload (including composer names, ownership 
                  percentages, ISRC codes, ISWC codes, and PRO affiliations) is accurate and complete.
                </li>
                <li>
                  <strong>Legal Names:</strong> You have provided full legal first and last names (not nicknames or initials) for 
                  all composers, songwriters, and lyricists as required for PRO matching and royalty distribution.
                </li>
              </ul>

              <h3 className="text-xl font-bold mt-4 mb-2">3.3 Indemnification</h3>
              <p className="font-bold text-red-400 mb-2">
                You agree to indemnify, defend, and hold harmless the platform, its affiliates, and their respective officers, 
                directors, employees, and agents from and against any claims, damages, losses, liabilities, and expenses (including 
                reasonable legal fees) arising from:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your breach of these warranties or any provision of these Terms</li>
                <li>Any copyright infringement claims related to your uploaded content</li>
                <li>Any claims by third parties alleging rights in your content</li>
                <li>Inaccurate or incomplete metadata provided during upload</li>
              </ul>

              <h3 className="text-xl font-bold mt-4 mb-2">3.4 Consequences of False Declarations</h3>
              <p>
                False declarations may result in immediate content takedown without notice, account termination and permanent ban, 
                legal liability for copyright infringement, exposure to DMCA takedown notices and lawsuits, and liability for damages 
                including legal fees. All declarations are timestamped and stored for legal audits. Your IP address is recorded.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Intellectual Property Rights</h2>
              <p>
                The Service and its original content, features, and functionality are owned by us and are protected by international 
                copyright, trademark, patent, trade secret, and other intellectual property laws. You retain all ownership rights to 
                your uploaded content, subject to the licenses granted herein.
              </p>
              <p className="mt-2">
                By uploading content, you grant us a non-exclusive, worldwide, royalty-free license to stream, distribute, and 
                display your content through the Service, subject to our payment of royalties as described in our 
                <a href="/legal/royalty-policy" className="text-spotify-green hover:underline ml-1">Royalty Policy</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. PRO Registration and Royalty Collection</h2>
              <p>
                Artists are strongly encouraged to register with a Performance Rights Organization (PRO) such as ASCAP, BMI, SESAC, 
                or Global Music Rights to collect performance royalties. While our platform holds blanket licenses with these PROs 
                for legal streaming, artists must register their own works with a PRO to receive performance royalty distributions.
              </p>
              <p className="mt-2">
                For more information, see our{' '}
                <a href="/legal/pro-guide" className="text-spotify-green hover:underline">PRO Registration Guide</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Content Restrictions</h2>
              <p>You agree not to upload content that:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Infringes on any copyright, trademark, or other intellectual property rights</li>
                <li>Contains illegal, harmful, or offensive material</li>
                <li>Violates any applicable laws or regulations</li>
                <li>Contains false or misleading metadata</li>
                <li>Is not properly licensed for distribution</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. DMCA and Copyright Takedown Policy</h2>
              <p>
                We respect intellectual property rights and comply with the Digital Millennium Copyright Act (DMCA). For details 
                on our DMCA takedown procedures, see our{' '}
                <a href="/legal/dmca" className="text-spotify-green hover:underline">DMCA Policy</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Royalty Payments</h2>
              <p>
                Royalty payments are calculated based on streaming activity and distributed according to our{' '}
                <a href="/legal/royalty-policy" className="text-spotify-green hover:underline">Royalty Policy</a>. 
                Platform fees (10-20% of revenue) are deducted before artist payouts. Mechanical royalties are paid to the 
                Mechanical Licensing Collective (MLC) on behalf of composers and songwriters.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Termination</h2>
              <p>
                We reserve the right to terminate or suspend your account and access to the Service immediately, without prior 
                notice, for any breach of these Terms, including false declarations, copyright infringement, or violation of 
                applicable laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, 
                or punitive damages arising from your use of the Service or uploaded content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the United States and the state in 
                which our platform is headquartered, without regard to conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">12. Contact Information</h2>
              <p>
                For questions about these Terms, please contact us at:{' '}
                <a href="mailto:legal@yourplatform.com" className="text-spotify-green hover:underline">
                  legal@yourplatform.com
                </a>
              </p>
              <p className="mt-2">
                DMCA Agent: See our{' '}
                <a href="/legal/dmca" className="text-spotify-green hover:underline">DMCA Policy</a> for takedown requests.
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-spotify-text-gray/30">
            <div className="flex items-center gap-4">
              <button className="btn-secondary flex items-center gap-2">
                <Download size={18} />
                Download PDF
              </button>
              <a href="/legal/privacy" className="text-spotify-green hover:underline">
                View Privacy Policy →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
