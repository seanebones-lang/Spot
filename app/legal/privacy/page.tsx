'use client';

import { Download } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="bg-spotify-light-gray rounded-lg p-8 space-y-6">
          <div className="text-sm text-spotify-text-gray">
            <p>Last Updated: December 2025</p>
            <p>Effective Date: December 2025</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
              
              <h3 className="text-xl font-bold mt-4 mb-2">1.1 Account Information</h3>
              <p>When you create an account, we collect:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Email address and password</li>
                <li>Full legal name (for artists)</li>
                <li>Billing information (for paid subscriptions)</li>
                <li>Tax information (W-9 forms for U.S. artists, international equivalents)</li>
              </ul>

              <h3 className="text-xl font-bold mt-4 mb-2">1.2 Upload and Content Metadata</h3>
              <p>When you upload content, we collect and store:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Audio files and cover artwork</li>
                <li>Track metadata (titles, artist names, genres, release dates)</li>
                <li>Rights metadata (composer names, ownership percentages, ISRC/ISWC codes)</li>
                <li>Publisher information and PRO affiliations</li>
                <li>Legal declarations and warranties (with timestamps)</li>
              </ul>

              <h3 className="text-xl font-bold mt-4 mb-2">1.3 Legal Declaration Data (CRITICAL)</h3>
              <p className="font-bold text-yellow-400">
                For legal compliance and audit purposes, we collect and store:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Timestamps:</strong> All legal declarations are timestamped when submitted</li>
                <li><strong>IP Addresses:</strong> Your IP address is recorded with all upload submissions and legal declarations</li>
                <li><strong>Browser Information:</strong> User agent and browser fingerprint for security</li>
                <li><strong>Geographic Location:</strong> Approximate location based on IP address (for territory rights enforcement)</li>
              </ul>
              <p className="mt-2 text-spotify-text-gray">
                This data is stored for a minimum of 7 years (statute of limitations for copyright claims) and may be shared 
                with legal authorities, PROs, MLC, or third parties in response to legal requests or copyright disputes.
              </p>

              <h3 className="text-xl font-bold mt-4 mb-2">1.4 Usage Data</h3>
              <p>We automatically collect:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Streaming activity (tracks played, play counts, listening sessions)</li>
                <li>Device information (device type, operating system, browser)</li>
                <li>Interaction data (playlists created, favorites, mood tags applied)</li>
                <li>Performance metrics (quality settings, bandwidth usage)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Content Distribution:</strong> To stream, distribute, and display your uploaded content</li>
                <li><strong>Royalty Calculation:</strong> To calculate and distribute royalties based on streaming activity</li>
                <li><strong>PRO/MLC Reporting:</strong> To report usage data to Performance Rights Organizations and Mechanical Licensing Collective</li>
                <li><strong>Legal Compliance:</strong> To comply with copyright laws, DMCA requirements, and legal obligations</li>
                <li><strong>Service Improvement:</strong> To analyze usage patterns and improve our platform</li>
                <li><strong>Communication:</strong> To send account updates, royalty statements, and service notifications</li>
                <li><strong>Fraud Prevention:</strong> To detect and prevent fraud, unauthorized access, and copyright infringement</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Legal Disclosure and Data Sharing</h2>
              
              <h3 className="text-xl font-bold mt-4 mb-2">3.1 Required Disclosures</h3>
              <p>We may disclose your information to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Performance Rights Organizations (PROs):</strong> ASCAP, BMI, SESAC, GMR for royalty reporting and license verification</li>
                <li><strong>Mechanical Licensing Collective (MLC):</strong> Quarterly usage reports with composer/songwriter metadata</li>
                <li><strong>Government Authorities:</strong> In response to legal requests, court orders, or regulatory investigations</li>
                <li><strong>Copyright Holders:</strong> In response to DMCA takedown requests or copyright disputes</li>
                <li><strong>Legal Representatives:</strong> Our attorneys and legal advisors for compliance and dispute resolution</li>
              </ul>

              <h3 className="text-xl font-bold mt-4 mb-2">3.2 Data Retention for Legal Audits</h3>
              <p>
                Legal declaration data (timestamps, IP addresses, metadata) is retained for a <strong>minimum of 7 years</strong> 
                to comply with copyright statute of limitations and potential legal disputes. This data may be used as evidence 
                in copyright infringement cases, DMCA disputes, or regulatory investigations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your data, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Encryption at Rest:</strong> All stored files and metadata are encrypted using AES-256</li>
                <li><strong>Encryption in Transit:</strong> All data transmission uses TLS 1.3</li>
                <li><strong>Access Controls:</strong> Role-based access control (RBAC) for administrative access</li>
                <li><strong>Audit Logging:</strong> All data access and modifications are logged for security audits</li>
                <li><strong>Regular Security Audits:</strong> Third-party security assessments and vulnerability scanning</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Your Rights (GDPR/CCPA Compliance)</h2>
              
              <h3 className="text-xl font-bold mt-4 mb-2">5.1 Data Access</h3>
              <p>You have the right to request access to your personal data, including uploaded content metadata and legal declarations.</p>

              <h3 className="text-xl font-bold mt-4 mb-2">5.2 Data Deletion</h3>
              <p className="text-yellow-400 font-bold">
                <strong>Important:</strong> Due to legal compliance requirements (copyright laws, PRO/MLC reporting, 7-year retention 
                for legal audits), certain data cannot be deleted immediately:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Legal declaration data (timestamps, IP addresses) must be retained for 7 years</li>
                <li>Royalty reporting data must be retained for tax and regulatory compliance</li>
                <li>Content metadata cannot be deleted if your content is still distributed</li>
              </ul>

              <h3 className="text-xl font-bold mt-4 mb-2">5.3 Data Portability</h3>
              <p>
                You may request a copy of your data in a machine-readable format. Contact{' '}
                <a href="mailto:privacy@yourplatform.com" className="text-spotify-green hover:underline">
                  privacy@yourplatform.com
                </a> for data export requests.
              </p>

              <h3 className="text-xl font-bold mt-4 mb-2">5.4 Opt-Out Rights (CCPA)</h3>
              <p>
                California residents have the right to opt-out of the sale of personal information. Note: We do not sell your 
                personal information, but we may share usage data with PROs/MLC for royalty reporting as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to maintain your session, analyze usage patterns, and improve 
                service performance. You can manage cookie preferences in your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Third-Party Services</h2>
              <p>
                We may use third-party services for analytics, payment processing, content delivery (CDN), and metadata validation. 
                These services are bound by their own privacy policies and security standards.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. International Data Transfers</h2>
              <p>
                Your data may be transferred to and stored on servers located outside your country of residence. We ensure 
                appropriate safeguards are in place for international data transfers in compliance with GDPR and other applicable laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Children's Privacy</h2>
              <p>
                Our Service is not intended for users under 13 years of age. We do not knowingly collect personal information 
                from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the 
                new policy on this page and updating the "Last Updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Contact Information</h2>
              <p>
                For privacy-related questions or requests, please contact us at:{' '}
                <a href="mailto:privacy@yourplatform.com" className="text-spotify-green hover:underline">
                  privacy@yourplatform.com
                </a>
              </p>
              <p className="mt-2">
                Data Protection Officer:{' '}
                <a href="mailto:dpo@yourplatform.com" className="text-spotify-green hover:underline">
                  dpo@yourplatform.com
                </a>
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-spotify-text-gray/30">
            <div className="flex items-center gap-4">
              <button className="btn-secondary flex items-center gap-2">
                <Download size={18} />
                Download PDF
              </button>
              <a href="/legal/terms" className="text-spotify-green hover:underline">
                View Terms of Service →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
