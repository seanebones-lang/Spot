<<<<<<< HEAD
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
=======
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

export default function AudiobooksPage() {
  const router = useRouter();

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
      <div
        className="max-w-4xl mx-auto text-center"
        style={{
          maxWidth: "896px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <BookOpen
          size={64}
          className="mx-auto mb-6 text-spotify-green"
          style={{ color: "#1DB954", marginBottom: "24px" }}
        />
        <h1
          className="text-5xl font-bold mb-4"
          style={{
            fontSize: "48px",
            lineHeight: "56px",
            fontWeight: 900,
            color: "#FFFFFF",
            marginBottom: "16px",
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
      <div 
        className="max-w-4xl mx-auto text-center"
        style={{
          maxWidth: '896px',
          margin: '0 auto',
          textAlign: 'center'
        }}
      >
        <BookOpen 
          size={64} 
          className="mx-auto mb-6 text-spotify-green"
          style={{ color: '#7209B7', marginBottom: '24px' }}
        />
        <h1 
          className="text-5xl font-bold mb-4"
          style={{
            fontSize: '48px',
            lineHeight: '56px',
            fontWeight: 900,
            color: '#FFFFFF',
            marginBottom: '16px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }}
        >
          Audiobooks Access
        </h1>
<<<<<<< HEAD
        <p
          className="text-xl text-spotify-text-gray mb-8"
          style={{
            fontSize: "20px",
            lineHeight: "28px",
            color: "#B3B3B3",
            marginBottom: "32px",
=======
        <p 
          className="text-xl text-spotify-text-gray mb-8"
          style={{
            fontSize: '20px',
            lineHeight: '28px',
            color: '#B3B3B3',
            marginBottom: '32px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }}
        >
          Access thousands of audiobooks with your EmPulse subscription.
        </p>
        <Link
          href="/dashboard/audiobook"
<<<<<<< HEAD
          className="bg-spotify-green hover:bg-[#1ed760] text-black font-bold py-4 px-8 rounded-full transition-colors inline-flex items-center gap-2"
          style={{
            backgroundColor: "#1DB954",
            color: "#000000",
            fontWeight: 700,
            padding: "16px 32px",
            borderRadius: "9999px",
            transition: "background-color 0.2s",
=======
          className="bg-spotify-green hover:bg-[#8a1dd0] text-black font-bold py-4 px-8 rounded-full transition-colors inline-flex items-center gap-2"
          style={{
            backgroundColor: '#7209B7',
            color: '#000000',
            fontWeight: 700,
            padding: '16px 32px',
            borderRadius: '9999px',
            transition: 'background-color 0.2s'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }}
        >
          Go to Audiobook Dashboard
          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}
