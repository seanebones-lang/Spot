"use client";

import Link from "next/link";
import { Megaphone, Settings, BarChart3, Eye, Shield } from "lucide-react";

export default function AboutAdsPage() {
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
            About Ads & Personalization
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
            Learn how we use advertising to support free features and how you
            can control your ad experience and privacy settings.
          </p>
        </div>

        {/* Why Ads */}
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
              Why You See Ads
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
              Advertising helps us keep EmPulse Music free for millions of
              listeners around the world. Revenue from ads allows us to provide
              free access to our music catalog while supporting the artists who
              create the content you love.
            </p>
            <p
              className="text-lg text-spotify-text-gray leading-relaxed"
              style={{
                fontSize: "18px",
                lineHeight: "28px",
                color: "#B3B3B3",
              }}
            >
              With an EmPulse Premium subscription, you can enjoy ad-free
              listening and support the platform directly through subscription
              fees.
            </p>
          </div>
        </section>

        {/* Ad Personalization */}
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
            Ad Personalization
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: BarChart3,
                title: "Personalized Ads",
                description:
                  "We use your listening history and preferences to show ads that are more relevant to your interests. This makes advertising more useful and less intrusive.",
              },
              {
                icon: Eye,
                title: "Transparency",
                description:
                  "You can see what information is used for ad personalization and adjust your preferences at any time through your privacy settings.",
              },
              {
                icon: Shield,
                title: "Privacy Protected",
                description:
                  "We don't sell your personal information to advertisers. We only share aggregated, anonymized data that helps deliver relevant ads.",
              },
              {
                icon: Settings,
                title: "Your Control",
                description:
                  "You can opt out of personalized advertising at any time. You'll still see ads, but they won't be personalized based on your activity.",
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

        {/* Managing Ad Preferences */}
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
              Manage Your Ad Preferences
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
              You have full control over your advertising experience:
            </p>
            <div className="space-y-4 mb-8">
              {[
                {
                  title: "Disable Ad Personalization",
                  description:
                    "Turn off personalized ads in your privacy settings. You'll still see ads, but they won't be tailored to your interests.",
                  link: "/settings/privacy",
                },
                {
                  title: "Upgrade to Premium",
                  description:
                    "Remove all ads with an EmPulse Premium subscription. Enjoy unlimited ad-free music streaming.",
                  link: "/subscription",
                },
                {
                  title: "Third-Party Opt-Outs",
                  description:
                    "Use industry tools like the Digital Advertising Alliance to opt out of personalized advertising from third parties.",
                  link: "/cookies",
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
                    }}
                  >
                    {option.title}
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
                    {option.description}
                  </p>
                  <Link
                    href={option.link}
                    className="text-spotify-green hover:underline text-sm font-medium"
                    style={{
                      color: "#7209B7",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    Learn More →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advertiser Info */}
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
              className="text-3xl font-bold mb-6"
              style={{
                fontSize: "32px",
                lineHeight: "40px",
                fontWeight: 900,
                color: "#FFFFFF",
                marginBottom: "24px",
              }}
            >
              For Advertisers
            </h2>
            <p
              className="text-lg text-spotify-text-gray leading-relaxed mb-6"
              style={{
                fontSize: "18px",
                lineHeight: "28px",
                color: "#B3B3B3",
                marginBottom: "24px",
              }}
            >
              Are you interested in advertising on EmPulse Music? We offer
              targeted advertising opportunities that reach millions of music
              lovers worldwide.
            </p>
            <Link
              href="/advertising"
              className="text-spotify-green hover:underline font-medium"
              style={{
                color: "#7209B7",
                fontWeight: 500,
              }}
            >
              Learn About Advertising on EmPulse →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
