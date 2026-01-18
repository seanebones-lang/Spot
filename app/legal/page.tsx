'use client';

import Link from 'next/link';
import { FileText, Shield, Copyright, DollarSign, Info, ExternalLink, Download } from 'lucide-react';

const legalPages = [
  {
    title: 'Terms of Service',
    description: 'Complete legal terms and conditions including upload requirements, warranties, and indemnification clauses.',
    href: '/legal/terms',
    icon: FileText,
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: 'Privacy Policy',
    description: 'How we collect, use, and protect your data. Includes information about IP tracking, legal declarations, and GDPR/CCPA compliance.',
    href: '/legal/privacy',
    icon: Shield,
    color: 'from-green-500 to-green-600'
  },
  {
    title: 'DMCA Policy',
    description: 'Takedown procedures, counter-notification process, and copyright dispute resolution. Contact information for our DMCA agent.',
    href: '/legal/dmca',
    icon: Copyright,
    color: 'from-red-500 to-red-600'
  },
  {
    title: 'Royalty Policy',
    description: 'How royalties work, payout schedules, revenue share model ($0.004/stream), and tax requirements for artists.',
    href: '/legal/royalty-policy',
    icon: DollarSign,
    color: 'from-purple-500 to-purple-600'
  },
  {
    title: 'PRO Registration Guide',
    description: 'How to register with ASCAP, BMI, SESAC, or GMR to collect performance royalties. Includes registration steps and royalty flow explanation.',
    href: '/legal/pro-guide',
    icon: Info,
    color: 'from-yellow-500 to-yellow-600'
  }
];

const helpPages = [
  {
    title: 'Upload Guidelines',
    description: 'Complete guide to uploading tracks including required fields, file formats, best practices, and what\'s not allowed.',
    href: '/help/upload-guidelines',
    icon: FileText,
    color: 'from-empulse-purple to-empulse-blue'
  }
];

export default function LegalHubPage() {
  return (
    <div 
      className="min-h-screen bg-spotify-dark text-white p-8"
      style={{
        minHeight: '100vh',
        backgroundColor: '#121212',
        padding: '32px',
        color: '#FFFFFF'
      }}
    >
      <div 
        className="max-w-6xl mx-auto"
        style={{
          maxWidth: '1152px',
          margin: '0 auto'
        }}
      >
        <div 
          className="mb-12"
          style={{ marginBottom: '48px' }}
        >
          <h1 
            className="text-5xl font-bold mb-4"
            style={{
              fontSize: '48px',
              lineHeight: '56px',
              fontWeight: 900,
              color: '#FFFFFF',
              marginBottom: '16px'
            }}
          >
            Legal & Policies
          </h1>
          <p 
            className="text-xl text-spotify-text-gray max-w-3xl"
            style={{
              fontSize: '20px',
              lineHeight: '28px',
              color: '#B3B3B3',
              maxWidth: '672px'
            }}
          >
            All legal documents, policies, and guidelines for using our platform. 
            These documents ensure legal compliance and protect both artists and listeners.
          </p>
        </div>

        {/* Legal Documents - Exact Spotify Style */}
        <div 
          className="mb-12"
          style={{ marginBottom: '48px' }}
        >
          <h2 
            className="text-3xl font-bold mb-6"
            style={{
              fontSize: '32px',
              lineHeight: '36px',
              fontWeight: 700,
              color: '#FFFFFF',
              marginBottom: '24px'
            }}
          >
            Legal Documents
          </h2>
          <div 
            className="grid md:grid-cols-2 gap-6"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '24px'
            }}
          >
            {legalPages.map((page) => {
              const Icon = page.icon;
              return (
                <Link
                  key={page.href}
                  href={page.href}
                  className="bg-spotify-light-gray hover:bg-spotify-dark-gray rounded-lg p-6 transition-all duration-200 group"
                  style={{
                    backgroundColor: '#181818',
                    borderRadius: '8px',
                    padding: '24px',
                    transition: 'background-color 200ms ease-out',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#282828';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#181818';
                  }}
                >
                  <div 
                    className={`w-16 h-16 bg-gradient-to-br ${page.color} rounded-lg flex items-center justify-center mb-4`}
                    style={{
                      width: '64px',
                      height: '64px',
                      background: `linear-gradient(135deg, ${page.color.split(' ')[1]} 0%, ${page.color.split(' ')[3]} 100%)`,
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                      flexShrink: 0
                    }}
                  >
                    <Icon 
                      className="w-8 h-8 text-white"
                      style={{
                        width: '32px',
                        height: '32px',
                        color: '#FFFFFF'
                      }}
                    />
                  </div>
                  <h3 
                    className="text-xl font-bold mb-2 group-hover:text-spotify-green transition-colors"
                    style={{
                      fontSize: '20px',
                      lineHeight: '28px',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      marginBottom: '8px',
                      transition: 'color 200ms ease-out'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#1DB954';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                  >
                    {page.title}
                  </h3>
                  <p 
                    className="text-spotify-text-gray text-sm mb-4"
                    style={{
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#B3B3B3',
                      marginBottom: '16px'
                    }}
                  >
                    {page.description}
                  </p>
                  <div 
                    className="flex items-center gap-2 text-spotify-green text-sm font-medium"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#1DB954',
                      fontSize: '14px',
                      lineHeight: '20px',
                      fontWeight: 600
                    }}
                  >
                    Read More
                    <ExternalLink 
                      size={16} 
                      className="group-hover:translate-x-1 transition-transform"
                      style={{
                        width: '16px',
                        height: '16px',
                        transition: 'transform 200ms ease-out'
                      }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Help & Guidelines */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Help & Guidelines</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {helpPages.map((page) => {
              const Icon = page.icon;
              return (
                <Link
                  key={page.href}
                  href={page.href}
                  className="bg-spotify-light-gray hover:bg-[#3e3e3e] rounded-lg p-6 transition-colors group"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${page.color} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-spotify-green transition-colors">
                    {page.title}
                  </h3>
                  <p className="text-spotify-text-gray text-sm mb-4">{page.description}</p>
                  <div className="flex items-center gap-2 text-spotify-green text-sm font-medium">
                    Read More
                    <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Important Information Box */}
        <div className="bg-yellow-600/20 border border-yellow-600/50 rounded-lg p-6 mb-8">
          <h3 className="font-bold text-yellow-400 mb-2 flex items-center gap-2">
            <Info size={24} />
            Important Legal Information
          </h3>
          <div className="space-y-2 text-sm text-white/80">
            <p>
              <strong>For Artists:</strong> Before uploading content, please review our{' '}
              <Link href="/help/upload-guidelines" className="text-spotify-green hover:underline">Upload Guidelines</Link>{' '}
              and <Link href="/legal/terms" className="text-spotify-green hover:underline">Terms of Service</Link>. 
              All uploads must comply with U.S. copyright law and include complete metadata for royalty distribution.
            </p>
            <p>
              <strong>Performance Royalties:</strong> Register with a PRO (ASCAP, BMI, SESAC, or GMR) to collect performance 
              royalties. See our <Link href="/legal/pro-guide" className="text-spotify-green hover:underline">PRO Registration Guide</Link> for details.
            </p>
            <p>
              <strong>Copyright Disputes:</strong> If you believe content infringes your copyright, see our{' '}
              <Link href="/legal/dmca" className="text-spotify-green hover:underline">DMCA Policy</Link> for takedown procedures.
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-spotify-light-gray rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-bold mb-2 text-white">For Artists</h4>
              <ul className="space-y-1 text-spotify-text-gray">
                <li>
                  <Link href="/help/upload-guidelines" className="hover:text-spotify-green hover:underline">
                    Upload Guidelines
                  </Link>
                </li>
                <li>
                  <Link href="/legal/pro-guide" className="hover:text-spotify-green hover:underline">
                    PRO Registration Guide
                  </Link>
                </li>
                <li>
                  <Link href="/legal/royalty-policy" className="hover:text-spotify-green hover:underline">
                    Royalty Policy
                  </Link>
                </li>
                <li>
                  <Link href="/upload" className="hover:text-spotify-green hover:underline">
                    Upload Track
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2 text-white">Legal Information</h4>
              <ul className="space-y-1 text-spotify-text-gray">
                <li>
                  <Link href="/legal/terms" className="hover:text-spotify-green hover:underline">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/legal/privacy" className="hover:text-spotify-green hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/legal/dmca" className="hover:text-spotify-green hover:underline">
                    DMCA Policy
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-spotify-green hover:underline">
                    Contact Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 bg-spotify-dark-gray rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Contact Information</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-spotify-text-gray">
            <div>
              <p className="font-bold text-white mb-1">General Legal Inquiries:</p>
              <a href="mailto:legal@yourplatform.com" className="text-spotify-green hover:underline">
                legal@yourplatform.com
              </a>
            </div>
            <div>
              <p className="font-bold text-white mb-1">DMCA Takedown Requests:</p>
              <a href="mailto:dmca@yourplatform.com" className="text-spotify-green hover:underline">
                dmca@yourplatform.com
              </a>
            </div>
            <div>
              <p className="font-bold text-white mb-1">Privacy Inquiries:</p>
              <a href="mailto:privacy@yourplatform.com" className="text-spotify-green hover:underline">
                privacy@yourplatform.com
              </a>
            </div>
            <div>
              <p className="font-bold text-white mb-1">Royalty Questions:</p>
              <a href="mailto:royalties@yourplatform.com" className="text-spotify-green hover:underline">
                royalties@yourplatform.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
