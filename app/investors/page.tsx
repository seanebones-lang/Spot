<<<<<<< HEAD
"use client";

import Link from "next/link";
import { TrendingUp, BarChart3, FileText, Mail } from "lucide-react";

export default function InvestorsPage() {
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
          <TrendingUp
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
import { TrendingUp, BarChart3, FileText, Mail } from 'lucide-react';

export default function InvestorsPage() {
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
          <TrendingUp 
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
            Investor Relations
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
            Information for investors, analysts, and stakeholders interested in
            EmPulse Music.
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
            Information for investors, analysts, and stakeholders interested in EmPulse Music.
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          </p>
        </div>

        {/* Company Overview */}
        <section className="mb-16">
<<<<<<< HEAD
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
=======
          <div 
            className="bg-spotify-light-gray rounded-lg p-8"
            style={{
              backgroundColor: '#282828',
              borderRadius: '8px',
              padding: '32px'
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
              About EmPulse Music
            </h2>
<<<<<<< HEAD
            <p
              className="text-lg text-spotify-text-gray leading-relaxed mb-6"
              style={{
                fontSize: "18px",
                lineHeight: "28px",
                color: "#B3B3B3",
                marginBottom: "24px",
              }}
            >
              EmPulse Music is a next-generation music streaming platform that
              combines cutting-edge technology with a deep commitment to artist
              empowerment and community wellness. We're building a sustainable
              platform that supports independent artists while providing
=======
            <p 
              className="text-lg text-spotify-text-gray leading-relaxed mb-6"
              style={{
                fontSize: '18px',
                lineHeight: '28px',
                color: '#B3B3B3',
                marginBottom: '24px'
              }}
            >
              EmPulse Music is a next-generation music streaming platform that combines cutting-edge 
              technology with a deep commitment to artist empowerment and community wellness. We're 
              building a sustainable platform that supports independent artists while providing 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              listeners with innovative music discovery and wellness features.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              {[
<<<<<<< HEAD
                { label: "Monthly Listeners", value: "5M+" },
                { label: "Active Artists", value: "10K+" },
                { label: "Tracks", value: "500K+" },
                { label: "Countries", value: "150+" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div
                    className="text-3xl font-bold mb-2"
                    style={{
                      fontSize: "32px",
                      lineHeight: "40px",
                      fontWeight: 900,
                      color: "#FFFFFF",
                      marginBottom: "8px",
=======
                { label: 'Monthly Listeners', value: '5M+' },
                { label: 'Active Artists', value: '10K+' },
                { label: 'Tracks', value: '500K+' },
                { label: 'Countries', value: '150+' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div 
                    className="text-3xl font-bold mb-2"
                    style={{
                      fontSize: '32px',
                      lineHeight: '40px',
                      fontWeight: 900,
                      color: '#FFFFFF',
                      marginBottom: '8px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                    }}
                  >
                    {stat.value}
                  </div>
<<<<<<< HEAD
                  <div
                    className="text-spotify-text-gray text-sm"
                    style={{
                      fontSize: "14px",
                      lineHeight: "20px",
                      color: "#B3B3B3",
=======
                  <div 
                    className="text-spotify-text-gray text-sm"
                    style={{
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#B3B3B3'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resources */}
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
            Investor Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: FileText,
<<<<<<< HEAD
                title: "Financial Reports",
                description:
                  "Access quarterly and annual financial reports, earnings statements, and investor presentations.",
              },
              {
                icon: BarChart3,
                title: "Company Metrics",
                description:
                  "View key performance indicators, growth metrics, and business statistics.",
              },
              {
                icon: Mail,
                title: "Contact IR Team",
                description:
                  "Get in touch with our investor relations team for questions or information requests.",
              },
=======
                title: 'Financial Reports',
                description: 'Access quarterly and annual financial reports, earnings statements, and investor presentations.'
              },
              {
                icon: BarChart3,
                title: 'Company Metrics',
                description: 'View key performance indicators, growth metrics, and business statistics.'
              },
              {
                icon: Mail,
                title: 'Contact IR Team',
                description: 'Get in touch with our investor relations team for questions or information requests.'
              }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            ].map((resource, index) => (
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
                <resource.icon
                  size={32}
                  className="mb-4 text-spotify-green"
                  style={{ color: "#1DB954", marginBottom: "16px" }}
                />
                <h3
                  className="text-xl font-bold mb-3"
                  style={{
                    fontSize: "20px",
                    lineHeight: "28px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    marginBottom: "12px",
=======
                  backgroundColor: '#282828',
                  borderRadius: '8px',
                  padding: '24px',
                  transition: 'background-color 0.2s'
                }}
              >
                <resource.icon 
                  size={32} 
                  className="mb-4 text-spotify-green"
                  style={{ color: '#7209B7', marginBottom: '16px' }}
                />
                <h3 
                  className="text-xl font-bold mb-3"
                  style={{
                    fontSize: '20px',
                    lineHeight: '28px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    marginBottom: '12px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  }}
                >
                  {resource.title}
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
                  {resource.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section>
<<<<<<< HEAD
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
=======
          <div 
            className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg p-8 border border-purple-600/30 text-center"
            style={{
              background: 'linear-gradient(to right, rgba(114, 9, 183, 0.2), rgba(69, 123, 157, 0.2))',
              borderRadius: '8px',
              padding: '32px',
              border: '1px solid rgba(114, 9, 183, 0.3)',
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
              Investor Inquiries
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
              For investor relations inquiries, please contact our investor
              relations team.
            </p>
            <Link
              href="/support"
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
              For investor relations inquiries, please contact our investor relations team.
            </p>
            <Link
              href="/support"
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
              Contact Investor Relations
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
