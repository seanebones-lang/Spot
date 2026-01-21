<<<<<<< HEAD
"use client";

import Link from "next/link";
import { Newspaper, Calendar, Tag, ArrowRight } from "lucide-react";

export default function ForTheRecordPage() {
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
          <Newspaper
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
=======
'use client';

import Link from 'next/link';
import { Newspaper, Calendar, Tag, ArrowRight } from 'lucide-react';

export default function ForTheRecordPage() {
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
          className="mb-12 text-center"
          style={{ marginBottom: '48px', textAlign: 'center' }}
        >
          <Newspaper 
            size={64} 
            className="mx-auto mb-6 text-spotify-green"
            style={{ color: '#7209B7', marginBottom: '24px' }}
          />
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
            For the Record
          </h1>
<<<<<<< HEAD
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
            News, stories, and insights from EmPulse Music. Stay updated on the
            latest in music, technology, and artist empowerment.
=======
          <p 
            className="text-xl text-spotify-text-gray max-w-3xl mx-auto"
            style={{
              fontSize: '20px',
              lineHeight: '28px',
              color: '#B3B3B3',
              maxWidth: '672px',
              margin: '0 auto'
            }}
          >
            News, stories, and insights from EmPulse Music. Stay updated on the latest 
            in music, technology, and artist empowerment.
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          </p>
        </div>

        {/* Featured Article Placeholder */}
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
              Latest Stories
            </h2>
            <div className="space-y-6">
              {[
                {
<<<<<<< HEAD
                  date: "January 14, 2026",
                  title:
                    "EmPulse Music Launches New AI-Powered Discovery Features",
                  excerpt:
                    "Introducing mood-based recommendations and graph-enhanced music discovery to help listeners find their next favorite artist.",
                },
                {
                  date: "January 10, 2026",
                  title:
                    "Supporting Artist Mental Health: New Wellness Integration",
                  excerpt:
                    "How we're integrating music therapy features and mental health resources to support both artists and listeners.",
                },
                {
                  date: "January 5, 2026",
                  title:
                    "Fair Revenue Share: Our $0.004 Per Stream Model Explained",
                  excerpt:
                    "Transparency in royalties: why we chose this model and how it benefits independent artists.",
                },
              ].map((article, index) => (
                <div
                  key={index}
                  className="pb-6 border-b border-white/10 last:border-b-0 last:pb-0"
                  style={{
                    paddingBottom: index < 2 ? "24px" : "0",
                    borderBottom:
                      index < 2 ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
                  }}
                >
                  <div
                    className="flex items-center gap-3 mb-2"
                    style={{ gap: "12px", marginBottom: "8px" }}
                  >
                    <Calendar
                      size={16}
                      className="text-spotify-text-gray"
                      style={{ color: "#B3B3B3" }}
                    />
                    <span
                      className="text-spotify-text-gray text-sm"
                      style={{
                        fontSize: "14px",
                        lineHeight: "20px",
                        color: "#B3B3B3",
=======
                  date: 'January 14, 2026',
                  title: 'EmPulse Music Launches New AI-Powered Discovery Features',
                  excerpt: 'Introducing mood-based recommendations and graph-enhanced music discovery to help listeners find their next favorite artist.'
                },
                {
                  date: 'January 10, 2026',
                  title: 'Supporting Artist Mental Health: New Wellness Integration',
                  excerpt: 'How we\'re integrating music therapy features and mental health resources to support both artists and listeners.'
                },
                {
                  date: 'January 5, 2026',
                  title: 'Fair Revenue Share: Our $0.004 Per Stream Model Explained',
                  excerpt: 'Transparency in royalties: why we chose this model and how it benefits independent artists.'
                }
              ].map((article, index) => (
                <div 
                  key={index}
                  className="pb-6 border-b border-white/10 last:border-b-0 last:pb-0"
                  style={{
                    paddingBottom: index < 2 ? '24px' : '0',
                    borderBottom: index < 2 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
                  }}
                >
                  <div 
                    className="flex items-center gap-3 mb-2"
                    style={{ gap: '12px', marginBottom: '8px' }}
                  >
                    <Calendar size={16} className="text-spotify-text-gray" style={{ color: '#B3B3B3' }} />
                    <span 
                      className="text-spotify-text-gray text-sm"
                      style={{
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: '#B3B3B3'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                      }}
                    >
                      {article.date}
                    </span>
                  </div>
<<<<<<< HEAD
                  <h3
                    className="text-2xl font-bold mb-3"
                    style={{
                      fontSize: "24px",
                      lineHeight: "32px",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      marginBottom: "12px",
=======
                  <h3 
                    className="text-2xl font-bold mb-3"
                    style={{
                      fontSize: '24px',
                      lineHeight: '32px',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      marginBottom: '12px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                    }}
                  >
                    {article.title}
                  </h3>
<<<<<<< HEAD
                  <p
                    className="text-spotify-text-gray mb-4"
                    style={{
                      fontSize: "14px",
                      lineHeight: "20px",
                      color: "#B3B3B3",
                      marginBottom: "16px",
=======
                  <p 
                    className="text-spotify-text-gray mb-4"
                    style={{
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#B3B3B3',
                      marginBottom: '16px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                    }}
                  >
                    {article.excerpt}
                  </p>
<<<<<<< HEAD
                  <span
                    className="text-spotify-green inline-flex items-center gap-2 text-sm font-medium"
                    style={{
                      color: "#1DB954",
                      fontSize: "14px",
                      fontWeight: 500,
=======
                  <span 
                    className="text-spotify-green inline-flex items-center gap-2 text-sm font-medium"
                    style={{
                      color: '#7209B7',
                      fontSize: '14px',
                      fontWeight: 500
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                    }}
                  >
                    Read more
                    <ArrowRight size={16} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
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
            Explore Topics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
<<<<<<< HEAD
              "Artist Stories",
              "Technology",
              "Music Industry",
              "Wellness",
              "Innovation",
              "Community",
              "Updates",
              "Features",
=======
              'Artist Stories',
              'Technology',
              'Music Industry',
              'Wellness',
              'Innovation',
              'Community',
              'Updates',
              'Features'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            ].map((topic, index) => (
              <button
                key={index}
                className="bg-spotify-light-gray hover:bg-spotify-light-gray/80 rounded-lg p-4 text-left transition-colors"
                style={{
<<<<<<< HEAD
                  backgroundColor: "#282828",
                  borderRadius: "8px",
                  padding: "16px",
                  transition: "background-color 0.2s",
                }}
              >
                <Tag
                  size={20}
                  className="mb-2 text-spotify-green"
                  style={{ color: "#1DB954", marginBottom: "8px" }}
                />
                <span
                  className="text-spotify-text-gray text-sm font-medium"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#B3B3B3",
                    fontWeight: 500,
=======
                  backgroundColor: '#282828',
                  borderRadius: '8px',
                  padding: '16px',
                  transition: 'background-color 0.2s'
                }}
              >
                <Tag size={20} className="mb-2 text-spotify-green" style={{ color: '#7209B7', marginBottom: '8px' }} />
                <span 
                  className="text-spotify-text-gray text-sm font-medium"
                  style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#B3B3B3',
                    fontWeight: 500
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  }}
                >
                  {topic}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Newsletter */}
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
              Stay Updated
            </h2>
<<<<<<< HEAD
            <p
              className="text-lg text-spotify-text-gray mb-6"
              style={{
                fontSize: "18px",
                lineHeight: "28px",
                color: "#B3B3B3",
                marginBottom: "24px",
              }}
            >
              Subscribe to our newsletter for the latest news, stories, and
              updates from EmPulse Music.
            </p>
            <Link
              href="/newsletters"
              className="bg-spotify-green hover:bg-[#1ed760] text-black font-bold py-3 px-6 rounded-full transition-colors inline-block"
              style={{
                backgroundColor: "#1DB954",
                color: "#000000",
                fontWeight: 700,
                padding: "12px 24px",
                borderRadius: "9999px",
                transition: "background-color 0.2s",
=======
            <p 
              className="text-lg text-spotify-text-gray mb-6"
              style={{
                fontSize: '18px',
                lineHeight: '28px',
                color: '#B3B3B3',
                marginBottom: '24px'
              }}
            >
              Subscribe to our newsletter for the latest news, stories, and updates from EmPulse Music.
            </p>
            <Link
              href="/newsletters"
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
              Subscribe to Newsletter
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
