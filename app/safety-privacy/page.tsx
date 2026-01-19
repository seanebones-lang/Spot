"use client";

import Link from "next/link";
import {
  Shield,
  Lock,
  Eye,
  AlertTriangle,
  Users,
  FileText,
} from "lucide-react";

export default function SafetyPrivacyPage() {
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
            }}
          >
            Safety & Privacy Center
          </h1>
          <p
            className="text-xl text-spotify-text-gray max-w-3xl"
            style={{
              fontSize: "20px",
              lineHeight: "28px",
              color: "#B3B3B3",
              maxWidth: "672px",
            }}
          >
            Your safety and privacy are our top priorities. Learn about our
            policies, tools, and resources to help you stay safe and in control
            of your data.
          </p>
        </div>

        {/* Quick Links */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Privacy Policy",
                description:
                  "How we collect, use, and protect your personal information.",
                href: "/legal/privacy",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: Lock,
                title: "Security Settings",
                description:
                  "Manage your account security, passwords, and two-factor authentication.",
                href: "/settings/security",
                color: "from-green-500 to-green-600",
              },
              {
                icon: Eye,
                title: "Privacy Settings",
                description:
                  "Control who can see your activity, profile, and listening history.",
                href: "/settings/privacy",
                color: "from-purple-500 to-purple-600",
              },
              {
                icon: Users,
                title: "Community Guidelines",
                description:
                  "Our community standards and expectations for respectful interaction.",
                href: "/community",
                color: "from-yellow-500 to-yellow-600",
              },
              {
                icon: AlertTriangle,
                title: "Report Content",
                description:
                  "Report inappropriate content, harassment, or copyright violations.",
                href: "/support",
                color: "from-red-500 to-red-600",
              },
              {
                icon: FileText,
                title: "Legal Documents",
                description:
                  "Terms of Service, DMCA Policy, and other legal information.",
                href: "/legal",
                color: "from-gray-500 to-gray-600",
              },
            ].map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={`bg-gradient-to-br ${link.color} rounded-lg p-6 hover:opacity-90 transition-opacity`}
                style={{
                  borderRadius: "8px",
                  padding: "24px",
                  transition: "opacity 0.2s",
                }}
              >
                <link.icon
                  size={32}
                  className="mb-4 text-white"
                  style={{ color: "#FFFFFF", marginBottom: "16px" }}
                />
                <h3
                  className="text-xl font-bold mb-2"
                  style={{
                    fontSize: "20px",
                    lineHeight: "28px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    marginBottom: "8px",
                  }}
                >
                  {link.title}
                </h3>
                <p
                  className="text-white/80 text-sm"
                  style={{
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "14px",
                    lineHeight: "20px",
                  }}
                >
                  {link.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Privacy Overview */}
        <section className="mb-16">
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
              }}
            >
              Your Privacy Rights
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: "Data Control",
                  description:
                    "You have the right to access, update, or delete your personal data at any time through your account settings.",
                },
                {
                  title: "Data Minimization",
                  description:
                    "We only collect data necessary to provide our services and improve your experience. You can opt out of optional data collection.",
                },
                {
                  title: "Transparency",
                  description:
                    "We clearly explain what data we collect, why we collect it, and how we use it in our Privacy Policy.",
                },
                {
                  title: "Security",
                  description:
                    "We use industry-standard encryption, secure authentication, and regular security audits to protect your information.",
                },
              ].map((right, index) => (
                <div
                  key={index}
                  className="pb-4 border-b border-white/10 last:border-b-0"
                  style={{
                    paddingBottom: "16px",
                    borderBottom:
                      index < 3 ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
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
                    }}
                  >
                    {right.title}
                  </h3>
                  <p
                    className="text-spotify-text-gray"
                    style={{
                      fontSize: "14px",
                      lineHeight: "20px",
                      color: "#B3B3B3",
                    }}
                  >
                    {right.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Safety Resources */}
        <section className="mb-16">
          <h2
            className="text-3xl font-bold mb-8"
            style={{
              fontSize: "32px",
              lineHeight: "40px",
              fontWeight: 900,
              color: "#FFFFFF",
              marginBottom: "32px",
            }}
          >
            Safety Resources
          </h2>
          <div
            className="bg-spotify-light-gray rounded-lg p-8"
            style={{
              backgroundColor: "#282828",
              borderRadius: "8px",
              padding: "32px",
            }}
          >
            <div className="space-y-6">
              {[
                {
                  title: "Blocking Users",
                  description:
                    "You can block users to prevent them from viewing your profile or contacting you. Blocked users cannot see your activity or send you messages.",
                  action: "Go to Settings → Privacy",
                },
                {
                  title: "Reporting Content",
                  description:
                    "If you encounter inappropriate content, harassment, or copyright violations, you can report it directly from the content or user profile.",
                  action: "Use the Report button on any content",
                },
                {
                  title: "Private Mode",
                  description:
                    "Enable private mode to hide your listening activity from others. Your playlists and profile remain visible, but your real-time activity is private.",
                  action: "Go to Settings → Privacy → Private Mode",
                },
                {
                  title: "Data Download",
                  description:
                    "You can download a copy of all your data, including playlists, listening history, and account information, at any time.",
                  action: "Go to Settings → Account → Download Data",
                },
              ].map((resource, index) => (
                <div
                  key={index}
                  className="pb-6 border-b border-white/10 last:border-b-0 last:pb-0"
                  style={{
                    paddingBottom: index < 3 ? "24px" : "0",
                    borderBottom:
                      index < 3 ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
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
                    }}
                  >
                    {resource.title}
                  </h3>
                  <p
                    className="text-spotify-text-gray mb-3"
                    style={{
                      fontSize: "14px",
                      lineHeight: "20px",
                      color: "#B3B3B3",
                      marginBottom: "12px",
                    }}
                  >
                    {resource.description}
                  </p>
                  <p
                    className="text-spotify-green text-sm font-medium"
                    style={{
                      color: "#7209B7",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    {resource.action} →
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <div
            className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg p-8 border border-purple-600/30 text-center"
            style={{
              background:
                "linear-gradient(to right, rgba(114, 9, 183, 0.2), rgba(69, 123, 157, 0.2))",
              borderRadius: "8px",
              padding: "32px",
              border: "1px solid rgba(114, 9, 183, 0.3)",
              textAlign: "center",
            }}
          >
            <h2
              className="text-3xl font-bold mb-4"
              style={{
                fontSize: "32px",
                lineHeight: "40px",
                fontWeight: 900,
                color: "#FFFFFF",
                marginBottom: "16px",
              }}
            >
              Need Help?
            </h2>
            <p
              className="text-lg text-spotify-text-gray mb-6"
              style={{
                fontSize: "18px",
                lineHeight: "28px",
                color: "#B3B3B3",
                marginBottom: "24px",
              }}
            >
              Our support team is here to help with any privacy or safety
              concerns.
            </p>
            <Link
              href="/support"
              className="bg-spotify-green hover:bg-[#8a1dd0] text-black font-bold py-3 px-6 rounded-full transition-colors inline-block"
              style={{
                backgroundColor: "#7209B7",
                color: "#000000",
                fontWeight: 700,
                padding: "12px 24px",
                borderRadius: "9999px",
                transition: "background-color 0.2s",
              }}
            >
              Contact Support
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
