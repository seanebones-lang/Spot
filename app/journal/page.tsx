'use client';

import { useState } from 'react';
import { useJournalStore } from '@/stores/journalStore';
import { useRouter } from 'next/navigation';
import { BookOpen, Heart, Music } from 'lucide-react';

export default function JournalPage() {
  const router = useRouter();
  const { entries, addEntry, deleteEntry, getStreak } = useJournalStore();
  const [isCreating, setIsCreating] = useState(false);
  const [newEntry, setNewEntry] = useState({
    text: '',
    moodTags: {} as any,
    feelings: [] as string[],
    associatedMusic: [] as string[],
    shared: false,
  });

  const handleCreateEntry = () => {
    if (newEntry.text.trim()) {
      addEntry(newEntry);
      setNewEntry({
        text: '',
        moodTags: {},
        feelings: [],
        associatedMusic: [],
        shared: false,
      });
      setIsCreating(false);
    }
  };

  const feelings = ['Anxious', 'Overwhelmed', 'Stressed', 'Great', 'Confident', 'Relaxed', 'Excited'];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-empulse-purple to-empulse-blue bg-clip-text text-transparent">
            Your Journal
          </h1>
          <p className="text-spotify-text-gray">
            {getStreak()} day streak • {entries.length} entries
          </p>
        </div>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="btn-primary"
          >
            New Entry
          </button>
        )}
      </div>

      {/* Create New Entry */}
      {isCreating && (
        <div className="bg-spotify-light-gray rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">New Journal Entry</h2>
          <textarea
            value={newEntry.text}
            onChange={(e) => setNewEntry({ ...newEntry, text: e.target.value })}
            placeholder="Share your thoughts..."
            className="w-full bg-spotify-dark-gray rounded-lg p-4 text-white placeholder:text-spotify-text-gray focus:outline-none focus:ring-2 focus:ring-spotify-green min-h-32 mb-4"
          />
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Feelings (optional)</label>
            <div className="flex flex-wrap gap-2">
              {feelings.map((feeling) => (
                <button
                  key={feeling}
                  onClick={() => {
                    if (newEntry.feelings.includes(feeling)) {
                      setNewEntry({ ...newEntry, feelings: newEntry.feelings.filter(f => f !== feeling) });
                    } else {
                      setNewEntry({ ...newEntry, feelings: [...newEntry.feelings, feeling] });
                    }
                  }}
                  className={`px-3 py-1 rounded-full text-sm ${
                    newEntry.feelings.includes(feeling)
                      ? 'bg-spotify-green text-black'
                      : 'bg-spotify-dark-gray text-white'
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
                onChange={(e) => setNewEntry({ ...newEntry, shared: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm">Share with community</span>
            </label>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleCreateEntry}
              className="btn-primary"
            >
              Save Entry
            </button>
            <button
              onClick={() => {
                setIsCreating(false);
                setNewEntry({ text: '', moodTags: {}, feelings: [], associatedMusic: [], shared: false });
              }}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Journal Entries Timeline */}
      <div className="space-y-4">
        {entries.map((entry) => (
          <div key={entry.id} className="bg-spotify-light-gray rounded-lg p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <BookOpen size={20} className="text-empulse-purple" />
                <div>
                  <div className="font-semibold">
                    {new Date(entry.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                  <div className="text-xs text-spotify-text-gray">
                    {new Date(entry.date).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
              {entry.shared && (
                <span className="px-2 py-1 bg-empulse-blue/20 text-empulse-blue rounded text-xs">
                  Shared
                </span>
              )}
            </div>
            <p className="text-spotify-text-gray mb-4 whitespace-pre-wrap">{entry.text}</p>
            {entry.feelings && entry.feelings.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {entry.feelings.map((feeling) => (
                  <span key={feeling} className="px-2 py-1 bg-empulse-purple/20 text-empulse-purple rounded text-xs">
                    {feeling}
                  </span>
                ))}
              </div>
            )}
            <button
              onClick={() => deleteEntry(entry.id)}
              className="text-red-400 hover:text-red-300 text-sm"
            >
              Delete
            </button>
          </div>
        ))}
        
        {entries.length === 0 && (
          <div className="text-center py-16">
            <BookOpen size={64} className="mx-auto mb-4 text-spotify-text-gray opacity-50" />
            <p className="text-spotify-text-gray text-lg mb-2">No journal entries yet</p>
            <p className="text-spotify-text-gray text-sm mb-4">Start journaling to track your journey and earn points</p>
            <button onClick={() => setIsCreating(true)} className="btn-primary">
              Create First Entry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
