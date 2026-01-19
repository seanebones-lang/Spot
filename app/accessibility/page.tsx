"use client";

import Link from "next/link";
import {
  Accessibility,
  Keyboard,
  Eye,
  Headphones,
  MousePointer2,
  CheckCircle2,
} from "lucide-react";

export default function AccessibilityPage() {
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
            Accessibility Statement
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
            EmPulse Music is committed to making our platform accessible to all
            users, regardless of ability. We strive to meet WCAG 2.1 AA
            standards and continuously improve our accessibility features.
          </p>
        </div>

        {/* Our Commitment */}
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
              Our Commitment
            </h2>
            <p
              className="text-lg text-spotify-text-gray leading-relaxed mb-4"
              style={{
                fontSize: "18px",
                lineHeight: "28px",
                color: "#B3B3B3",
                marginBottom: "16px",
              }}
            >
              EmPulse Music believes that music is for everyone. We are
              committed to ensuring our platform is accessible to people with
              disabilities, including those who use assistive technologies like
              screen readers, voice navigation, and keyboard-only input.
            </p>
            <p
              className="text-lg text-spotify-text-gray leading-relaxed"
              style={{
                fontSize: "18px",
                lineHeight: "28px",
                color: "#B3B3B3",
              }}
            >
              We follow Web Content Accessibility Guidelines (WCAG) 2.1 Level AA
              standards and regularly audit our platform to identify and fix
              accessibility issues.
            </p>
          </div>
        </section>

        {/* Accessibility Features */}
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
            Accessibility Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Keyboard,
                title: "Keyboard Navigation",
                description:
                  "Full keyboard support with logical tab order, skip links, and keyboard shortcuts throughout the platform.",
              },
              {
                icon: Eye,
                title: "Screen Reader Support",
                description:
                  "ARIA labels, semantic HTML, and proper heading structure for screen reader compatibility.",
              },
              {
                icon: MousePointer2,
                title: "High Contrast",
                description:
                  "Support for high contrast modes and customizable color schemes for better visibility.",
              },
              {
                icon: Headphones,
                title: "Audio Descriptions",
                description:
                  "Alternative text for images, audio descriptions where appropriate, and clear audio controls.",
              },
              {
                icon: Accessibility,
                title: "Focus Indicators",
                description:
                  "Clear visible focus indicators on all interactive elements for keyboard navigation.",
              },
              {
                icon: CheckCircle2,
                title: "Form Labels",
                description:
                  "Properly labeled form fields, error messages, and validation feedback for all inputs.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-spotify-light-gray rounded-lg p-6 hover:bg-spotify-light-gray/80 transition-colors"
                style={{
                  backgroundColor: "#282828",
                  borderRadius: "8px",
                  padding: "24px",
                  transition: "background-color 0.2s",
                }}
              >
                <feature.icon
                  size={32}
                  className="mb-4 text-spotify-green"
                  style={{ color: "#7209B7", marginBottom: "16px" }}
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
                  {feature.title}
                </h3>
                <p
                  className="text-spotify-text-gray"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#B3B3B3",
                  }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Keyboard Shortcuts */}
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
              Keyboard Shortcuts
            </h2>
            <div className="space-y-3">
              {[
                { keys: "Space", description: "Play/Pause music" },
                { keys: "→", description: "Next track" },
                { keys: "←", description: "Previous track" },
                { keys: "↑", description: "Increase volume" },
                { keys: "↓", description: "Decrease volume" },
                { keys: "M", description: "Mute/Unmute" },
                { keys: "Tab", description: "Navigate between elements" },
                { keys: "Enter", description: "Activate selected element" },
                { keys: "Esc", description: "Close modal/dropdown" },
              ].map((shortcut, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-white/10"
                  style={{
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    paddingTop: "12px",
                    paddingBottom: "12px",
                  }}
                >
                  <kbd
                    className="bg-black/50 px-3 py-1 rounded text-sm font-mono"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      padding: "4px 12px",
                      borderRadius: "4px",
                      fontSize: "14px",
                      fontFamily: "monospace",
                    }}
                  >
                    {shortcut.keys}
                  </kbd>
                  <span
                    className="text-spotify-text-gray"
                    style={{
                      color: "#B3B3B3",
                      fontSize: "14px",
                    }}
                  >
                    {shortcut.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feedback Section */}
        <section className="mb-16">
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
              className="text-3xl font-bold mb-4"
              style={{
                fontSize: "32px",
                lineHeight: "40px",
                fontWeight: 900,
                color: "#FFFFFF",
                marginBottom: "16px",
              }}
            >
              Help Us Improve
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
              If you encounter any accessibility issues or have suggestions for
              improvement, please let us know. Your feedback helps us create a
              better experience for everyone.
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
              Report Accessibility Issue
            </Link>
          </div>
        </section>

        {/* Compliance Section */}
        <section>
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
              }}
            >
              Standards Compliance
            </h2>
            <p
              className="text-spotify-text-gray mb-4"
              style={{
                fontSize: "14px",
                lineHeight: "20px",
                color: "#B3B3B3",
                marginBottom: "16px",
              }}
            >
              EmPulse Music strives to meet WCAG 2.1 Level AA standards. We use
              automated accessibility testing tools and manual testing with
              assistive technologies to ensure our platform is accessible to all
              users.
            </p>
            <p
              className="text-spotify-text-gray"
              style={{
                fontSize: "14px",
                lineHeight: "20px",
                color: "#B3B3B3",
              }}
            >
              This accessibility statement was last updated on January 14, 2026.
              We regularly review and update our accessibility practices to
              ensure continued compliance.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
