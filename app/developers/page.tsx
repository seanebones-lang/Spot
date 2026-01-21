<<<<<<< HEAD
"use client";

import Link from "next/link";
import { Code, Book, Zap, Lock, BarChart, Users, Music } from "lucide-react";

export default function DevelopersPage() {
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
import { Code, Book, Zap, Lock, BarChart, Users, Music } from 'lucide-react';

export default function DevelopersPage() {
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
            Developer API
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
            Build powerful applications with the EmPulse Music API. Access our
            catalog, user data, and analytics to create the next generation of
            music experiences.
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
            Build powerful applications with the EmPulse Music API. Access our catalog, 
            user data, and analytics to create the next generation of music experiences.
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          </p>
        </div>

        {/* Quick Start */}
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
              className="text-3xl font-bold mb-4"
              style={{
                fontSize: "32px",
                lineHeight: "40px",
                fontWeight: 900,
                color: "#FFFFFF",
                marginBottom: "16px",
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
              className="text-3xl font-bold mb-4"
              style={{
                fontSize: '32px',
                lineHeight: '40px',
                fontWeight: 900,
                color: '#FFFFFF',
                marginBottom: '16px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              }}
            >
              Quick Start
            </h2>
<<<<<<< HEAD
            <div
              className="bg-black/30 rounded-lg p-6 font-mono text-sm overflow-x-auto"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                borderRadius: "8px",
                padding: "24px",
                fontFamily: "monospace",
                fontSize: "14px",
=======
            <div 
              className="bg-black/30 rounded-lg p-6 font-mono text-sm overflow-x-auto"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '8px',
                padding: '24px',
                fontFamily: 'monospace',
                fontSize: '14px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              }}
            >
              <code className="text-white">
                {`# Install the EmPulse SDK
npm install @empulse/music-sdk

# Initialize the client
import { EmPulseClient } from '@empulse/music-sdk';

const client = new EmPulseClient({
  apiKey: 'your-api-key',
  baseURL: 'https://api.empulse.music'
});

# Make your first request
const tracks = await client.tracks.search('electronic');`}
              </code>
            </div>
          </div>
        </section>

        {/* API Features */}
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
            API Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Music,
<<<<<<< HEAD
                title: "Music Catalog",
                description:
                  "Search and access millions of tracks, albums, and artists with rich metadata.",
              },
              {
                icon: Users,
                title: "User Profiles",
                description:
                  "Access public user profiles, playlists, and listening history (with permission).",
              },
              {
                icon: BarChart,
                title: "Analytics",
                description:
                  "Real-time streaming analytics, listener insights, and performance metrics.",
              },
              {
                icon: Zap,
                title: "Recommendations",
                description:
                  "AI-powered music recommendations based on mood, genre, and listening patterns.",
              },
              {
                icon: Lock,
                title: "Secure Authentication",
                description:
                  "OAuth 2.0 with JWT tokens for secure API access and user authorization.",
              },
              {
                icon: Book,
                title: "Comprehensive Docs",
                description:
                  "Complete documentation with examples, SDKs, and interactive API explorer.",
              },
=======
                title: 'Music Catalog',
                description: 'Search and access millions of tracks, albums, and artists with rich metadata.'
              },
              {
                icon: Users,
                title: 'User Profiles',
                description: 'Access public user profiles, playlists, and listening history (with permission).'
              },
              {
                icon: BarChart,
                title: 'Analytics',
                description: 'Real-time streaming analytics, listener insights, and performance metrics.'
              },
              {
                icon: Zap,
                title: 'Recommendations',
                description: 'AI-powered music recommendations based on mood, genre, and listening patterns.'
              },
              {
                icon: Lock,
                title: 'Secure Authentication',
                description: 'OAuth 2.0 with JWT tokens for secure API access and user authorization.'
              },
              {
                icon: Book,
                title: 'Comprehensive Docs',
                description: 'Complete documentation with examples, SDKs, and interactive API explorer.'
              }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            ].map((feature, index) => (
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
                <feature.icon
                  size={32}
                  className="mb-4 text-spotify-green"
                  style={{ color: "#1DB954", marginBottom: "16px" }}
                />
                <h3
                  className="text-xl font-bold mb-2"
                  style={{
                    fontSize: "20px",
                    lineHeight: "28px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    marginBottom: "8px",
=======
                  backgroundColor: '#282828',
                  borderRadius: '8px',
                  padding: '24px',
                  transition: 'background-color 0.2s'
                }}
              >
                <feature.icon 
                  size={32} 
                  className="mb-4 text-spotify-green"
                  style={{ color: '#7209B7', marginBottom: '16px' }}
                />
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
                  {feature.title}
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
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* API Endpoints */}
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
            Core Endpoints
          </h2>
<<<<<<< HEAD
          <div
            className="bg-spotify-light-gray rounded-lg p-6"
            style={{
              backgroundColor: "#282828",
              borderRadius: "8px",
              padding: "24px",
=======
          <div 
            className="bg-spotify-light-gray rounded-lg p-6"
            style={{
              backgroundColor: '#282828',
              borderRadius: '8px',
              padding: '24px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            <div className="space-y-4">
              {[
<<<<<<< HEAD
                {
                  method: "GET",
                  endpoint: "/api/v1/tracks",
                  description: "Search and retrieve tracks",
                },
                {
                  method: "GET",
                  endpoint: "/api/v1/artists/{id}",
                  description: "Get artist information",
                },
                {
                  method: "GET",
                  endpoint: "/api/v1/albums/{id}",
                  description: "Get album details",
                },
                {
                  method: "GET",
                  endpoint: "/api/v1/playlists/{id}",
                  description: "Retrieve playlist contents",
                },
                {
                  method: "POST",
                  endpoint: "/api/v1/recommendations",
                  description: "Get personalized recommendations",
                },
                {
                  method: "GET",
                  endpoint: "/api/v1/analytics/streams",
                  description: "Access streaming analytics",
                },
              ].map((endpoint, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 py-3 border-b border-white/10"
                  style={{
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    paddingTop: "12px",
                    paddingBottom: "12px",
                  }}
                >
                  <span
                    className={`px-3 py-1 rounded text-xs font-bold ${
                      endpoint.method === "GET"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-purple-500/20 text-purple-400"
                    }`}
                    style={{
                      padding: "4px 12px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      fontWeight: 700,
=======
                { method: 'GET', endpoint: '/api/v1/tracks', description: 'Search and retrieve tracks' },
                { method: 'GET', endpoint: '/api/v1/artists/{id}', description: 'Get artist information' },
                { method: 'GET', endpoint: '/api/v1/albums/{id}', description: 'Get album details' },
                { method: 'GET', endpoint: '/api/v1/playlists/{id}', description: 'Retrieve playlist contents' },
                { method: 'POST', endpoint: '/api/v1/recommendations', description: 'Get personalized recommendations' },
                { method: 'GET', endpoint: '/api/v1/analytics/streams', description: 'Access streaming analytics' }
              ].map((endpoint, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 py-3 border-b border-white/10"
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    paddingTop: '12px',
                    paddingBottom: '12px'
                  }}
                >
                  <span 
                    className={`px-3 py-1 rounded text-xs font-bold ${
                      endpoint.method === 'GET' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-purple-500/20 text-purple-400'
                    }`}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 700
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                    }}
                  >
                    {endpoint.method}
                  </span>
<<<<<<< HEAD
                  <code
                    className="text-spotify-text-gray flex-1"
                    style={{
                      color: "#B3B3B3",
                      flex: 1,
                      fontFamily: "monospace",
                      fontSize: "14px",
=======
                  <code 
                    className="text-spotify-text-gray flex-1"
                    style={{
                      color: '#B3B3B3',
                      flex: 1,
                      fontFamily: 'monospace',
                      fontSize: '14px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                    }}
                  >
                    {endpoint.endpoint}
                  </code>
<<<<<<< HEAD
                  <span
                    className="text-spotify-text-gray text-sm"
                    style={{
                      color: "#B3B3B3",
                      fontSize: "14px",
=======
                  <span 
                    className="text-spotify-text-gray text-sm"
                    style={{
                      color: '#B3B3B3',
                      fontSize: '14px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                    }}
                  >
                    {endpoint.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section>
<<<<<<< HEAD
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
=======
          <div 
            className="bg-spotify-light-gray rounded-lg p-8 text-center"
            style={{
              backgroundColor: '#282828',
              borderRadius: '8px',
              padding: '32px',
              textAlign: 'center'
            }}
          >
            <h2 
              className="text-3xl font-bold mb-4"
              style={{
                fontSize: '32px',
                lineHeight: '40px',
                fontWeight: 900,
                color: '#FFFFFF',
                marginBottom: '16px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              }}
            >
              Ready to Build?
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
              Get your API key and start building amazing music experiences.
            </p>
            <Link
              href="/dashboard/artist"
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
              Get API Access
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
