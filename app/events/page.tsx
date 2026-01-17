'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock events data
const events = [
  {
    id: '1',
    title: 'NextEleven Label Showcase',
    date: '2026-02-15',
    time: '8:00 PM',
    venue: 'Red Rocks Amphitheatre',
    location: 'Morrison, CO',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop&q=80',
    price: '$45 - $150',
    artist: 'NextEleven Label Showcase'
  },
  {
    id: '2',
    title: 'Metal Fest 2026',
    date: '2026-03-20',
    time: '7:00 PM',
    venue: 'The Fillmore',
    location: 'Denver, CO',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop&q=80',
    price: '$35 - $75',
    artist: 'Various Artists'
  },
];

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Live Events</h1>

      {events.length === 0 ? (
        <div className="text-center py-24">
          <Calendar className="w-16 h-16 text-spotify-text-gray mx-auto mb-4" />
          <p className="text-spotify-text-gray text-xl font-medium mb-2">No upcoming events</p>
          <p className="text-spotify-text-gray text-sm">Check back soon for live shows and concerts</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-spotify-light-gray hover:bg-[#3e3e3e] rounded-lg overflow-hidden transition-colors group"
            >
              <div className="relative w-full h-48 bg-spotify-dark-gray">
                {event.image && (
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 group-hover:underline">{event.title}</h3>
                <div className="space-y-2 text-sm text-spotify-text-gray mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.venue}, {event.location}</span>
                  </div>
                  <div className="text-spotify-green font-medium">{event.price}</div>
                </div>
                <button className="w-full bg-spotify-green hover:bg-spotify-green/80 text-black py-2 rounded-full font-medium transition-colors flex items-center justify-center gap-2">
                  <Ticket className="w-4 h-4" />
                  Get Tickets
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}