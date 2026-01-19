"use client";

import Link from "next/link";
import { Music, Heart, Users, Zap, Globe, Award } from "lucide-react";

export default function AboutPage() {
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
            About EmPulse Music
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
            Empowering artists and connecting communities through music,
            wellness, and technology.
          </p>
        </div>

        {/* Mission Section */}
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
              Our Mission
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
              EmPulse Music is a next-generation music platform that combines
              cutting-edge technology with a deep commitment to artist
              empowerment and community wellness. We believe music is not just
              entertainment—it's a force for healing, connection, and positive
              change.
            </p>
            <p
              className="text-lg text-spotify-text-gray leading-relaxed"
              style={{
                fontSize: "18px",
                lineHeight: "28px",
                color: "#B3B3B3",
              }}
            >
              Our platform provides independent artists with the tools they need
              to succeed, while offering listeners a unique experience that
              supports their mental and emotional well-being.
            </p>
          </div>
        </section>

        {/* Features Grid */}
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
            What Makes Us Different
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Music,
                title: "Artist Empowerment",
                description:
                  "Fair royalty rates, transparent analytics, and tools to help artists build sustainable careers.",
              },
              {
                icon: Heart,
                title: "Wellness Integration",
                description:
                  "Music therapy features, mood-based discovery, and mental health support resources.",
              },
              {
                icon: Users,
                title: "Community Driven",
                description:
                  "Connect with fans, collaborate with artists, and be part of a supportive creative community.",
              },
              {
                icon: Zap,
                title: "AI-Powered Discovery",
                description:
                  "Advanced RAG and graph-based recommendation systems help listeners discover their next favorite song.",
              },
              {
                icon: Globe,
                title: "Global Reach",
                description:
                  "Access to listeners worldwide with distribution tools that make global promotion accessible.",
              },
              {
                icon: Award,
                title: "Fair Revenue Share",
                description:
                  "Transparent $0.004 per stream payout model with direct deposit and detailed analytics.",
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

        {/* Stats Section */}
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
              className="text-3xl font-bold mb-8 text-center"
              style={{
                fontSize: "32px",
                lineHeight: "40px",
                fontWeight: 900,
                color: "#FFFFFF",
                marginBottom: "32px",
                textAlign: "center",
              }}
            >
              By The Numbers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { label: "Active Artists", value: "10,000+" },
                { label: "Tracks Uploaded", value: "500K+" },
                { label: "Monthly Listeners", value: "5M+" },
                { label: "Countries", value: "150+" },
              ].map((stat, index) => (
                <div key={index}>
                  <div
                    className="text-4xl font-bold mb-2"
                    style={{
                      fontSize: "36px",
                      lineHeight: "44px",
                      fontWeight: 900,
                      color: "#FFFFFF",
                      marginBottom: "8px",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-spotify-text-gray text-sm"
                    style={{
                      fontSize: "14px",
                      lineHeight: "20px",
                      color: "#B3B3B3",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mb-16">
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
              Ready to Get Started?
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
              Whether you're an artist looking to share your music or a listener
              seeking new sounds, EmPulse has something for you.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/artist/signup"
                className="bg-spotify-green hover:bg-[#8a1dd0] text-black font-bold py-3 px-6 rounded-full transition-colors"
                style={{
                  backgroundColor: "#7209B7",
                  color: "#000000",
                  fontWeight: 700,
                  padding: "12px 24px",
                  borderRadius: "9999px",
                  transition: "background-color 0.2s",
                }}
              >
                Join as Artist
              </Link>
              <Link
                href="/subscription"
                className="bg-transparent border-2 border-spotify-green text-spotify-green hover:bg-spotify-green/10 font-bold py-3 px-6 rounded-full transition-colors"
                style={{
                  borderColor: "#7209B7",
                  color: "#7209B7",
                  fontWeight: 700,
                  padding: "12px 24px",
                  borderRadius: "9999px",
                  transition: "background-color 0.2s",
                }}
              >
                Start Listening
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
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
              Get in Touch
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
              Have questions or feedback? We'd love to hear from you.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/support"
                className="text-spotify-green hover:underline"
                style={{ color: "#7209B7" }}
              >
                Support Center →
              </Link>
              <Link
                href="/contact"
                className="text-spotify-green hover:underline"
                style={{ color: "#7209B7" }}
              >
                Contact Us →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
