"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";

export default function AudiobooksPage() {
  const router = useRouter();

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
          }}
        >
          Audiobooks Access
        </h1>
        <p
          className="text-xl text-spotify-text-gray mb-8"
          style={{
            fontSize: "20px",
            lineHeight: "28px",
            color: "#B3B3B3",
            marginBottom: "32px",
          }}
        >
          Access thousands of audiobooks with your EmPulse subscription.
        </p>
        <Link
          href="/dashboard/audiobook"
          className="bg-spotify-green hover:bg-[#1ed760] text-black font-bold py-4 px-8 rounded-full transition-colors inline-flex items-center gap-2"
          style={{
            backgroundColor: "#1DB954",
            color: "#000000",
            fontWeight: 700,
            padding: "16px 32px",
            borderRadius: "9999px",
            transition: "background-color 0.2s",
          }}
        >
          Go to Audiobook Dashboard
          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}
