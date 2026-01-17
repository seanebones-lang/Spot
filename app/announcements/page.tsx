'use client';

import { Bell } from 'lucide-react';

const announcements = [
  { id: '1', title: 'New Feature: AI Assistant', date: '2026-01-15', content: 'Chat with our AI assistant powered by xAI Grok for instant help.' },
  { id: '2', title: 'Premium Benefits Updated', date: '2026-01-10', content: 'New exclusive content and features for Premium subscribers.' },
];

export default function AnnouncementsPage() {
  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Announcements</h1>
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="bg-spotify-light-gray rounded-lg p-6">
            <div className="flex items-start gap-4">
              <Bell className="w-6 h-6 text-spotify-green flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">{announcement.title}</h3>
                <p className="text-spotify-text-gray text-sm mb-2">{new Date(announcement.date).toLocaleDateString()}</p>
                <p className="text-white">{announcement.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
