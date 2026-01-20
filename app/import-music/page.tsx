"use client";

import Link from "next/link";
import {
  Upload,
  Music,
  FileAudio,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function ImportMusicPage() {
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
          <Upload
            size={64}
            className="mx-auto mb-6 text-spotify-green"
            style={{ color: "#1DB954", marginBottom: "24px" }}
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
            Import Your Music
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
            Upload your music to EmPulse and share it with the world. Get
            started in minutes.
          </p>
        </div>

        {/* Quick Links */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Upload,
                title: "Upload Tracks",
                description:
                  "Upload singles, EPs, or full albums in WAV, FLAC, MP3, or M4A format.",
                href: "/upload",
                action: "Start Uploading",
              },
              {
                icon: Music,
                title: "Bulk Import",
                description:
                  "Import entire catalogs with our bulk upload tool for artists and labels.",
                href: "/upload",
                action: "Learn More",
              },
              {
                icon: FileAudio,
                title: "Import Playlists",
                description:
                  "Import playlists from Spotify, Apple Music, or other platforms.",
                href: "/collection",
                action: "Import Now",
              },
            ].map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="bg-spotify-light-gray rounded-lg p-8 hover:bg-spotify-light-gray/80 transition-colors flex flex-col"
                style={{
                  backgroundColor: "#282828",
                  borderRadius: "8px",
                  padding: "32px",
                  transition: "background-color 0.2s",
                }}
              >
                <link.icon
                  size={40}
                  className="mb-4 text-spotify-green"
                  style={{ color: "#1DB954", marginBottom: "16px" }}
                />
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{
                    fontSize: "24px",
                    lineHeight: "32px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    marginBottom: "12px",
                  }}
                >
                  {link.title}
                </h3>
                <p
                  className="text-spotify-text-gray mb-6 flex-grow"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#B3B3B3",
                    marginBottom: "24px",
                    flexGrow: 1,
                  }}
                >
                  {link.description}
                </p>
                <span
                  className="text-spotify-green font-medium inline-flex items-center gap-2"
                  style={{
                    color: "#1DB954",
                    fontWeight: 500,
                  }}
                >
                  {link.action}
                  <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Features */}
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
              Why Upload to EmPulse?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Fair $0.004 per stream royalty rate",
                "Global distribution to 150+ countries",
                "Transparent analytics and insights",
                "Keep 100% of your rights",
                "Direct fan connections",
                "AI-powered mood tagging",
                "Professional upload tools",
                "No exclusive contracts",
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3"
                  style={{ gap: "12px" }}
                >
                  <CheckCircle2
                    size={20}
                    className="text-spotify-green flex-shrink-0"
                    style={{ color: "#1DB954" }}
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

        {/* Call to Action */}
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
              Ready to Upload Your Music?
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
              Join thousands of independent artists sharing their music on
              EmPulse.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/upload"
                className="bg-spotify-green hover:bg-[#1ed760] text-black font-bold py-3 px-6 rounded-full transition-colors inline-flex items-center gap-2"
                style={{
                  backgroundColor: "#1DB954",
                  color: "#000000",
                  fontWeight: 700,
                  padding: "12px 24px",
                  borderRadius: "9999px",
                  transition: "background-color 0.2s",
                }}
              >
                <Upload size={20} />
                Upload Now
              </Link>
              <Link
                href="/help/upload-guidelines"
                className="bg-transparent border-2 border-spotify-green text-spotify-green hover:bg-spotify-green/10 font-bold py-3 px-6 rounded-full transition-colors"
                style={{
                  borderColor: "#1DB954",
                  color: "#1DB954",
                  fontWeight: 700,
                  padding: "12px 24px",
                  borderRadius: "9999px",
                  transition: "background-color 0.2s",
                }}
              >
                View Guidelines
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
