<<<<<<< HEAD
"use client";

import Link from "next/link";
import Image from "next/image";
import { mockData } from "@/lib/data";
=======
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { mockData } from '@/lib/data';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

export default function UndergroundPage() {
  const artists = mockData.getArtists();
  const albums = mockData.getAlbums();

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
        Underground
      </h1>
<<<<<<< HEAD
      <section className="mb-12" style={{ marginBottom: "48px" }}>
        <h2
          className="text-2xl font-bold mb-6"
          style={{
            fontSize: "24px",
            lineHeight: "28px",
            fontWeight: 700,
            color: "#FFFFFF",
            marginBottom: "24px",
=======
      <section 
        className="mb-12"
        style={{ marginBottom: '48px' }}
      >
        <h2 
          className="text-2xl font-bold mb-6"
          style={{
            fontSize: '24px',
            lineHeight: '28px',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '24px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }}
        >
          Emerging Artists
        </h2>
<<<<<<< HEAD
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
          style={{ gap: "24px" }}
        >
          {artists.slice(0, 12).map((artist) => (
            <Link
              key={artist.id}
              href={`/artist/${artist.id}`}
              className="text-center group"
              style={{
                textAlign: "center",
                textDecoration: "none",
              }}
            >
              <div
                className="w-full aspect-square rounded-full overflow-hidden mb-3 bg-spotify-light-gray mx-auto max-w-[200px]"
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  borderRadius: "50%",
                  overflow: "hidden",
                  marginBottom: "12px",
                  backgroundColor: "#282828",
                  maxWidth: "200px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  transition: "transform 200ms ease-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                {artist.image && (
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    style={{
                      borderRadius: "50%",
                      transition: "transform 200ms ease-out",
=======
        <div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
          style={{ gap: '24px' }}
        >
          {artists.slice(0, 12).map((artist) => (
            <Link 
              key={artist.id} 
              href={`/artist/${artist.id}`} 
              className="text-center group"
              style={{
                textAlign: 'center',
                textDecoration: 'none'
              }}
            >
              <div 
                className="w-full aspect-square rounded-full overflow-hidden mb-3 bg-spotify-light-gray mx-auto max-w-[200px]"
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  marginBottom: '12px',
                  backgroundColor: '#282828',
                  maxWidth: '200px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  transition: 'transform 200ms ease-out'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {artist.image && (
                  <Image 
                    src={artist.image} 
                    alt={artist.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    style={{
                      borderRadius: '50%',
                      transition: 'transform 200ms ease-out'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                    }}
                  />
                )}
              </div>
<<<<<<< HEAD
              <h3
                className="font-semibold text-white group-hover:underline truncate"
                style={{
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  marginBottom: "4px",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.textDecoration = "underline")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.textDecoration = "none")
                }
              >
                {artist.name}
              </h3>
              <p
                className="text-sm text-spotify-text-gray"
                style={{
                  fontSize: "13px",
                  lineHeight: "16px",
                  color: "#B3B3B3",
=======
              <h3 
                className="font-semibold text-white group-hover:underline truncate"
                style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  marginBottom: '4px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
              >
                {artist.name}
              </h3>
              <p 
                className="text-sm text-spotify-text-gray"
                style={{
                  fontSize: '13px',
                  lineHeight: '16px',
                  color: '#B3B3B3'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                }}
              >
                Artist
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
