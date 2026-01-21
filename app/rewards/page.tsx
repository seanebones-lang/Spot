<<<<<<< HEAD
"use client";

import { usePointsStore } from "@/stores/pointsStore";
import { useCheckInStore } from "@/stores/checkInStore";
import { Award, Ticket, Gift, Star } from "lucide-react";

const rewards = [
  {
    id: "1",
    name: "EmPulse Music T-Shirt",
    points: 500,
    type: "merch",
    icon: Gift,
  },
  {
    id: "2",
    name: "Concert Tickets",
    points: 1000,
    type: "tickets",
    icon: Ticket,
  },
  {
    id: "3",
    name: "Extended Free Trial (90 days)",
    points: 750,
    type: "trial",
    icon: Star,
  },
  {
    id: "4",
    name: "Exclusive Content Access",
    points: 300,
    type: "content",
    icon: Award,
  },
=======
'use client';

import { usePointsStore } from '@/stores/pointsStore';
import { useCheckInStore } from '@/stores/checkInStore';
import { Award, Ticket, Gift, Star } from 'lucide-react';

const rewards = [
  { id: '1', name: 'EmPulse Music T-Shirt', points: 500, type: 'merch', icon: Gift },
  { id: '2', name: 'Concert Tickets', points: 1000, type: 'tickets', icon: Ticket },
  { id: '3', name: 'Extended Free Trial (90 days)', points: 750, type: 'trial', icon: Star },
  { id: '4', name: 'Exclusive Content Access', points: 300, type: 'content', icon: Award },
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
];

export default function RewardsPage() {
  const { totalPoints } = usePointsStore();
  const { getStreak } = useCheckInStore();
  const streak = getStreak();

  return (
<<<<<<< HEAD
    <div
      className="p-8"
      style={{
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
    <div 
      className="p-8"
      style={{
        padding: '32px',
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
        Points & Rewards
      </h1>

      {/* Points Dashboard - Exact Spotify Style */}
<<<<<<< HEAD
      <div
        className="grid grid-cols-3 gap-4 mb-8"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        <div
          className="bg-gradient-to-br from-spotify-green to-spotify-green rounded-lg p-6 text-white"
          style={{
            background: "linear-gradient(135deg, #1DB954 0%, #1ed760 100%)",
            borderRadius: "8px",
            padding: "24px",
            color: "#FFFFFF",
          }}
        >
          <div
            className="text-sm opacity-80 mb-1"
            style={{
              fontSize: "13px",
              lineHeight: "16px",
              color: "rgba(255, 255, 255, 0.8)",
              marginBottom: "4px",
=======
      <div 
        className="grid grid-cols-3 gap-4 mb-8"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '32px'
        }}
      >
        <div 
          className="bg-gradient-to-br from-empulse-purple to-empulse-blue rounded-lg p-6 text-white"
          style={{
            background: 'linear-gradient(135deg, #7209B7 0%, #457B9D 100%)',
            borderRadius: '8px',
            padding: '24px',
            color: '#FFFFFF'
          }}
        >
          <div 
            className="text-sm opacity-80 mb-1"
            style={{
              fontSize: '13px',
              lineHeight: '16px',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '4px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            Total Points
          </div>
<<<<<<< HEAD
          <div
            className="text-3xl font-bold"
            style={{
              fontSize: "32px",
              lineHeight: "36px",
              fontWeight: 700,
              color: "#FFFFFF",
=======
          <div 
            className="text-3xl font-bold"
            style={{
              fontSize: '32px',
              lineHeight: '36px',
              fontWeight: 700,
              color: '#FFFFFF'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            {totalPoints}
          </div>
        </div>
<<<<<<< HEAD
        <div
          className="bg-gradient-to-br from-orange-500 to-red-500 rounded-lg p-6 text-white"
          style={{
            background: "linear-gradient(135deg, #F97316 0%, #EF4444 100%)",
            borderRadius: "8px",
            padding: "24px",
            color: "#FFFFFF",
          }}
        >
          <div
            className="text-sm opacity-80 mb-1"
            style={{
              fontSize: "13px",
              lineHeight: "16px",
              color: "rgba(255, 255, 255, 0.8)",
              marginBottom: "4px",
=======
        <div 
          className="bg-gradient-to-br from-orange-500 to-red-500 rounded-lg p-6 text-white"
          style={{
            background: 'linear-gradient(135deg, #F97316 0%, #EF4444 100%)',
            borderRadius: '8px',
            padding: '24px',
            color: '#FFFFFF'
          }}
        >
          <div 
            className="text-sm opacity-80 mb-1"
            style={{
              fontSize: '13px',
              lineHeight: '16px',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '4px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            Current Streak
          </div>
<<<<<<< HEAD
          <div
            className="text-3xl font-bold"
            style={{
              fontSize: "32px",
              lineHeight: "36px",
              fontWeight: 700,
              color: "#FFFFFF",
=======
          <div 
            className="text-3xl font-bold"
            style={{
              fontSize: '32px',
              lineHeight: '36px',
              fontWeight: 700,
              color: '#FFFFFF'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            🔥 {streak} days
          </div>
        </div>
<<<<<<< HEAD
        <div
          className="bg-gradient-to-br from-green-500 to-teal-500 rounded-lg p-6 text-white"
          style={{
            background: "linear-gradient(135deg, #22C55E 0%, #14B8A6 100%)",
            borderRadius: "8px",
            padding: "24px",
            color: "#FFFFFF",
          }}
        >
          <div
            className="text-sm opacity-80 mb-1"
            style={{
              fontSize: "13px",
              lineHeight: "16px",
              color: "rgba(255, 255, 255, 0.8)",
              marginBottom: "4px",
=======
        <div 
          className="bg-gradient-to-br from-green-500 to-teal-500 rounded-lg p-6 text-white"
          style={{
            background: 'linear-gradient(135deg, #22C55E 0%, #14B8A6 100%)',
            borderRadius: '8px',
            padding: '24px',
            color: '#FFFFFF'
          }}
        >
          <div 
            className="text-sm opacity-80 mb-1"
            style={{
              fontSize: '13px',
              lineHeight: '16px',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '4px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            Available
          </div>
<<<<<<< HEAD
          <div
            className="text-3xl font-bold"
            style={{
              fontSize: "32px",
              lineHeight: "36px",
              fontWeight: 700,
              color: "#FFFFFF",
=======
          <div 
            className="text-3xl font-bold"
            style={{
              fontSize: '32px',
              lineHeight: '36px',
              fontWeight: 700,
              color: '#FFFFFF'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            {totalPoints} pts
          </div>
        </div>
      </div>

      {/* Badges - Exact Spotify Style */}
<<<<<<< HEAD
      <section className="mb-8" style={{ marginBottom: "32px" }}>
        <h2
          className="text-2xl font-bold mb-4"
          style={{
            fontSize: "24px",
            lineHeight: "28px",
            fontWeight: 700,
            color: "#FFFFFF",
            marginBottom: "16px",
=======
      <section 
        className="mb-8"
        style={{ marginBottom: '32px' }}
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
          Your Badges
        </h2>
<<<<<<< HEAD
        <div
          className="flex flex-wrap gap-4"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          {streak >= 7 && (
            <div
              className="bg-spotify-light-gray rounded-lg p-4 text-center"
              style={{
                backgroundColor: "#181818",
                borderRadius: "8px",
                padding: "16px",
                textAlign: "center",
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
                className="text-3xl mb-2"
                style={{
                  fontSize: "32px",
                  lineHeight: "36px",
                  marginBottom: "8px",
=======
        <div 
          className="flex flex-wrap gap-4"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          {streak >= 7 && (
            <div 
              className="bg-spotify-light-gray rounded-lg p-4 text-center"
              style={{
                backgroundColor: '#181818',
                borderRadius: '8px',
                padding: '16px',
                textAlign: 'center',
                transition: 'background-color 200ms ease-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#282828';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#181818';
              }}
            >
              <div 
                className="text-3xl mb-2"
                style={{
                  fontSize: '32px',
                  lineHeight: '36px',
                  marginBottom: '8px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                }}
              >
                🔥
              </div>
<<<<<<< HEAD
              <div
                className="text-sm font-medium"
                style={{
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 600,
                  color: "#FFFFFF",
=======
              <div 
                className="text-sm font-medium"
                style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: 600,
                  color: '#FFFFFF'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                }}
              >
                7-Day Streak
              </div>
            </div>
          )}
          {streak >= 30 && (
<<<<<<< HEAD
            <div
              className="bg-spotify-light-gray rounded-lg p-4 text-center"
              style={{
                backgroundColor: "#181818",
                borderRadius: "8px",
                padding: "16px",
                textAlign: "center",
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
                className="text-3xl mb-2"
                style={{
                  fontSize: "32px",
                  lineHeight: "36px",
                  marginBottom: "8px",
=======
            <div 
              className="bg-spotify-light-gray rounded-lg p-4 text-center"
              style={{
                backgroundColor: '#181818',
                borderRadius: '8px',
                padding: '16px',
                textAlign: 'center',
                transition: 'background-color 200ms ease-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#282828';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#181818';
              }}
            >
              <div 
                className="text-3xl mb-2"
                style={{
                  fontSize: '32px',
                  lineHeight: '36px',
                  marginBottom: '8px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                }}
              >
                ⭐
              </div>
<<<<<<< HEAD
              <div
                className="text-sm font-medium"
                style={{
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 600,
                  color: "#FFFFFF",
=======
              <div 
                className="text-sm font-medium"
                style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: 600,
                  color: '#FFFFFF'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                }}
              >
                30-Day Streak
              </div>
            </div>
          )}
          {totalPoints >= 500 && (
<<<<<<< HEAD
            <div
              className="bg-spotify-light-gray rounded-lg p-4 text-center"
              style={{
                backgroundColor: "#181818",
                borderRadius: "8px",
                padding: "16px",
                textAlign: "center",
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
                className="text-3xl mb-2"
                style={{
                  fontSize: "32px",
                  lineHeight: "36px",
                  marginBottom: "8px",
=======
            <div 
              className="bg-spotify-light-gray rounded-lg p-4 text-center"
              style={{
                backgroundColor: '#181818',
                borderRadius: '8px',
                padding: '16px',
                textAlign: 'center',
                transition: 'background-color 200ms ease-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#282828';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#181818';
              }}
            >
              <div 
                className="text-3xl mb-2"
                style={{
                  fontSize: '32px',
                  lineHeight: '36px',
                  marginBottom: '8px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                }}
              >
                🏆
              </div>
<<<<<<< HEAD
              <div
                className="text-sm font-medium"
                style={{
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 600,
                  color: "#FFFFFF",
=======
              <div 
                className="text-sm font-medium"
                style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: 600,
                  color: '#FFFFFF'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                }}
              >
                500 Points
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Rewards Catalog - Exact Spotify Style */}
      <section>
<<<<<<< HEAD
        <h2
          className="text-2xl font-bold mb-4"
          style={{
            fontSize: "24px",
            lineHeight: "28px",
            fontWeight: 700,
            color: "#FFFFFF",
            marginBottom: "16px",
=======
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
          Rewards Catalog
        </h2>
<<<<<<< HEAD
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "16px",
=======
        <div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }}
        >
          {rewards.map((reward) => {
            const Icon = reward.icon;
            const canAfford = totalPoints >= reward.points;
            return (
              <div
                key={reward.id}
                className={`bg-spotify-light-gray rounded-lg p-6 transition-all duration-200 ${
<<<<<<< HEAD
                  canAfford ? "hover:bg-spotify-dark-gray" : "opacity-60"
                }`}
                style={{
                  backgroundColor: "#181818",
                  borderRadius: "8px",
                  padding: "24px",
                  transition: "background-color 200ms ease-out",
                  opacity: canAfford ? 1 : 0.6,
                }}
                onMouseEnter={(e) => {
                  if (canAfford) {
                    e.currentTarget.style.backgroundColor = "#282828";
=======
                  canAfford ? 'hover:bg-spotify-dark-gray' : 'opacity-60'
                }`}
                style={{
                  backgroundColor: '#181818',
                  borderRadius: '8px',
                  padding: '24px',
                  transition: 'background-color 200ms ease-out',
                  opacity: canAfford ? 1 : 0.6
                }}
                onMouseEnter={(e) => {
                  if (canAfford) {
                    e.currentTarget.style.backgroundColor = '#282828';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  }
                }}
                onMouseLeave={(e) => {
                  if (canAfford) {
<<<<<<< HEAD
                    e.currentTarget.style.backgroundColor = "#181818";
                  }
                }}
              >
                <Icon
                  size={32}
                  className="mb-3 text-spotify-green"
                  style={{
                    width: "32px",
                    height: "32px",
                    color: "#1DB954",
                    marginBottom: "12px",
                  }}
                />
                <h3
                  className="font-bold mb-2"
                  style={{
                    fontSize: "16px",
                    lineHeight: "24px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    marginBottom: "8px",
=======
                    e.currentTarget.style.backgroundColor = '#181818';
                  }
                }}
              >
                <Icon 
                  size={32} 
                  className="mb-3 text-spotify-green"
                  style={{
                    width: '32px',
                    height: '32px',
                    color: '#7209B7',
                    marginBottom: '12px'
                  }}
                />
                <h3 
                  className="font-bold mb-2"
                  style={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    marginBottom: '8px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  }}
                >
                  {reward.name}
                </h3>
<<<<<<< HEAD
                <div
                  className="flex items-center justify-between mt-4"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "16px",
                    gap: "16px",
                  }}
                >
                  <span
                    className="text-sm text-spotify-text-gray"
                    style={{
                      fontSize: "14px",
                      lineHeight: "20px",
                      color: "#B3B3B3",
=======
                <div 
                  className="flex items-center justify-between mt-4"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '16px',
                    gap: '16px'
                  }}
                >
                  <span 
                    className="text-sm text-spotify-text-gray"
                    style={{
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#B3B3B3'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                    }}
                  >
                    {reward.points} points
                  </span>
                  <button
                    disabled={!canAfford}
                    className={`rounded-full text-sm font-medium transition-colors ${
                      canAfford
<<<<<<< HEAD
                        ? "bg-spotify-green text-black hover:bg-[#1ed760]"
                        : "bg-spotify-dark-gray text-spotify-text-gray cursor-not-allowed"
                    }`}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "500px",
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      transition: "all 200ms ease-out",
                      backgroundColor: canAfford ? "#1DB954" : "#282828",
                      color: canAfford ? "#000000" : "#B3B3B3",
                      border: "none",
                      cursor: canAfford ? "pointer" : "not-allowed",
                    }}
                    onMouseEnter={(e) => {
                      if (canAfford) {
                        e.currentTarget.style.backgroundColor = "#1ed760";
=======
                        ? 'bg-spotify-green text-black hover:bg-[#8a1dd0]'
                        : 'bg-spotify-dark-gray text-spotify-text-gray cursor-not-allowed'
                    }`}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '500px',
                      fontSize: '14px',
                      lineHeight: '20px',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      transition: 'all 200ms ease-out',
                      backgroundColor: canAfford ? '#7209B7' : '#282828',
                      color: canAfford ? '#000000' : '#B3B3B3',
                      border: 'none',
                      cursor: canAfford ? 'pointer' : 'not-allowed'
                    }}
                    onMouseEnter={(e) => {
                      if (canAfford) {
                        e.currentTarget.style.backgroundColor = '#8a1dd0';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (canAfford) {
<<<<<<< HEAD
                        e.currentTarget.style.backgroundColor = "#1DB954";
                      }
                    }}
                  >
                    {canAfford ? "Redeem" : "Not Enough Points"}
=======
                        e.currentTarget.style.backgroundColor = '#7209B7';
                      }
                    }}
                  >
                    {canAfford ? 'Redeem' : 'Not Enough Points'}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
