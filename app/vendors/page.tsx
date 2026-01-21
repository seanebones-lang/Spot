<<<<<<< HEAD
"use client";

import Link from "next/link";
import { Briefcase, Users, CheckCircle2, Mail } from "lucide-react";

export default function VendorsPage() {
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
          <Briefcase
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
import { Briefcase, Users, CheckCircle2, Mail } from 'lucide-react';

export default function VendorsPage() {
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
          <Briefcase 
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
            Vendor & Partner Program
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
            Partner with EmPulse Music to provide products and services that
            enhance our platform and support our community.
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
            Partner with EmPulse Music to provide products and services that enhance 
            our platform and support our community.
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          </p>
        </div>

        {/* Partner Types */}
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
              Partner With Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
<<<<<<< HEAD
                  title: "Technology Partners",
                  description:
                    "Cloud services, infrastructure, analytics tools, and development platforms",
                },
                {
                  title: "Content Partners",
                  description:
                    "Record labels, distributors, music libraries, and content creators",
                },
                {
                  title: "Service Partners",
                  description:
                    "Marketing agencies, legal services, payment processors, and customer support",
                },
=======
                  title: 'Technology Partners',
                  description: 'Cloud services, infrastructure, analytics tools, and development platforms'
                },
                {
                  title: 'Content Partners',
                  description: 'Record labels, distributors, music libraries, and content creators'
                },
                {
                  title: 'Service Partners',
                  description: 'Marketing agencies, legal services, payment processors, and customer support'
                }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              ].map((partner, index) => (
                <div
                  key={index}
                  className="bg-spotify-dark rounded-lg p-6"
                  style={{
<<<<<<< HEAD
                    backgroundColor: "#121212",
                    borderRadius: "8px",
                    padding: "24px",
                  }}
                >
                  <Users
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
                    backgroundColor: '#121212',
                    borderRadius: '8px',
                    padding: '24px'
                  }}
                >
                  <Users 
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
                    {partner.title}
                  </h3>
<<<<<<< HEAD
                  <p
                    className="text-spotify-text-gray text-sm"
                    style={{
                      fontSize: "14px",
                      lineHeight: "20px",
                      color: "#B3B3B3",
=======
                  <p 
                    className="text-spotify-text-gray text-sm"
                    style={{
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#B3B3B3'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                    }}
                  >
                    {partner.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
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
            Partnership Benefits
          </h2>
<<<<<<< HEAD
          <div
            className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg p-8 border border-purple-600/30"
            style={{
              background:
                "linear-gradient(to right, rgba(114, 9, 183, 0.2), rgba(69, 123, 157, 0.2))",
              borderRadius: "8px",
              padding: "32px",
              border: "1px solid rgba(114, 9, 183, 0.3)",
=======
          <div 
            className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg p-8 border border-purple-600/30"
            style={{
              background: 'linear-gradient(to right, rgba(114, 9, 183, 0.2), rgba(69, 123, 157, 0.2))',
              borderRadius: '8px',
              padding: '32px',
              border: '1px solid rgba(114, 9, 183, 0.3)'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
<<<<<<< HEAD
                "Access to 5M+ users",
                "Co-marketing opportunities",
                "Technical integration support",
                "Dedicated partner manager",
                "Revenue sharing options",
                "Priority support channels",
                "Early feature access",
                "Brand visibility",
              ].map((benefit, index) => (
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
                    className="text-white"
                    style={{
                      fontSize: "14px",
                      lineHeight: "20px",
                      color: "#FFFFFF",
=======
                'Access to 5M+ users',
                'Co-marketing opportunities',
                'Technical integration support',
                'Dedicated partner manager',
                'Revenue sharing options',
                'Priority support channels',
                'Early feature access',
                'Brand visibility'
              ].map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3"
                  style={{ gap: '12px' }}
                >
                  <CheckCircle2 
                    size={20} 
                    className="text-spotify-green flex-shrink-0"
                    style={{ color: '#7209B7' }}
                  />
                  <span 
                    className="text-white"
                    style={{
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#FFFFFF'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
              Become a Partner
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
              Interested in partnering with EmPulse Music? Contact our
              partnerships team to discuss opportunities.
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
              Interested in partnering with EmPulse Music? Contact our partnerships team to discuss opportunities.
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
              Contact Partnerships Team
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
