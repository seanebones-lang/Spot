"use client";

import Link from "next/link";
import {
  Megaphone,
  Users,
  Target,
  BarChart3,
  Zap,
  CheckCircle2,
} from "lucide-react";

export default function AdvertisingPage() {
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
        <div
          className="mb-12 text-center"
          style={{ marginBottom: "48px", textAlign: "center" }}
        >
          <Megaphone
            size={64}
            className="mx-auto mb-6 text-spotify-green"
            style={{ color: "#7209B7", marginBottom: "24px" }}
          />
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
            Advertise on EmPulse Music
          </h1>
          <p
            className="text-xl text-spotify-text-gray max-w-3xl mx-auto"
            style={{
              fontSize: "20px",
              lineHeight: "28px",
              color: "#B3B3B3",
              maxWidth: "672px",
              margin: "0 auto",
            }}
          >
            Reach millions of music lovers worldwide with targeted advertising
            that connects brands with engaged listeners.
          </p>
        </div>

        {/* Why Advertise */}
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
              Why Advertise on EmPulse?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Users,
                  title: "5M+ Listeners",
                  description:
                    "Reach millions of engaged music lovers worldwide",
                },
                {
                  icon: Target,
                  title: "Targeted Ads",
                  description:
                    "Precise targeting based on listening behavior and preferences",
                },
                {
                  icon: BarChart3,
                  title: "Real Analytics",
                  description:
                    "Detailed insights and campaign performance metrics",
                },
                {
                  icon: Zap,
                  title: "High Engagement",
                  description: "Music fans spend hours on our platform daily",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-spotify-dark rounded-lg p-6"
                  style={{
                    backgroundColor: "#121212",
                    borderRadius: "8px",
                    padding: "24px",
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
                    className="text-spotify-text-gray text-sm"
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
          </div>
        </section>

        {/* Ad Formats */}
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
            Advertising Formats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Audio Ads",
                description:
                  "Reach listeners with audio advertisements between songs. Perfect for brand storytelling and music-related campaigns.",
              },
              {
                title: "Display Ads",
                description:
                  "Visual banner advertisements on the platform. Engage users with eye-catching creative and clear calls-to-action.",
              },
              {
                title: "Sponsored Playlists",
                description:
                  "Feature your brand in curated playlists. Connect with listeners through music discovery and brand alignment.",
              },
              {
                title: "Video Ads",
                description:
                  "Video advertisements during playback breaks. Maximize engagement with rich media and compelling narratives.",
              },
            ].map((format, index) => (
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
                <h3
                  className="text-xl font-bold mb-3"
                  style={{
                    fontSize: "20px",
                    lineHeight: "28px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    marginBottom: "12px",
                  }}
                >
                  {format.title}
                </h3>
                <p
                  className="text-spotify-text-gray"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#B3B3B3",
                  }}
                >
                  {format.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
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
              className="text-3xl font-bold mb-6"
              style={{
                fontSize: "32px",
                lineHeight: "40px",
                fontWeight: 900,
                color: "#FFFFFF",
                marginBottom: "24px",
              }}
            >
              Advertising Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Reach engaged music lovers",
                "Target by genre, mood, and demographics",
                "Real-time campaign analytics",
                "Flexible budget options",
                "Brand-safe environment",
                "Premium placement opportunities",
                "Cross-platform campaigns",
                "Dedicated account management",
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3"
                  style={{ gap: "12px" }}
                >
                  <CheckCircle2
                    size={20}
                    className="text-spotify-green flex-shrink-0"
                    style={{ color: "#7209B7" }}
                  />
                  <span
                    className="text-white"
                    style={{
                      fontSize: "14px",
                      lineHeight: "20px",
                      color: "#FFFFFF",
                    }}
                  >
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section>
          <div
            className="bg-spotify-light-gray rounded-lg p-8 text-center"
            style={{
              backgroundColor: "#282828",
              borderRadius: "8px",
              padding: "32px",
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
              Get Started
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
              Ready to reach millions of music lovers? Contact our advertising
              team to discuss campaign opportunities and pricing.
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
              Contact Advertising Team
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
