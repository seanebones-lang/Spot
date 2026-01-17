'use client';

import Link from 'next/link';
import { Ticket, Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';

const events = [
  { id: '1', title: 'NextEleven Label Showcase', date: '2026-02-15', venue: 'Red Rocks', location: 'Morrison, CO', price: '$45 - $150', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop&q=80' },
];

export default function TicketsPage() {
  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Concert Tickets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-spotify-light-gray hover:bg-[#3e3e3e] rounded-lg overflow-hidden transition-colors">
            <div className="relative w-full h-48 bg-spotify-dark-gray">
              {event.image && <Image src={event.image} alt={event.title} fill className="object-cover" />}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{event.title}</h3>
              <div className="space-y-2 text-sm text-spotify-text-gray mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
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
    </div>
  );
}
