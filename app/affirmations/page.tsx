<<<<<<< HEAD
"use client";

import { useState } from "react";
import { useAffirmationsStore } from "@/stores/affirmationsStore";
import { Heart, Play, Clock } from "lucide-react";

const categories: { value: string; label: string; color: string }[] = [
  {
    value: "morning",
    label: "Morning",
    color: "from-yellow-500 to-orange-500",
  },
  { value: "calm", label: "Calm", color: "from-blue-500 to-cyan-500" },
  {
    value: "confidence",
    label: "Confidence",
    color: "from-purple-500 to-pink-500",
  },
  {
    value: "empowerment",
    label: "Empowerment",
    color: "from-green-500 to-emerald-500",
  },
];

export default function AffirmationsPage() {
  const {
    affirmations,
    favorites,
    addFavorite,
    removeFavorite,
    dailyReminder,
    setDailyReminder,
  } = useAffirmationsStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredAffirmations = selectedCategory
    ? affirmations.filter((a) => a.category === selectedCategory)
=======
'use client';

import { useState } from 'react';
import { useAffirmationsStore } from '@/stores/affirmationsStore';
import { Heart, Play, Clock } from 'lucide-react';
import { getCardBackgroundInline } from '@/lib/cardBackgrounds';

const categories: { value: string; label: string; color: string }[] = [
  { value: 'morning', label: 'Morning', color: 'from-yellow-500 to-orange-500' },
  { value: 'calm', label: 'Calm', color: 'from-blue-500 to-cyan-500' },
  { value: 'confidence', label: 'Confidence', color: 'from-purple-500 to-pink-500' },
  { value: 'empowerment', label: 'Empowerment', color: 'from-green-500 to-emerald-500' },
];

export default function AffirmationsPage() {
  const { affirmations, favorites, addFavorite, removeFavorite, dailyReminder, setDailyReminder } = useAffirmationsStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredAffirmations = selectedCategory
    ? affirmations.filter(a => a.category === selectedCategory)
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    : affirmations;

  return (
    <div
      className="p-8"
      style={{
<<<<<<< HEAD
        padding: "32px",
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
=======
        padding: window.innerWidth < 768 ? '16px' : '32px',
        backgroundColor: '#121212',
        minHeight: '100vh',
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
        Affirmations
      </h1>

      {/* Daily Reminder Setting - Exact Spotify Style */}
      <div
        className="bg-spotify-light-gray rounded-lg p-6 mb-8"
        style={{
<<<<<<< HEAD
          backgroundColor: "#181818",
          borderRadius: "8px",
          padding: "24px",
          marginBottom: "32px",
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <div>
            <h3
              className="text-lg font-bold mb-1 flex items-center gap-2"
              style={{
                fontSize: "18px",
                lineHeight: "24px",
                fontWeight: 700,
                color: "#FFFFFF",
                marginBottom: "4px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Clock
                size={20}
                style={{
                  width: "20px",
                  height: "20px",
                  color: "#FFFFFF",
                  flexShrink: 0,
=======
          ...getCardBackgroundInline('daily-reminder'),
          borderRadius: '8px',
          padding: '24px',
          marginBottom: '32px',
          filter: 'brightness(0.9)'
        }}
      >
        <div 
          className="flex items-center justify-between"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}
        >
          <div>
            <h3 
              className="text-lg font-bold mb-1 flex items-center gap-2"
              style={{
                fontSize: '18px',
                lineHeight: '24px',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Clock 
                size={20}
                style={{
                  width: '20px',
                  height: '20px',
                  color: '#FFFFFF',
                  flexShrink: 0
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                }}
              />
              Daily Reminder
            </h3>
<<<<<<< HEAD
            <p
              className="text-sm text-spotify-text-gray"
              style={{
                fontSize: "14px",
                lineHeight: "20px",
                color: "#B3B3B3",
=======
            <p 
              className="text-sm text-spotify-text-gray"
              style={{
                fontSize: '14px',
                lineHeight: '20px',
                color: '#B3B3B3'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              }}
            >
              Get a daily affirmation notification
            </p>
          </div>
<<<<<<< HEAD
          <label
            className="flex items-center gap-3"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              cursor: "pointer",
=======
          <label 
            className="flex items-center gap-3"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            <input
              type="checkbox"
              checked={dailyReminder}
              onChange={(e) => setDailyReminder(e.target.checked)}
              className="w-12 h-6 rounded-full appearance-none bg-spotify-dark-gray checked:bg-spotify-green transition-colors relative cursor-pointer"
              style={{
<<<<<<< HEAD
                width: "48px",
                height: "24px",
                borderRadius: "12px",
                appearance: "none",
                backgroundColor: dailyReminder ? "#1DB954" : "#282828",
                cursor: "pointer",
                transition: "background-color 200ms ease-out",
                position: "relative",
=======
                width: '48px',
                height: '24px',
                borderRadius: '12px',
                appearance: 'none',
                backgroundColor: dailyReminder ? '#7209B7' : '#282828',
                cursor: 'pointer',
                transition: 'background-color 200ms ease-out',
                position: 'relative'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              }}
            />
          </label>
        </div>
      </div>

      {/* Categories - Exact Spotify Style */}
<<<<<<< HEAD
      <div className="mb-8" style={{ marginBottom: "32px" }}>
        <h2
          className="text-xl font-bold mb-4"
          style={{
            fontSize: "20px",
            lineHeight: "28px",
            fontWeight: 700,
            color: "#FFFFFF",
            marginBottom: "16px",
=======
      <div 
        className="mb-8"
        style={{ marginBottom: '32px' }}
      >
        <h2 
          className="text-xl font-bold mb-4"
          style={{
            fontSize: '20px',
            lineHeight: '28px',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '16px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }}
        >
          Categories
        </h2>
<<<<<<< HEAD
        <div
          className="flex gap-4 flex-wrap"
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
=======
        <div 
          className="flex gap-4 flex-wrap"
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }}
        >
          <button
            onClick={() => setSelectedCategory(null)}
            className={`rounded-full font-medium transition-all ${
              selectedCategory === null
<<<<<<< HEAD
                ? "bg-spotify-green text-black hover:bg-[#1ed760]"
                : "bg-spotify-light-gray text-white hover:bg-spotify-dark-gray"
            }`}
            style={{
              padding: "6px 24px",
              borderRadius: "500px",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 700,
              letterSpacing: "0.05em",
              transition: "all 200ms ease-out",
              backgroundColor:
                selectedCategory === null ? "#1DB954" : "#282828",
              color: selectedCategory === null ? "#000000" : "#FFFFFF",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              if (selectedCategory === null) {
                e.currentTarget.style.backgroundColor = "#1ed760";
              } else {
                e.currentTarget.style.backgroundColor = "#3e3e3e";
=======
                ? 'bg-spotify-green text-black hover:bg-[#8a1dd0]'
                : 'bg-spotify-light-gray text-white hover:bg-spotify-dark-gray'
            }`}
            style={{
              padding: '6px 24px',
              borderRadius: '500px',
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              transition: 'all 200ms ease-out',
              backgroundColor: selectedCategory === null ? '#7209B7' : '#282828',
              color: selectedCategory === null ? '#000000' : '#FFFFFF',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              if (selectedCategory === null) {
                e.currentTarget.style.backgroundColor = '#8a1dd0';
              } else {
                e.currentTarget.style.backgroundColor = '#3e3e3e';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              }
            }}
            onMouseLeave={(e) => {
              if (selectedCategory === null) {
<<<<<<< HEAD
                e.currentTarget.style.backgroundColor = "#1DB954";
              } else {
                e.currentTarget.style.backgroundColor = "#282828";
=======
                e.currentTarget.style.backgroundColor = '#7209B7';
              } else {
                e.currentTarget.style.backgroundColor = '#282828';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              }
            }}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`rounded-full font-medium transition-all ${
                selectedCategory === cat.value
                  ? `bg-gradient-to-r ${cat.color} text-white`
<<<<<<< HEAD
                  : "bg-spotify-light-gray text-white hover:bg-spotify-dark-gray"
              }`}
              style={{
                padding: "6px 24px",
                borderRadius: "500px",
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: 700,
                letterSpacing: "0.05em",
                transition: "all 200ms ease-out",
                backgroundColor:
                  selectedCategory === cat.value ? undefined : "#282828",
                background:
                  selectedCategory === cat.value
                    ? `linear-gradient(90deg, ${cat.color.split(" ")[1]} 0%, ${cat.color.split(" ")[3]} 100%)`
                    : undefined,
                color: "#FFFFFF",
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== cat.value) {
                  e.currentTarget.style.backgroundColor = "#3e3e3e";
=======
                  : 'bg-spotify-light-gray text-white hover:bg-spotify-dark-gray'
              }`}
              style={{
                padding: '6px 24px',
                borderRadius: '500px',
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                transition: 'all 200ms ease-out',
                backgroundColor: selectedCategory === cat.value ? undefined : '#282828',
                background: selectedCategory === cat.value ? `linear-gradient(90deg, ${cat.color.split(' ')[1]} 0%, ${cat.color.split(' ')[3]} 100%)` : undefined,
                color: '#FFFFFF',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== cat.value) {
                  e.currentTarget.style.backgroundColor = '#3e3e3e';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== cat.value) {
<<<<<<< HEAD
                  e.currentTarget.style.backgroundColor = "#282828";
=======
                  e.currentTarget.style.backgroundColor = '#282828';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                }
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Affirmations List - Exact Spotify Style */}
<<<<<<< HEAD
      <div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "16px",
=======
      <div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '16px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        }}
      >
        {filteredAffirmations.map((affirmation) => {
          const isFavorite = favorites.includes(affirmation.id);
          return (
            <div
              key={affirmation.id}
<<<<<<< HEAD
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
                className="flex items-start justify-between mb-4"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                  gap: "16px",
                }}
              >
                <span
                  className="px-3 py-1 bg-spotify-green/20 text-spotify-green rounded-full text-xs font-medium"
                  style={{
                    padding: "4px 12px",
                    backgroundColor: "rgba(114, 9, 183, 0.2)",
                    color: "#1DB954",
                    borderRadius: "500px",
                    fontSize: "11px",
                    lineHeight: "16px",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {
                    categories.find((c) => c.value === affirmation.category)
                      ?.label
                  }
                </span>
                <button
                  onClick={() =>
                    isFavorite
                      ? removeFavorite(affirmation.id)
                      : addFavorite(affirmation.id)
                  }
                  className="text-spotify-text-gray hover:text-red-500 transition-colors"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: isFavorite ? "#EF4444" : "#B3B3B3",
                    transition: "color 200ms ease-out",
                    padding: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#EF4444";
                  }}
                  onMouseLeave={(e) => {
                    if (!isFavorite) {
                      e.currentTarget.style.color = "#B3B3B3";
                    }
                  }}
                >
                  <Heart
                    size={20}
                    className={isFavorite ? "fill-red-500 text-red-500" : ""}
                    style={{
                      width: "20px",
                      height: "20px",
                      color: isFavorite ? "#EF4444" : "#B3B3B3",
=======
              className="bg-spotify-light-gray rounded-lg p-6 hover:brightness-110 transition-all duration-200"
              style={{
                ...getCardBackgroundInline(affirmation.id + affirmation.category),
                borderRadius: '8px',
                padding: '24px',
                transition: 'all 200ms ease-out',
                filter: 'brightness(0.95)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'brightness(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'brightness(0.95)';
              }}
            >
              <div 
                className="flex items-start justify-between mb-4"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                  gap: '16px'
                }}
              >
                <span 
                  className="px-3 py-1 bg-empulse-purple/20 text-empulse-purple rounded-full text-xs font-medium"
                  style={{
                    padding: '4px 12px',
                    backgroundColor: 'rgba(114, 9, 183, 0.2)',
                    color: '#7209B7',
                    borderRadius: '500px',
                    fontSize: '11px',
                    lineHeight: '16px',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                  }}
                >
                  {categories.find(c => c.value === affirmation.category)?.label}
                </span>
                <button
                  onClick={() => isFavorite ? removeFavorite(affirmation.id) : addFavorite(affirmation.id)}
                  className="text-spotify-text-gray hover:text-red-500 transition-colors"
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: isFavorite ? '#EF4444' : '#B3B3B3',
                    transition: 'color 200ms ease-out',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#EF4444';
                  }}
                  onMouseLeave={(e) => {
                    if (!isFavorite) {
                      e.currentTarget.style.color = '#B3B3B3';
                    }
                  }}
                >
                  <Heart 
                    size={20} 
                    className={isFavorite ? 'fill-red-500 text-red-500' : ''}
                    style={{
                      width: '20px',
                      height: '20px',
                      color: isFavorite ? '#EF4444' : '#B3B3B3'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                    }}
                  />
                </button>
              </div>
<<<<<<< HEAD
              <p
                className="text-white mb-4 text-lg leading-relaxed"
                style={{
                  fontSize: "18px",
                  lineHeight: "28px",
                  fontWeight: 400,
                  color: "#FFFFFF",
                  marginBottom: "16px",
=======
              <p 
                className="text-white mb-4 text-lg leading-relaxed"
                style={{
                  fontSize: '18px',
                  lineHeight: '28px',
                  fontWeight: 400,
                  color: '#FFFFFF',
                  marginBottom: '16px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                }}
              >
                {affirmation.text}
              </p>
<<<<<<< HEAD
              <div
                className="flex items-center gap-2"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {affirmation.audioUrl && (
                  <button
                    className="flex items-center gap-2 text-spotify-green hover:underline text-sm"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#1DB954",
                      fontSize: "14px",
                      lineHeight: "20px",
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      transition: "text-decoration 200ms ease-out",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.textDecoration = "underline")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.textDecoration = "none")
                    }
                  >
                    <Play
                      size={16}
                      style={{
                        width: "16px",
                        height: "16px",
                        flexShrink: 0,
=======
              <div 
                className="flex items-center gap-2"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {affirmation.audioUrl && (
                  <button 
                    className="flex items-center gap-2 text-spotify-green hover:underline text-sm"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#7209B7',
                      fontSize: '14px',
                      lineHeight: '20px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'text-decoration 200ms ease-out'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                  >
                    <Play 
                      size={16}
                      style={{
                        width: '16px',
                        height: '16px',
                        flexShrink: 0
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                      }}
                    />
                    Play Audio
                  </button>
                )}
<<<<<<< HEAD
                {affirmation.voice === "artist" && affirmation.artistId && (
                  <span
                    className="text-xs text-spotify-text-gray"
                    style={{
                      fontSize: "13px",
                      lineHeight: "16px",
                      color: "#B3B3B3",
=======
                {affirmation.voice === 'artist' && affirmation.artistId && (
                  <span 
                    className="text-xs text-spotify-text-gray"
                    style={{
                      fontSize: '13px',
                      lineHeight: '16px',
                      color: '#B3B3B3'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                    }}
                  >
                    Artist voice
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
