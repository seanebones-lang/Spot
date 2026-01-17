'use client';

import { Calendar, MapPin, Ticket } from 'lucide-react';

const tourDates = [
  { id: '1', date: '2026-03-01', venue: 'The Fillmore', city: 'Denver, CO', tickets: true },
  { id: '2', date: '2026-03-15', venue: 'House of Blues', city: 'Chicago, IL', tickets: true },
];

export default function ToursPage() {
  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Tour Dates</h1>
      <div className="space-y-4">
        {tourDates.map((date) => (
          <div key={date.id} className="bg-spotify-light-gray rounded-lg p-6 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <div className="text-2xl font-bold">{new Date(date.date).getDate()}</div>
                <div className="text-sm text-spotify-text-gray">{new Date(date.date).toLocaleDateString('en-US', { month: 'short' })}</div>
              </div>
              <div>
                <h3 className="font-bold text-lg">{date.venue}</h3>
                <p className="text-sm text-spotify-text-gray">{date.city}</p>
              </div>
            </div>
            {date.tickets && (
              <button className="bg-spotify-green hover:bg-spotify-green/80 text-black px-6 py-2 rounded-full font-medium transition-colors">
                Get Tickets
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
