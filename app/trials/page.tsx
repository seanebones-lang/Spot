<<<<<<< HEAD
"use client";

import Link from "next/link";
import { Check } from "lucide-react";

export default function TrialsPage() {
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
      <h1
        className="text-4xl font-bold mb-8"
        style={{
          fontSize: "32px",
          lineHeight: "36px",
          fontWeight: 700,
          color: "#FFFFFF",
          marginBottom: "32px",
=======
'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';

export default function TrialsPage() {
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
      <h1 
        className="text-4xl font-bold mb-8"
        style={{
          fontSize: '32px',
          lineHeight: '36px',
          fontWeight: 700,
          color: '#FFFFFF',
          marginBottom: '32px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        }}
      >
        Free Trials
      </h1>
<<<<<<< HEAD
      <div
        className="max-w-4xl"
        style={{
          maxWidth: "896px",
        }}
      >
        <div
          className="bg-spotify-light-gray rounded-lg p-8 mb-6"
          style={{
            backgroundColor: "#181818",
            borderRadius: "8px",
            padding: "32px",
            marginBottom: "24px",
          }}
        >
          <h2
            className="text-2xl font-bold mb-4"
            style={{
              fontSize: "24px",
              lineHeight: "28px",
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: "16px",
=======
      <div 
        className="max-w-4xl"
        style={{
          maxWidth: '896px'
        }}
      >
        <div 
          className="bg-spotify-light-gray rounded-lg p-8 mb-6"
          style={{
            backgroundColor: '#181818',
            borderRadius: '8px',
            padding: '32px',
            marginBottom: '24px'
          }}
        >
          <h2 
            className="text-2xl font-bold mb-4"
            style={{
              fontSize: '24px',
              lineHeight: '28px',
              fontWeight: 700,
              color: '#FFFFFF',
              marginBottom: '16px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            Try Premium Free for 30 Days
          </h2>
<<<<<<< HEAD
          <ul
            className="space-y-3 mb-6"
            style={{
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            {[
              "Ad-free music",
              "On-demand playback",
              "Download for offline",
              "High quality audio",
            ].map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-3"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <Check
                  className="w-5 h-5 text-spotify-green flex-shrink-0"
                  style={{
                    width: "20px",
                    height: "20px",
                    color: "#1DB954",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#FFFFFF",
=======
          <ul 
            className="space-y-3 mb-6"
            style={{
              gap: '12px',
              marginBottom: '24px'
            }}
          >
            {['Ad-free music', 'On-demand playback', 'Download for offline', 'High quality audio'].map((feature) => (
              <li 
                key={feature} 
                className="flex items-center gap-3"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <Check 
                  className="w-5 h-5 text-spotify-green flex-shrink-0"
                  style={{
                    width: '20px',
                    height: '20px',
                    color: '#7209B7',
                    flexShrink: 0
                  }}
                />
                <span 
                  style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#FFFFFF'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  }}
                >
                  {feature}
                </span>
              </li>
            ))}
          </ul>
<<<<<<< HEAD
          <Link
            href="/subscription"
            className="inline-block bg-spotify-green hover:bg-[#1ed760] text-black px-8 py-3 rounded-full font-medium transition-colors"
            style={{
              display: "inline-block",
              backgroundColor: "#1DB954",
              color: "#000000",
              padding: "12px 32px",
              borderRadius: "500px",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 700,
              letterSpacing: "0.05em",
              transition: "all 200ms ease-out",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1ed760";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#1DB954";
              e.currentTarget.style.transform = "scale(1)";
=======
          <Link 
            href="/subscription" 
            className="inline-block bg-spotify-green hover:bg-[#8a1dd0] text-black px-8 py-3 rounded-full font-medium transition-colors"
            style={{
              display: 'inline-block',
              backgroundColor: '#7209B7',
              color: '#000000',
              padding: '12px 32px',
              borderRadius: '500px',
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              transition: 'all 200ms ease-out',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#8a1dd0';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#7209B7';
              e.currentTarget.style.transform = 'scale(1)';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </div>
  );
}
