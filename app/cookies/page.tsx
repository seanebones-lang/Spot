<<<<<<< HEAD
"use client";

import Link from "next/link";
import { Cookie, Settings, Shield, BarChart3 } from "lucide-react";

export default function CookiesPage() {
  return (
    <div
      className="min-h-screen bg-spotify-dark text-white p-8"
      style={{
        minHeight: "100vh",
        backgroundColor: "#121212",
        padding: "32px",
        color: "#FFFFFF",
      }}
    >
      <div
        className="max-w-6xl mx-auto"
        style={{
          maxWidth: "1152px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div className="mb-12" style={{ marginBottom: "48px" }}>
          <h1
            className="text-5xl font-bold mb-4"
            style={{
              fontSize: "48px",
              lineHeight: "56px",
              fontWeight: 900,
              color: "#FFFFFF",
              marginBottom: "16px",
=======
'use client';

import Link from 'next/link';
import { Cookie, Settings, Shield, BarChart3 } from 'lucide-react';

export default function CookiesPage() {
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
        {/* Header */}
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
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            Cookie Policy
          </h1>
<<<<<<< HEAD
          <p
            className="text-xl text-spotify-text-gray max-w-3xl"
            style={{
              fontSize: "20px",
              lineHeight: "28px",
              color: "#B3B3B3",
              maxWidth: "672px",
            }}
          >
            How we use cookies and similar technologies to enhance your
            experience on EmPulse Music.
=======
          <p 
            className="text-xl text-spotify-text-gray max-w-3xl"
            style={{
              fontSize: '20px',
              lineHeight: '28px',
              color: '#B3B3B3',
              maxWidth: '672px'
            }}
          >
            How we use cookies and similar technologies to enhance your experience on EmPulse Music.
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          </p>
        </div>

        {/* What Are Cookies */}
        <section className="mb-16">
<<<<<<< HEAD
          <div
            className="bg-spotify-light-gray rounded-lg p-8"
            style={{
              backgroundColor: "#282828",
              borderRadius: "8px",
              padding: "32px",
            }}
          >
            <h2
              className="text-3xl font-bold mb-6"
              style={{
                fontSize: "32px",
                lineHeight: "40px",
                fontWeight: 900,
                color: "#FFFFFF",
                marginBottom: "24px",
=======
          <div 
            className="bg-spotify-light-gray rounded-lg p-8"
            style={{
              backgroundColor: '#282828',
              borderRadius: '8px',
              padding: '32px'
            }}
          >
            <h2 
              className="text-3xl font-bold mb-6"
              style={{
                fontSize: '32px',
                lineHeight: '40px',
                fontWeight: 900,
                color: '#FFFFFF',
                marginBottom: '24px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              }}
            >
              What Are Cookies?
            </h2>
<<<<<<< HEAD
            <p
              className="text-lg text-spotify-text-gray leading-relaxed mb-4"
              style={{
                fontSize: "18px",
                lineHeight: "28px",
                color: "#B3B3B3",
                marginBottom: "16px",
              }}
            >
              Cookies are small text files that are placed on your device when
              you visit our website. They help us provide, protect, and improve
              our services by remembering your preferences and understanding how
              you use our platform.
            </p>
            <p
              className="text-lg text-spotify-text-gray leading-relaxed"
              style={{
                fontSize: "18px",
                lineHeight: "28px",
                color: "#B3B3B3",
              }}
            >
              We use both session cookies (which expire when you close your
              browser) and persistent cookies (which remain on your device until
              they expire or you delete them).
=======
            <p 
              className="text-lg text-spotify-text-gray leading-relaxed mb-4"
              style={{
                fontSize: '18px',
                lineHeight: '28px',
                color: '#B3B3B3',
                marginBottom: '16px'
              }}
            >
              Cookies are small text files that are placed on your device when you visit our website. 
              They help us provide, protect, and improve our services by remembering your preferences 
              and understanding how you use our platform.
            </p>
            <p 
              className="text-lg text-spotify-text-gray leading-relaxed"
              style={{
                fontSize: '18px',
                lineHeight: '28px',
                color: '#B3B3B3'
              }}
            >
              We use both session cookies (which expire when you close your browser) and persistent 
              cookies (which remain on your device until they expire or you delete them).
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            </p>
          </div>
        </section>

        {/* Cookie Types */}
        <section className="mb-16">
<<<<<<< HEAD
          <h2
            className="text-3xl font-bold mb-8"
            style={{
              fontSize: "32px",
              lineHeight: "40px",
              fontWeight: 900,
              color: "#FFFFFF",
              marginBottom: "32px",
=======
          <h2 
            className="text-3xl font-bold mb-8"
            style={{
              fontSize: '32px',
              lineHeight: '40px',
              fontWeight: 900,
              color: '#FFFFFF',
              marginBottom: '32px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            Types of Cookies We Use
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Shield,
<<<<<<< HEAD
                title: "Essential Cookies",
                description:
                  "Required for the platform to function properly. These include authentication, security, and session management cookies. They cannot be disabled.",
                required: true,
              },
              {
                icon: BarChart3,
                title: "Analytics Cookies",
                description:
                  "Help us understand how visitors interact with our platform. We use this data to improve performance and user experience.",
                required: false,
              },
              {
                icon: Settings,
                title: "Preference Cookies",
                description:
                  "Remember your settings and preferences, such as language, volume, playback quality, and theme preferences.",
                required: false,
              },
              {
                icon: Cookie,
                title: "Marketing Cookies",
                description:
                  "Used to deliver relevant advertisements and track campaign performance. These help us support free features on our platform.",
                required: false,
              },
=======
                title: 'Essential Cookies',
                description: 'Required for the platform to function properly. These include authentication, security, and session management cookies. They cannot be disabled.',
                required: true
              },
              {
                icon: BarChart3,
                title: 'Analytics Cookies',
                description: 'Help us understand how visitors interact with our platform. We use this data to improve performance and user experience.',
                required: false
              },
              {
                icon: Settings,
                title: 'Preference Cookies',
                description: 'Remember your settings and preferences, such as language, volume, playback quality, and theme preferences.',
                required: false
              },
              {
                icon: Cookie,
                title: 'Marketing Cookies',
                description: 'Used to deliver relevant advertisements and track campaign performance. These help us support free features on our platform.',
                required: false
              }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            ].map((cookie, index) => (
              <div
                key={index}
                className="bg-spotify-light-gray rounded-lg p-6 hover:bg-spotify-light-gray/80 transition-colors"
                style={{
<<<<<<< HEAD
                  backgroundColor: "#282828",
                  borderRadius: "8px",
                  padding: "24px",
                  transition: "background-color 0.2s",
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <cookie.icon
                    size={32}
                    className="text-spotify-green"
                    style={{ color: "#1DB954" }}
                  />
                  {cookie.required && (
                    <span
                      className="text-xs font-bold px-2 py-1 rounded bg-red-500/20 text-red-400"
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        padding: "4px 8px",
                        borderRadius: "4px",
                        backgroundColor: "rgba(239, 68, 68, 0.2)",
                        color: "#f87171",
=======
                  backgroundColor: '#282828',
                  borderRadius: '8px',
                  padding: '24px',
                  transition: 'background-color 0.2s'
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <cookie.icon 
                    size={32} 
                    className="text-spotify-green"
                    style={{ color: '#7209B7' }}
                  />
                  {cookie.required && (
                    <span 
                      className="text-xs font-bold px-2 py-1 rounded bg-red-500/20 text-red-400"
                      style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: 'rgba(239, 68, 68, 0.2)',
                        color: '#f87171'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                      }}
                    >
                      Required
                    </span>
                  )}
                </div>
<<<<<<< HEAD
                <h3
                  className="text-xl font-bold mb-2"
                  style={{
                    fontSize: "20px",
                    lineHeight: "28px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    marginBottom: "8px",
=======
                <h3 
                  className="text-xl font-bold mb-2"
                  style={{
                    fontSize: '20px',
                    lineHeight: '28px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    marginBottom: '8px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  }}
                >
                  {cookie.title}
                </h3>
<<<<<<< HEAD
                <p
                  className="text-spotify-text-gray"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#B3B3B3",
=======
                <p 
                  className="text-spotify-text-gray"
                  style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#B3B3B3'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  }}
                >
                  {cookie.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Managing Cookies */}
        <section className="mb-16">
<<<<<<< HEAD
          <div
            className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg p-8 border border-purple-600/30"
            style={{
              background:
                "linear-gradient(to right, rgba(114, 9, 183, 0.2), rgba(69, 123, 157, 0.2))",
              borderRadius: "8px",
              padding: "32px",
              border: "1px solid rgba(114, 9, 183, 0.3)",
            }}
          >
            <h2
              className="text-3xl font-bold mb-6"
              style={{
                fontSize: "32px",
                lineHeight: "40px",
                fontWeight: 900,
                color: "#FFFFFF",
                marginBottom: "24px",
=======
          <div 
            className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg p-8 border border-purple-600/30"
            style={{
              background: 'linear-gradient(to right, rgba(114, 9, 183, 0.2), rgba(69, 123, 157, 0.2))',
              borderRadius: '8px',
              padding: '32px',
              border: '1px solid rgba(114, 9, 183, 0.3)'
            }}
          >
            <h2 
              className="text-3xl font-bold mb-6"
              style={{
                fontSize: '32px',
                lineHeight: '40px',
                fontWeight: 900,
                color: '#FFFFFF',
                marginBottom: '24px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              }}
            >
              Managing Your Cookie Preferences
            </h2>
<<<<<<< HEAD
            <p
              className="text-lg text-spotify-text-gray mb-6"
              style={{
                fontSize: "18px",
                lineHeight: "28px",
                color: "#B3B3B3",
                marginBottom: "24px",
=======
            <p 
              className="text-lg text-spotify-text-gray mb-6"
              style={{
                fontSize: '18px',
                lineHeight: '28px',
                color: '#B3B3B3',
                marginBottom: '24px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              }}
            >
              You can control and manage cookies in several ways:
            </p>
            <div className="space-y-4 mb-8">
              {[
                {
<<<<<<< HEAD
                  title: "Browser Settings",
                  description:
                    "Most browsers allow you to control cookies through their settings. You can delete existing cookies or block new ones. However, blocking essential cookies may affect platform functionality.",
                },
                {
                  title: "Platform Settings",
                  description:
                    "You can manage cookie preferences through your account settings. Go to Settings → Privacy → Cookie Preferences to control non-essential cookies.",
                },
                {
                  title: "Opt-Out Tools",
                  description:
                    "You can use industry opt-out tools like the Network Advertising Initiative or Digital Advertising Alliance to manage advertising cookies from third parties.",
                },
              ].map((option, index) => (
                <div
                  key={index}
                  className="pb-4 border-b border-white/10 last:border-b-0"
                  style={{
                    paddingBottom: index < 2 ? "16px" : "0",
                    borderBottom:
                      index < 2 ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
                  }}
                >
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{
                      fontSize: "20px",
                      lineHeight: "28px",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      marginBottom: "8px",
=======
                  title: 'Browser Settings',
                  description: 'Most browsers allow you to control cookies through their settings. You can delete existing cookies or block new ones. However, blocking essential cookies may affect platform functionality.'
                },
                {
                  title: 'Platform Settings',
                  description: 'You can manage cookie preferences through your account settings. Go to Settings → Privacy → Cookie Preferences to control non-essential cookies.'
                },
                {
                  title: 'Opt-Out Tools',
                  description: 'You can use industry opt-out tools like the Network Advertising Initiative or Digital Advertising Alliance to manage advertising cookies from third parties.'
                }
              ].map((option, index) => (
                <div 
                  key={index}
                  className="pb-4 border-b border-white/10 last:border-b-0"
                  style={{
                    paddingBottom: index < 2 ? '16px' : '0',
                    borderBottom: index < 2 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
                  }}
                >
                  <h3 
                    className="text-xl font-bold mb-2"
                    style={{
                      fontSize: '20px',
                      lineHeight: '28px',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      marginBottom: '8px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                    }}
                  >
                    {option.title}
                  </h3>
<<<<<<< HEAD
                  <p
                    className="text-spotify-text-gray"
                    style={{
                      fontSize: "14px",
                      lineHeight: "20px",
                      color: "#B3B3B3",
=======
                  <p 
                    className="text-spotify-text-gray"
                    style={{
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#B3B3B3'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                    }}
                  >
                    {option.description}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href="/settings/privacy"
<<<<<<< HEAD
              className="bg-spotify-green hover:bg-[#1ed760] text-black font-bold py-3 px-6 rounded-full transition-colors inline-block"
              style={{
                backgroundColor: "#1DB954",
                color: "#000000",
                fontWeight: 700,
                padding: "12px 24px",
                borderRadius: "9999px",
                transition: "background-color 0.2s",
=======
              className="bg-spotify-green hover:bg-[#8a1dd0] text-black font-bold py-3 px-6 rounded-full transition-colors inline-block"
              style={{
                backgroundColor: '#7209B7',
                color: '#000000',
                fontWeight: 700,
                padding: '12px 24px',
                borderRadius: '9999px',
                transition: 'background-color 0.2s'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              }}
            >
              Manage Cookie Settings
            </Link>
          </div>
        </section>

        {/* Third-Party Cookies */}
        <section className="mb-16">
<<<<<<< HEAD
          <div
            className="bg-spotify-light-gray rounded-lg p-8"
            style={{
              backgroundColor: "#282828",
              borderRadius: "8px",
              padding: "32px",
            }}
          >
            <h2
              className="text-3xl font-bold mb-6"
              style={{
                fontSize: "32px",
                lineHeight: "40px",
                fontWeight: 900,
                color: "#FFFFFF",
                marginBottom: "24px",
=======
          <div 
            className="bg-spotify-light-gray rounded-lg p-8"
            style={{
              backgroundColor: '#282828',
              borderRadius: '8px',
              padding: '32px'
            }}
          >
            <h2 
              className="text-3xl font-bold mb-6"
              style={{
                fontSize: '32px',
                lineHeight: '40px',
                fontWeight: 900,
                color: '#FFFFFF',
                marginBottom: '24px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              }}
            >
              Third-Party Cookies
            </h2>
<<<<<<< HEAD
            <p
              className="text-lg text-spotify-text-gray leading-relaxed mb-4"
              style={{
                fontSize: "18px",
                lineHeight: "28px",
                color: "#B3B3B3",
                marginBottom: "16px",
              }}
            >
              We also allow third-party services to set cookies on our platform
              for analytics, advertising, and functionality purposes. These
              third parties may include:
            </p>
            <ul
              className="list-disc list-inside space-y-2 text-spotify-text-gray ml-4"
              style={{
                fontSize: "18px",
                lineHeight: "28px",
                color: "#B3B3B3",
                marginLeft: "16px",
=======
            <p 
              className="text-lg text-spotify-text-gray leading-relaxed mb-4"
              style={{
                fontSize: '18px',
                lineHeight: '28px',
                color: '#B3B3B3',
                marginBottom: '16px'
              }}
            >
              We also allow third-party services to set cookies on our platform for analytics, 
              advertising, and functionality purposes. These third parties may include:
            </p>
            <ul 
              className="list-disc list-inside space-y-2 text-spotify-text-gray ml-4"
              style={{
                fontSize: '18px',
                lineHeight: '28px',
                color: '#B3B3B3',
                marginLeft: '16px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              }}
            >
              <li>Analytics providers (Google Analytics, etc.)</li>
              <li>Advertising networks</li>
              <li>Social media platforms (for sharing features)</li>
              <li>Content delivery networks</li>
            </ul>
<<<<<<< HEAD
            <p
              className="text-lg text-spotify-text-gray leading-relaxed mt-6"
              style={{
                fontSize: "18px",
                lineHeight: "28px",
                color: "#B3B3B3",
                marginTop: "24px",
              }}
            >
              These third-party cookies are subject to the privacy policies of
              the respective third-party providers.
=======
            <p 
              className="text-lg text-spotify-text-gray leading-relaxed mt-6"
              style={{
                fontSize: '18px',
                lineHeight: '28px',
                color: '#B3B3B3',
                marginTop: '24px'
              }}
            >
              These third-party cookies are subject to the privacy policies of the respective 
              third-party providers.
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            </p>
          </div>
        </section>

        {/* Updates */}
        <section>
<<<<<<< HEAD
          <div
            className="bg-spotify-light-gray rounded-lg p-8"
            style={{
              backgroundColor: "#282828",
              borderRadius: "8px",
              padding: "32px",
            }}
          >
            <h2
              className="text-2xl font-bold mb-4"
              style={{
                fontSize: "24px",
                lineHeight: "32px",
                fontWeight: 700,
                color: "#FFFFFF",
                marginBottom: "16px",
=======
          <div 
            className="bg-spotify-light-gray rounded-lg p-8"
            style={{
              backgroundColor: '#282828',
              borderRadius: '8px',
              padding: '32px'
            }}
          >
            <h2 
              className="text-2xl font-bold mb-4"
              style={{
                fontSize: '24px',
                lineHeight: '32px',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '16px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              }}
            >
              Updates to This Policy
            </h2>
<<<<<<< HEAD
            <p
              className="text-spotify-text-gray mb-4"
              style={{
                fontSize: "14px",
                lineHeight: "20px",
                color: "#B3B3B3",
                marginBottom: "16px",
              }}
            >
              We may update this Cookie Policy from time to time to reflect
              changes in our practices or for other operational, legal, or
              regulatory reasons. We will notify you of any material changes by
              posting the updated policy on this page.
            </p>
            <p
              className="text-spotify-text-gray"
              style={{
                fontSize: "14px",
                lineHeight: "20px",
                color: "#B3B3B3",
=======
            <p 
              className="text-spotify-text-gray mb-4"
              style={{
                fontSize: '14px',
                lineHeight: '20px',
                color: '#B3B3B3',
                marginBottom: '16px'
              }}
            >
              We may update this Cookie Policy from time to time to reflect changes in our 
              practices or for other operational, legal, or regulatory reasons. We will notify 
              you of any material changes by posting the updated policy on this page.
            </p>
            <p 
              className="text-spotify-text-gray"
              style={{
                fontSize: '14px',
                lineHeight: '20px',
                color: '#B3B3B3'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              }}
            >
              This Cookie Policy was last updated on January 14, 2026.
            </p>
          </div>
        </section>

        {/* Links */}
        <section className="mt-8">
          <div className="flex flex-wrap gap-4">
            <Link
              href="/legal/privacy"
              className="text-spotify-green hover:underline"
<<<<<<< HEAD
              style={{ color: "#1DB954" }}
=======
              style={{ color: '#7209B7' }}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            >
              Privacy Policy →
            </Link>
            <Link
              href="/settings/privacy"
              className="text-spotify-green hover:underline"
<<<<<<< HEAD
              style={{ color: "#1DB954" }}
=======
              style={{ color: '#7209B7' }}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            >
              Privacy Settings →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
