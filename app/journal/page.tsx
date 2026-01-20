"use client";

import { useState } from "react";
import { useJournalStore } from "@/stores/journalStore";
import { useRouter } from "next/navigation";
import { BookOpen, Heart, Music } from "lucide-react";

export default function JournalPage() {
  const router = useRouter();
  const { entries, addEntry, deleteEntry, getStreak } = useJournalStore();
  const [isCreating, setIsCreating] = useState(false);
  const [newEntry, setNewEntry] = useState({
    text: "",
    moodTags: {} as any,
    feelings: [] as string[],
    associatedMusic: [] as string[],
    shared: false,
  });

  const handleCreateEntry = () => {
    if (newEntry.text.trim()) {
      addEntry(newEntry);
      setNewEntry({
        text: "",
        moodTags: {},
        feelings: [],
        associatedMusic: [],
        shared: false,
      });
      setIsCreating(false);
    }
  };

  const feelings = [
    "Anxious",
    "Overwhelmed",
    "Stressed",
    "Great",
    "Confident",
    "Relaxed",
    "Excited",
  ];

  return (
    <div
      className="p-8 max-w-4xl mx-auto"
      style={{
        padding: "32px",
        maxWidth: "896px",
        margin: "0 auto",
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "#FFFFFF",
      }}
    >
      <div
        className="flex items-center justify-between mb-8"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "32px",
          gap: "16px",
        }}
      >
        <div>
          <h1
            className="text-4xl font-bold mb-2 bg-gradient-to-r from-spotify-green to-spotify-green bg-clip-text text-transparent"
            style={{
              fontSize: "32px",
              lineHeight: "36px",
              fontWeight: 700,
              marginBottom: "8px",
              background: "linear-gradient(90deg, #1DB954 0%, #1ed760 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Your Journal
          </h1>
          <p
            className="text-spotify-text-gray"
            style={{
              fontSize: "14px",
              lineHeight: "20px",
              color: "#B3B3B3",
            }}
          >
            {getStreak()} day streak • {entries.length} entries
          </p>
        </div>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="btn-primary"
            style={{
              backgroundColor: "#1DB954",
              color: "#000000",
              fontWeight: 700,
              padding: "12px 24px",
              borderRadius: "500px",
              fontSize: "14px",
              lineHeight: "20px",
              border: "none",
              cursor: "pointer",
              transition: "all 200ms ease-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1ed760";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#1DB954";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            New Entry
          </button>
        )}
      </div>

      {/* Create New Entry - Exact Spotify Style */}
      {isCreating && (
        <div
          className="bg-spotify-light-gray rounded-lg p-6 mb-8"
          style={{
            backgroundColor: "#181818",
            borderRadius: "8px",
            padding: "24px",
            marginBottom: "32px",
          }}
        >
          <h2
            className="text-xl font-bold mb-4"
            style={{
              fontSize: "20px",
              lineHeight: "28px",
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: "16px",
            }}
          >
            New Journal Entry
          </h2>
          <textarea
            value={newEntry.text}
            onChange={(e) => setNewEntry({ ...newEntry, text: e.target.value })}
            placeholder="Share your thoughts..."
            className="w-full bg-spotify-dark-gray rounded-lg p-4 text-white placeholder:text-spotify-text-gray focus:outline-none focus:ring-2 focus:ring-spotify-green min-h-32 mb-4"
            style={{
              width: "100%",
              backgroundColor: "#282828",
              borderRadius: "8px",
              padding: "16px",
              color: "#FFFFFF",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 400,
              minHeight: "128px",
              marginBottom: "16px",
              border: "1px solid transparent",
              fontFamily: "inherit",
              resize: "vertical",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#1DB954";
              e.currentTarget.style.borderWidth = "2px";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "transparent";
              e.currentTarget.style.borderWidth = "1px";
            }}
          />

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Feelings (optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {feelings.map((feeling) => (
                <button
                  key={feeling}
                  onClick={() => {
                    if (newEntry.feelings.includes(feeling)) {
                      setNewEntry({
                        ...newEntry,
                        feelings: newEntry.feelings.filter(
                          (f) => f !== feeling,
                        ),
                      });
                    } else {
                      setNewEntry({
                        ...newEntry,
                        feelings: [...newEntry.feelings, feeling],
                      });
                    }
                  }}
                  className={`px-3 py-1 rounded-full text-sm ${
                    newEntry.feelings.includes(feeling)
                      ? "bg-spotify-green text-black"
                      : "bg-spotify-dark-gray text-white"
                  }`}
                >
                  {feeling}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newEntry.shared}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, shared: e.target.checked })
                }
                className="rounded"
              />
              <span className="text-sm">Share with community</span>
            </label>
          </div>

          <div className="flex gap-4">
            <button onClick={handleCreateEntry} className="btn-primary">
              Save Entry
            </button>
            <button
              onClick={() => {
                setIsCreating(false);
                setNewEntry({
                  text: "",
                  moodTags: {},
                  feelings: [],
                  associatedMusic: [],
                  shared: false,
                });
              }}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Journal Entries Timeline - Exact Spotify Style */}
      <div className="space-y-4" style={{ gap: "16px" }}>
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="bg-spotify-light-gray rounded-lg p-6"
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
              className="flex items-start justify-between mb-3"
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: "12px",
                gap: "16px",
              }}
            >
              <div
                className="flex items-center gap-3"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <BookOpen
                  size={20}
                  className="text-spotify-green"
                  style={{
                    width: "20px",
                    height: "20px",
                    color: "#1DB954",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div
                    className="font-semibold"
                    style={{
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: 600,
                      color: "#FFFFFF",
                      marginBottom: "4px",
                    }}
                  >
                    {new Date(entry.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <div
                    className="text-xs text-spotify-text-gray"
                    style={{
                      fontSize: "13px",
                      lineHeight: "16px",
                      color: "#B3B3B3",
                    }}
                  >
                    {new Date(entry.date).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
              {entry.shared && (
                <span
                  className="px-2 py-1 bg-spotify-green/20 text-spotify-green rounded text-xs"
                  style={{
                    padding: "4px 8px",
                    backgroundColor: "rgba(69, 123, 157, 0.2)",
                    color: "#1ed760",
                    borderRadius: "4px",
                    fontSize: "11px",
                    lineHeight: "16px",
                    fontWeight: 600,
                  }}
                >
                  Shared
                </span>
              )}
            </div>
            <p
              className="text-spotify-text-gray mb-4 whitespace-pre-wrap"
              style={{
                fontSize: "14px",
                lineHeight: "20px",
                color: "#B3B3B3",
                marginBottom: "16px",
                whiteSpace: "pre-wrap",
              }}
            >
              {entry.text}
            </p>
            {entry.feelings && entry.feelings.length > 0 && (
              <div
                className="flex flex-wrap gap-2 mb-2"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                {entry.feelings.map((feeling) => (
                  <span
                    key={feeling}
                    className="px-2 py-1 bg-spotify-green/20 text-spotify-green rounded text-xs"
                    style={{
                      padding: "4px 8px",
                      backgroundColor: "rgba(114, 9, 183, 0.2)",
                      color: "#1DB954",
                      borderRadius: "4px",
                      fontSize: "11px",
                      lineHeight: "16px",
                      fontWeight: 600,
                    }}
                  >
                    {feeling}
                  </span>
                ))}
              </div>
            )}
            <button
              onClick={() => deleteEntry(entry.id)}
              className="text-red-400 hover:text-red-300 text-sm"
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#EF4444",
                fontSize: "14px",
                lineHeight: "20px",
                transition: "color 200ms ease-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#F87171";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#EF4444";
              }}
            >
              Delete
            </button>
          </div>
        ))}

        {entries.length === 0 && (
          <div className="text-center py-16">
            <BookOpen
              size={64}
              className="mx-auto mb-4 text-spotify-text-gray opacity-50"
            />
            <p className="text-spotify-text-gray text-lg mb-2">
              No journal entries yet
            </p>
            <p className="text-spotify-text-gray text-sm mb-4">
              Start journaling to track your journey and earn points
            </p>
            <button onClick={() => setIsCreating(true)} className="btn-primary">
              Create First Entry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
