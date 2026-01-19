"use client";

import { Bell } from "lucide-react";

const announcements = [
  {
    id: "1",
    title: "New Feature: AI Assistant",
    date: "2026-01-15",
    content: "Chat with our AI assistant powered by xAI Grok for instant help.",
  },
  {
    id: "2",
    title: "Premium Benefits Updated",
    date: "2026-01-10",
    content: "New exclusive content and features for Premium subscribers.",
  },
];

export default function AnnouncementsPage() {
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
        Announcements
      </h1>
      <div className="space-y-4" style={{ gap: "16px" }}>
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="bg-spotify-light-gray rounded-lg p-6 hover:bg-spotify-dark-gray transition-all duration-200"
            style={{
              backgroundColor: "#181818",
              borderRadius: "8px",
              padding: "24px",
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
              className="flex items-start gap-4"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
              }}
            >
              <Bell
                className="w-6 h-6 text-spotify-green flex-shrink-0 mt-1"
                style={{
                  width: "24px",
                  height: "24px",
                  color: "#7209B7",
                  flexShrink: 0,
                  marginTop: "4px",
                }}
              />
              <div>
                <h3
                  className="font-bold text-lg mb-2"
                  style={{
                    fontSize: "18px",
                    lineHeight: "24px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    marginBottom: "8px",
                  }}
                >
                  {announcement.title}
                </h3>
                <p
                  className="text-spotify-text-gray text-sm mb-2"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#B3B3B3",
                    marginBottom: "8px",
                  }}
                >
                  {new Date(announcement.date).toLocaleDateString()}
                </p>
                <p
                  className="text-white"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#FFFFFF",
                  }}
                >
                  {announcement.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
