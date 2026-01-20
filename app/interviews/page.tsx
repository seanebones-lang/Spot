"use client";

import Link from "next/link";
import Image from "next/image";
import { Play, Mic2 } from "lucide-react";

const interviews = [
  {
    id: "1",
    artist: "NextEleven Label Showcase",
    title: "The Journey of Metal",
    duration: "45:30",
    image:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop&q=80",
  },
];

export default function InterviewsPage() {
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
        }}
      >
        Artist Interviews
      </h1>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        {interviews.map((interview) => (
          <div
            key={interview.id}
            className="bg-spotify-light-gray hover:bg-spotify-dark-gray rounded-lg overflow-hidden transition-colors group"
            style={{
              backgroundColor: "#181818",
              borderRadius: "8px",
              overflow: "hidden",
              transition: "background-color 200ms ease-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#282828";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#181818";
            }}
          >
            <div
              className="relative w-full h-48 bg-spotify-dark-gray"
              style={{
                width: "100%",
                height: "192px",
                backgroundColor: "#282828",
                position: "relative",
              }}
            >
              {interview.image && (
                <Image
                  src={interview.image}
                  alt={interview.title}
                  fill
                  className="object-cover"
                  style={{ objectFit: "cover" }}
                />
              )}
            </div>
            <div className="p-4" style={{ padding: "16px" }}>
              <div
                className="flex items-center gap-2 mb-2"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                <Mic2
                  className="w-4 h-4 text-spotify-green"
                  style={{
                    width: "16px",
                    height: "16px",
                    color: "#1DB954",
                    flexShrink: 0,
                  }}
                />
                <span
                  className="text-xs text-spotify-text-gray"
                  style={{
                    fontSize: "11px",
                    lineHeight: "16px",
                    color: "#B3B3B3",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  Interview
                </span>
              </div>
              <h3
                className="font-bold text-lg mb-1"
                style={{
                  fontSize: "18px",
                  lineHeight: "24px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  marginBottom: "4px",
                }}
              >
                {interview.title}
              </h3>
              <p
                className="text-sm text-spotify-text-gray mb-2"
                style={{
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "#B3B3B3",
                  marginBottom: "8px",
                }}
              >
                {interview.artist}
              </p>
              <p
                className="text-xs text-spotify-text-gray"
                style={{
                  fontSize: "13px",
                  lineHeight: "16px",
                  color: "#B3B3B3",
                }}
              >
                {interview.duration}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
