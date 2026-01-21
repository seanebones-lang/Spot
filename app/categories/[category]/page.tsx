<<<<<<< HEAD
"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { mockData } from "@/lib/data";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
=======
'use client';

import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { mockData } from '@/lib/data';

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  const { category } = use(params);
  const tracks = mockData.getTracks();
  const playlists = mockData.getPlaylists();

  const categoryTitles: Record<string, string> = {
<<<<<<< HEAD
    mhz: "MHz Sounds",
    withdrawal: "Withdrawal Sounds",
    anxiety: "Anxiety Relief",
    depression: "Depression Support",
    ptsd: "PTSD Healing",
    recovery: "Addiction Recovery",
    grief: "Grief Support",
    trauma: "Trauma Healing",
  };

  const title =
    categoryTitles[category] ||
    category.charAt(0).toUpperCase() + category.slice(1);

  return (
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
    mhz: 'MHz Sounds',
    withdrawal: 'Withdrawal Sounds',
    anxiety: 'Anxiety Relief',
    depression: 'Depression Support',
    ptsd: 'PTSD Healing',
    recovery: 'Addiction Recovery',
    grief: 'Grief Support',
    trauma: 'Trauma Healing',
  };

  const title = categoryTitles[category] || category.charAt(0).toUpperCase() + category.slice(1);

  return (
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
        {title}
      </h1>
<<<<<<< HEAD
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
        style={{ gap: "24px" }}
      >
        {playlists.slice(0, 12).map((playlist) => (
          <Link
            key={playlist.id}
            href={`/playlist/${playlist.id}`}
            className="group bg-spotify-light-gray hover:bg-spotify-dark-gray rounded-lg p-4 transition-all duration-200"
            style={{
              backgroundColor: "#181818",
              borderRadius: "8px",
              padding: "16px",
              transition: "background-color 200ms ease-out",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#282828";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#181818";
            }}
          >
            <div
              className="relative w-full aspect-square mb-4 rounded overflow-hidden bg-spotify-dark-gray"
              style={{
                borderRadius: "4px",
                aspectRatio: "1",
                marginBottom: "16px",
                backgroundColor: "#282828",
              }}
            >
              {playlist.coverArt && (
                <Image
                  src={playlist.coverArt}
                  alt={playlist.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  style={{
                    borderRadius: "4px",
                    transition: "transform 200ms ease-out",
=======
      <div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
        style={{ gap: '24px' }}
      >
        {playlists.slice(0, 12).map((playlist) => (
          <Link 
            key={playlist.id} 
            href={`/playlist/${playlist.id}`} 
            className="group bg-spotify-light-gray hover:bg-spotify-dark-gray rounded-lg p-4 transition-all duration-200"
            style={{
              backgroundColor: '#181818',
              borderRadius: '8px',
              padding: '16px',
              transition: 'background-color 200ms ease-out',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#282828';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#181818';
            }}
          >
            <div 
              className="relative w-full aspect-square mb-4 rounded overflow-hidden bg-spotify-dark-gray"
              style={{
                borderRadius: '4px',
                aspectRatio: '1',
                marginBottom: '16px',
                backgroundColor: '#282828'
              }}
            >
              {playlist.coverArt && (
                <Image 
                  src={playlist.coverArt} 
                  alt={playlist.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  style={{
                    borderRadius: '4px',
                    transition: 'transform 200ms ease-out'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  }}
                />
              )}
            </div>
<<<<<<< HEAD
            <h3
              className="font-semibold text-sm text-white mb-1 truncate group-hover:underline"
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
              {playlist.name}
            </h3>
            <p
              className="text-xs text-spotify-text-gray truncate"
              style={{
                fontSize: "13px",
                lineHeight: "16px",
                color: "#B3B3B3",
=======
            <h3 
              className="font-semibold text-sm text-white mb-1 truncate group-hover:underline"
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
              {playlist.name}
            </h3>
            <p 
              className="text-xs text-spotify-text-gray truncate"
              style={{
                fontSize: '13px',
                lineHeight: '16px',
                color: '#B3B3B3'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              }}
            >
              {playlist.owner}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
