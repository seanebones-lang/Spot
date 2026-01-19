"use client";

import Link from "next/link";
import { Smartphone, Download, QrCode, CheckCircle2 } from "lucide-react";

export default function MobileAppPage() {
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
            EmPulse Music Mobile App
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
            Take your music everywhere. Download the free EmPulse Music app for
            iOS and Android.
          </p>
        </div>

        {/* Features Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Smartphone,
                title: "Offline Listening",
                description:
                  "Download your favorite tracks and playlists to listen offline, anywhere.",
              },
              {
                icon: Download,
                title: "Instant Sync",
                description:
                  "Your playlists, favorites, and listening history sync seamlessly across all devices.",
              },
              {
                icon: QrCode,
                title: "Connect Devices",
                description:
                  "Use Spotify Connect to play music on any device from your phone.",
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

        {/* Download Section */}
        <section className="mb-16">
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
              className="text-3xl font-bold mb-6"
              style={{
                fontSize: "32px",
                lineHeight: "40px",
                fontWeight: 900,
                color: "#FFFFFF",
                marginBottom: "24px",
              }}
            >
              Download Now
            </h2>
            <p
              className="text-lg text-spotify-text-gray mb-8"
              style={{
                fontSize: "18px",
                lineHeight: "28px",
                color: "#B3B3B3",
                marginBottom: "32px",
              }}
            >
              Available on iOS and Android. Free to download.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://apps.apple.com/app/empulse-music"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black hover:bg-black/80 text-white font-bold py-3 px-6 rounded-lg transition-colors inline-flex items-center gap-2"
                style={{
                  backgroundColor: "#000000",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  padding: "12px 24px",
                  borderRadius: "8px",
                  transition: "background-color 0.2s",
                }}
              >
                <Download size={20} />
                App Store
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.empulse.music"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black hover:bg-black/80 text-white font-bold py-3 px-6 rounded-lg transition-colors inline-flex items-center gap-2"
                style={{
                  backgroundColor: "#000000",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  padding: "12px 24px",
                  borderRadius: "8px",
                  transition: "background-color 0.2s",
                }}
              >
                <Download size={20} />
                Google Play
              </a>
            </div>
          </div>
        </section>

        {/* Coming Soon Features */}
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
              Mobile App Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Full music catalog access",
                "Create and edit playlists",
                "Download for offline listening",
                "High-quality audio streaming",
                "Smart recommendations",
                "Lyrics display",
                "Share tracks and playlists",
                "Connect with friends",
                "Radio stations",
                "Podcast support",
                "Audiobook access",
                "CarPlay & Android Auto",
              ].map((feature, index) => (
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
                    className="text-spotify-text-gray"
                    style={{
                      fontSize: "14px",
                      lineHeight: "20px",
                      color: "#B3B3B3",
                    }}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
