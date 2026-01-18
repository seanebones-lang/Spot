'use client';

import { useState } from 'react';
import { useCheckInStore } from '@/stores/checkInStore';
import { usePointsStore } from '@/stores/pointsStore';
import { useRouter } from 'next/navigation';

export default function CheckInPage() {
  const router = useRouter();
  const { checkIn, getStreak } = useCheckInStore();
  const { addPoints } = usePointsStore();
  
  const [tiredEnergetic, setTiredEnergetic] = useState(50);
  const [lonelyConnected, setLonelyConnected] = useState(50);
  const [stressedRelaxed, setStressedRelaxed] = useState(50);
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([]);
  const [journalEntry, setJournalEntry] = useState('');

  const feelings = ['Anxious', 'Overwhelmed', 'Stressed', 'Tired', 'Lonely', 'Great', 'Confident', 'Relaxed', 'Excited', 'Grateful'];

  const handleComplete = () => {
    const moodData = {
      tired: 100 - tiredEnergetic,
      energetic: tiredEnergetic,
      lonely: 100 - lonelyConnected,
      connected: lonelyConnected,
      stressed: 100 - stressedRelaxed,
      relaxed: stressedRelaxed,
    };

    checkIn(moodData, selectedFeelings, journalEntry || undefined);
    
    // Calculate points (10 base + 5 if journal entry)
    const points = 10 + (journalEntry ? 5 : 0);
    addPoints(points, 'daily-check-in');

    router.push('/');
  };

  return (
    <div 
      className="p-8 max-w-2xl mx-auto"
      style={{
        padding: '32px',
        maxWidth: '672px',
        margin: '0 auto',
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
        }}
      >
        Daily Mood Check-in
      </h1>
      <p 
        className="text-spotify-text-gray mb-8"
        style={{
          fontSize: '14px',
          lineHeight: '20px',
          color: '#B3B3B3',
          marginBottom: '32px'
        }}
      >
        Track how you&apos;re feeling today and earn points. Current streak: 🔥 {getStreak()} days
      </p>

      {/* Mood Sliders - Exact Spotify Style */}
      <div 
        className="space-y-6 mb-8"
        style={{
          gap: '24px',
          marginBottom: '32px'
        }}
      >
        <div>
          <label 
            className="block text-sm font-medium mb-2"
            style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: 600,
              color: '#FFFFFF',
              marginBottom: '8px'
            }}
          >
            Tired ↔ Energetic: {tiredEnergetic}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={tiredEnergetic}
            onChange={(e) => setTiredEnergetic(Number(e.target.value))}
            className="w-full h-2 bg-spotify-light-gray rounded-lg appearance-none cursor-pointer accent-spotify-green"
            style={{
              width: '100%',
              height: '8px',
              backgroundColor: '#282828',
              borderRadius: '4px',
              cursor: 'pointer',
              WebkitAppearance: 'none',
              appearance: 'none',
              background: `linear-gradient(to right, #1DB954 0%, #1DB954 ${tiredEnergetic}%, #282828 ${tiredEnergetic}%, #282828 100%)`
            }}
          />
        </div>

        <div>
          <label 
            className="block text-sm font-medium mb-2"
            style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: 600,
              color: '#FFFFFF',
              marginBottom: '8px'
            }}
          >
            Lonely ↔ Connected: {lonelyConnected}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={lonelyConnected}
            onChange={(e) => setLonelyConnected(Number(e.target.value))}
            className="w-full h-2 bg-spotify-light-gray rounded-lg appearance-none cursor-pointer accent-spotify-green"
            style={{
              width: '100%',
              height: '8px',
              backgroundColor: '#282828',
              borderRadius: '4px',
              cursor: 'pointer',
              WebkitAppearance: 'none',
              appearance: 'none',
              background: `linear-gradient(to right, #1DB954 0%, #1DB954 ${lonelyConnected}%, #282828 ${lonelyConnected}%, #282828 100%)`
            }}
          />
        </div>

        <div>
          <label 
            className="block text-sm font-medium mb-2"
            style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: 600,
              color: '#FFFFFF',
              marginBottom: '8px'
            }}
          >
            Stressed ↔ Relaxed: {stressedRelaxed}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={stressedRelaxed}
            onChange={(e) => setStressedRelaxed(Number(e.target.value))}
            className="w-full h-2 bg-spotify-light-gray rounded-lg appearance-none cursor-pointer accent-spotify-green"
            style={{
              width: '100%',
              height: '8px',
              backgroundColor: '#282828',
              borderRadius: '4px',
              cursor: 'pointer',
              WebkitAppearance: 'none',
              appearance: 'none',
              background: `linear-gradient(to right, #1DB954 0%, #1DB954 ${stressedRelaxed}%, #282828 ${stressedRelaxed}%, #282828 100%)`
            }}
          />
        </div>
      </div>

      {/* Feeling Chips - Exact Spotify Style */}
      <div 
        className="mb-8"
        style={{ marginBottom: '32px' }}
      >
        <h3 
          className="text-lg font-bold mb-4"
          style={{
            fontSize: '18px',
            lineHeight: '24px',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '16px'
          }}
        >
          How are you feeling?
        </h3>
        <div 
          className="flex flex-wrap gap-2"
          style={{ gap: '8px' }}
        >
          {feelings.map((feeling) => (
            <button
              key={feeling}
              onClick={() => {
                if (selectedFeelings.includes(feeling)) {
                  setSelectedFeelings(selectedFeelings.filter(f => f !== feeling));
                } else {
                  setSelectedFeelings([...selectedFeelings, feeling]);
                }
              }}
              className={`rounded-full font-medium transition-all ${
                selectedFeelings.includes(feeling)
                  ? 'bg-spotify-green text-black hover:bg-[#1ed760]'
                  : 'bg-spotify-light-gray text-white hover:bg-spotify-dark-gray'
              }`}
              style={{
                padding: '6px 16px',
                borderRadius: '500px',
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                transition: 'all 200ms ease-out',
                backgroundColor: selectedFeelings.includes(feeling) ? '#1DB954' : '#282828',
                color: selectedFeelings.includes(feeling) ? '#000000' : '#FFFFFF',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                if (selectedFeelings.includes(feeling)) {
                  e.currentTarget.style.backgroundColor = '#1ed760';
                } else {
                  e.currentTarget.style.backgroundColor = '#3e3e3e';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedFeelings.includes(feeling)) {
                  e.currentTarget.style.backgroundColor = '#1DB954';
                } else {
                  e.currentTarget.style.backgroundColor = '#282828';
                }
              }}
            >
              {feeling}
            </button>
          ))}
        </div>
      </div>

      {/* Journal Entry - Exact Spotify Style */}
      <div 
        className="mb-8"
        style={{ marginBottom: '32px' }}
      >
        <label 
          className="block text-lg font-bold mb-2"
          style={{
            fontSize: '18px',
            lineHeight: '24px',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '8px'
          }}
        >
          Quick Journal Entry (Optional)
        </label>
        <textarea
          value={journalEntry}
          onChange={(e) => setJournalEntry(e.target.value)}
          placeholder="How are you feeling today? What's on your mind?"
          className="w-full bg-spotify-light-gray rounded-lg p-4 text-white placeholder:text-spotify-text-gray focus:outline-none focus:ring-2 focus:ring-spotify-green min-h-32"
          style={{
            width: '100%',
            backgroundColor: '#282828',
            borderRadius: '8px',
            padding: '16px',
            color: '#FFFFFF',
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 400,
            minHeight: '128px',
            border: '1px solid transparent',
            fontFamily: 'inherit',
            resize: 'vertical'
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#1DB954';
            e.currentTarget.style.borderWidth = '2px';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'transparent';
            e.currentTarget.style.borderWidth = '1px';
          }}
        />
        <p 
          className="text-xs text-spotify-text-gray mt-2"
          style={{
            fontSize: '13px',
            lineHeight: '16px',
            color: '#B3B3B3',
            marginTop: '8px'
          }}
        >
          +5 bonus points for journaling
        </p>
      </div>

      {/* Points Preview - Exact Spotify Style */}
      <div 
        className="bg-gradient-to-r from-empulse-purple to-empulse-blue rounded-lg p-4 mb-8 text-white"
        style={{
          background: 'linear-gradient(135deg, #7209B7 0%, #457B9D 100%)',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '32px',
          color: '#FFFFFF'
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
            <div 
              className="text-sm opacity-80"
              style={{
                fontSize: '13px',
                lineHeight: '16px',
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '4px'
              }}
            >
              Points you&apos;ll earn:
            </div>
            <div 
              className="text-2xl font-bold"
              style={{
                fontSize: '24px',
                lineHeight: '28px',
                fontWeight: 700,
                color: '#FFFFFF'
              }}
            >
              {10 + (journalEntry ? 5 : 0)} points
            </div>
          </div>
          <div 
            className="text-right"
            style={{ textAlign: 'right' }}
          >
            <div 
              className="text-sm opacity-80"
              style={{
                fontSize: '13px',
                lineHeight: '16px',
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '4px'
              }}
            >
              Your streak:
            </div>
            <div 
              className="text-2xl font-bold"
              style={{
                fontSize: '24px',
                lineHeight: '28px',
                fontWeight: 700,
                color: '#FFFFFF'
              }}
            >
              🔥 {getStreak()} days
            </div>
          </div>
        </div>
      </div>

      {/* Complete Button - Exact Spotify Style */}
      <button
        onClick={handleComplete}
        className="w-full bg-spotify-green hover:bg-[#1ed760] text-black font-bold py-4 rounded-full text-lg transition-colors"
        style={{
          width: '100%',
          backgroundColor: '#1DB954',
          color: '#000000',
          fontWeight: 700,
          padding: '16px 32px',
          borderRadius: '500px',
          fontSize: '16px',
          lineHeight: '24px',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 200ms ease-out',
          transform: 'scale(1)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#1ed760';
          e.currentTarget.style.transform = 'scale(1.02)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#1DB954';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        Complete Check-in
      </button>
    </div>
  );
}
