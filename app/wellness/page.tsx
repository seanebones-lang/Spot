"use client";

import {
  Phone,
  MessageCircle,
  BookOpen,
  ExternalLink,
  AlertCircle,
} from "lucide-react";

export default function WellnessPage() {
  return (
    <div
      className="p-8 max-w-4xl mx-auto"
      style={{
        padding: "32px",
        maxWidth: "896px",
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "#FFFFFF",
      }}
    >
      <h1
        className="text-4xl font-bold mb-8"
        style={{
          fontSize: "32px",
          lineHeight: "36px",
          fontWeight: 700,
          color: "#FFFFFF",
          marginBottom: "32px",
        }}
      >
        Mental Health Resource Hub
      </h1>

      {/* Disclaimer - Exact Spotify Style */}
      <div
        className="bg-yellow-600/20 border border-yellow-600/50 rounded-lg p-4 mb-8 flex items-start gap-3"
        style={{
          backgroundColor: "rgba(217, 119, 6, 0.2)",
          border: "1px solid rgba(217, 119, 6, 0.5)",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "32px",
          gap: "12px",
        }}
      >
        <AlertCircle
          className="text-yellow-500 flex-shrink-0 mt-0.5"
          size={24}
          style={{
            width: "24px",
            height: "24px",
            color: "#F59E0B",
            flexShrink: 0,
          }}
        />
        <div>
          <h3
            className="font-bold text-yellow-500 mb-1"
            style={{
              fontSize: "16px",
              lineHeight: "24px",
              fontWeight: 700,
              color: "#F59E0B",
              marginBottom: "4px",
            }}
          >
            Important Disclaimer
          </h3>
          <p
            className="text-sm text-white/80"
            style={{
              fontSize: "14px",
              lineHeight: "20px",
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            EmPulse Music is not a substitute for professional mental health
            care. If you&apos;re experiencing a mental health crisis, please
            contact a qualified professional or emergency services immediately.
          </p>
        </div>
      </div>

      {/* Crisis Support */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Phone size={24} />
          Crisis Support
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-spotify-light-gray rounded-lg p-6">
            <h3 className="font-bold mb-2">988 Suicide & Crisis Lifeline</h3>
            <p className="text-sm text-spotify-text-gray mb-4">
              Free, 24/7 crisis support
            </p>
            <a
              href="tel:988"
              className="text-spotify-green hover:underline flex items-center gap-2"
            >
              Call 988 <ExternalLink size={16} />
            </a>
          </div>
          <div className="bg-spotify-light-gray rounded-lg p-6">
            <h3 className="font-bold mb-2">Crisis Text Line</h3>
            <p className="text-sm text-spotify-text-gray mb-4">
              Text for immediate support
            </p>
            <a
              href="sms:741741"
              className="text-spotify-green hover:underline flex items-center gap-2"
            >
              Text HOME to 741741 <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Therapy Directory */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Find a Therapist</h2>
        <div className="bg-spotify-light-gray rounded-lg p-6">
          <p className="text-spotify-text-gray mb-4">
            Search for licensed therapists in your area (Directory coming soon)
          </p>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter your location"
              className="flex-1 bg-white text-black rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-spotify-green"
            />
            <button className="bg-spotify-green text-black px-6 py-2 rounded-full font-bold hover:bg-spotify-green/80">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Educational Resources */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <BookOpen size={24} />
          Educational Resources
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-spotify-light-gray rounded-lg p-6">
            <h3 className="font-bold mb-2">Understanding Mental Health</h3>
            <p className="text-sm text-spotify-text-gray mb-4">
              Learn about common mental health conditions and treatments
            </p>
            <button className="text-spotify-green hover:underline">
              Learn More →
            </button>
          </div>
          <div className="bg-spotify-light-gray rounded-lg p-6">
            <h3 className="font-bold mb-2">Self-Care Strategies</h3>
            <p className="text-sm text-spotify-text-gray mb-4">
              Practical tips for managing stress and improving wellbeing
            </p>
            <button className="text-spotify-green hover:underline">
              Explore →
            </button>
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Partner Resources</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-spotify-light-gray rounded-lg p-6 text-center">
            <h3 className="font-bold mb-2">Habits</h3>
            <p className="text-xs text-spotify-text-gray mb-2">by NextEleven</p>
            <a
              href="https://testflight.apple.com/join/aHJvusVF"
              target="_blank"
              rel="noopener noreferrer"
              className="text-spotify-green hover:underline text-sm flex items-center justify-center gap-1"
            >
              Join Beta <ExternalLink size={14} />
            </a>
          </div>
          <div className="bg-spotify-light-gray rounded-lg p-6 text-center">
            <h3 className="font-bold mb-2">DreamWeave PRO</h3>
            <p className="text-xs text-spotify-text-gray mb-2">by NextEleven</p>
            <a
              href="https://testflight.apple.com/join/h64KN6wa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-spotify-green hover:underline text-sm flex items-center justify-center gap-1"
            >
              Join Beta <ExternalLink size={14} />
            </a>
          </div>
          <div className="bg-spotify-light-gray rounded-lg p-6 text-center">
            <h3 className="font-bold mb-2">If/Then/Reset</h3>
            <p className="text-xs text-spotify-text-gray mb-2">by NextEleven</p>
            <a
              href="https://apps.apple.com/us/app/if-then-reset-mental-wellness/id6755074789"
              target="_blank"
              rel="noopener noreferrer"
              className="text-spotify-green hover:underline text-sm flex items-center justify-center gap-1"
            >
              Download on App Store <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Donations */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Support Mental Health Organizations
        </h2>
        <div className="bg-spotify-light-gray rounded-lg p-6">
          <p className="text-spotify-text-gray mb-4">
            Donate to organizations working to improve mental health access and
            support
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "National Alliance on Mental Illness",
              "Mental Health America",
              "Active Minds",
            ].map((org) => (
              <button
                key={org}
                className="bg-spotify-green hover:bg-spotify-green/80 text-white px-4 py-3 rounded-lg text-left transition-colors"
              >
                <div className="font-semibold">{org}</div>
                <div className="text-sm opacity-80 mt-1">Donate →</div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
