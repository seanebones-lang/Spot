<<<<<<< HEAD
"use client";

import Link from "next/link";
import { Ticket, Calendar, MapPin } from "lucide-react";
import Image from "next/image";

const events = [
  {
    id: "1",
    title: "NextEleven Label Showcase",
    date: "2026-02-15",
    venue: "Red Rocks",
    location: "Morrison, CO",
    price: "$45 - $150",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop&q=80",
  },
=======
'use client';

import Link from 'next/link';
import { Ticket, Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';

const events = [
  { id: '1', title: 'NextEleven Label Showcase', date: '2026-02-15', venue: 'Red Rocks', location: 'Morrison, CO', price: '$45 - $150', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop&q=80' },
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
];

export default function TicketsPage() {
  return (
<<<<<<< HEAD
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
=======
    <div 
      className="min-h-screen bg-spotify-dark text-white p-8"
      style={{
        minHeight: '100vh',
        backgroundColor: '#121212',
        padding: '32px',
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
        Concert Tickets
      </h1>
<<<<<<< HEAD
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-spotify-light-gray hover:bg-spotify-dark-gray rounded-lg overflow-hidden transition-colors"
            style={{
              backgroundColor: "#181818",
              borderRadius: "8px",
              overflow: "hidden",
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
              className="relative w-full h-48 bg-spotify-dark-gray"
              style={{
                width: "100%",
                height: "192px",
                backgroundColor: "#282828",
                position: "relative",
              }}
            >
              {event.image && (
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  style={{ objectFit: "cover" }}
                />
              )}
            </div>
            <div className="p-4" style={{ padding: "16px" }}>
              <h3
                className="font-bold text-lg mb-2"
                style={{
                  fontSize: "18px",
                  lineHeight: "24px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  marginBottom: "8px",
=======
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}
      >
        {events.map((event) => (
          <div 
            key={event.id} 
            className="bg-spotify-light-gray hover:bg-spotify-dark-gray rounded-lg overflow-hidden transition-colors"
            style={{
              backgroundColor: '#181818',
              borderRadius: '8px',
              overflow: 'hidden',
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
              className="relative w-full h-48 bg-spotify-dark-gray"
              style={{
                width: '100%',
                height: '192px',
                backgroundColor: '#282828',
                position: 'relative'
              }}
            >
              {event.image && (
                <Image 
                  src={event.image} 
                  alt={event.title} 
                  fill 
                  className="object-cover"
                  style={{ objectFit: 'cover' }}
                />
              )}
            </div>
            <div 
              className="p-4"
              style={{ padding: '16px' }}
            >
              <h3 
                className="font-bold text-lg mb-2"
                style={{
                  fontSize: '18px',
                  lineHeight: '24px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '8px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                }}
              >
                {event.title}
              </h3>
<<<<<<< HEAD
              <div
                className="space-y-2 text-sm text-spotify-text-gray mb-4"
                style={{
                  gap: "8px",
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "#B3B3B3",
                  marginBottom: "16px",
                }}
              >
                <div
                  className="flex items-center gap-2"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Calendar
                    className="w-4 h-4"
                    style={{
                      width: "16px",
                      height: "16px",
                      flexShrink: 0,
=======
              <div 
                className="space-y-2 text-sm text-spotify-text-gray mb-4"
                style={{
                  gap: '8px',
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#B3B3B3',
                  marginBottom: '16px'
                }}
              >
                <div 
                  className="flex items-center gap-2"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Calendar 
                    className="w-4 h-4"
                    style={{
                      width: '16px',
                      height: '16px',
                      flexShrink: 0
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                    }}
                  />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
<<<<<<< HEAD
                <div
                  className="flex items-center gap-2"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <MapPin
                    className="w-4 h-4"
                    style={{
                      width: "16px",
                      height: "16px",
                      flexShrink: 0,
                    }}
                  />
                  <span>
                    {event.venue}, {event.location}
                  </span>
                </div>
                <div
                  className="text-spotify-green font-medium"
                  style={{
                    color: "#1DB954",
                    fontWeight: 600,
=======
                <div 
                  className="flex items-center gap-2"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <MapPin 
                    className="w-4 h-4"
                    style={{
                      width: '16px',
                      height: '16px',
                      flexShrink: 0
                    }}
                  />
                  <span>{event.venue}, {event.location}</span>
                </div>
                <div 
                  className="text-spotify-green font-medium"
                  style={{
                    color: '#7209B7',
                    fontWeight: 600
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  }}
                >
                  {event.price}
                </div>
              </div>
<<<<<<< HEAD
              <button
                className="w-full bg-spotify-green hover:bg-[#1ed760] text-black py-2 rounded-full font-medium transition-colors flex items-center justify-center gap-2"
                style={{
                  width: "100%",
                  backgroundColor: "#1DB954",
                  color: "#000000",
                  padding: "12px 24px",
                  borderRadius: "500px",
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  transition: "all 200ms ease-out",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#1ed760";
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#1DB954";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <Ticket
                  className="w-4 h-4"
                  style={{
                    width: "16px",
                    height: "16px",
                    flexShrink: 0,
=======
              <button 
                className="w-full bg-spotify-green hover:bg-[#8a1dd0] text-black py-2 rounded-full font-medium transition-colors flex items-center justify-center gap-2"
                style={{
                  width: '100%',
                  backgroundColor: '#7209B7',
                  color: '#000000',
                  padding: '12px 24px',
                  borderRadius: '500px',
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  transition: 'all 200ms ease-out',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#8a1dd0';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#7209B7';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <Ticket 
                  className="w-4 h-4"
                  style={{
                    width: '16px',
                    height: '16px',
                    flexShrink: 0
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  }}
                />
                Get Tickets
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
