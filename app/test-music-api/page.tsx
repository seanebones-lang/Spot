"use client";

import { useState } from "react";
import { Music, CheckCircle, XCircle, Loader2 } from "lucide-react";

/**
 * Test page for Music API integration
 * Use this to verify Jamendo API is working correctly
 */
export default function TestMusicAPIPage() {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<{
    mood?: { success: boolean; message: string; data?: any };
    genre?: { success: boolean; message: string; data?: any };
  }>({});

  const testMoodAPI = async () => {
    setTesting(true);
    try {
      const res = await fetch("/api/tracks/mood/happy?limit=5");
      const data = await res.json();

      if (res.ok && data.tracks) {
        setResults((prev) => ({
          ...prev,
          mood: {
            success: true,
            message: `✅ Success! Found ${data.count} tracks`,
            data,
          },
        }));
      } else {
        setResults((prev) => ({
          ...prev,
          mood: {
            success: false,
            message: `❌ Error: ${data.error || "Unknown error"}`,
          },
        }));
      }
    } catch (error) {
      setResults((prev) => ({
        ...prev,
        mood: {
          success: false,
          message: `❌ Network error: ${(error as Error).message}`,
        },
      }));
    } finally {
      setTesting(false);
    }
  };

  const testGenreAPI = async () => {
    setTesting(true);
    try {
      const res = await fetch("/api/tracks/genre/rock?limit=5");
      const data = await res.json();

      if (res.ok && data.tracks) {
        setResults((prev) => ({
          ...prev,
          genre: {
            success: true,
            message: `✅ Success! Found ${data.count} tracks`,
            data,
          },
        }));
      } else {
        setResults((prev) => ({
          ...prev,
          genre: {
            success: false,
            message: `❌ Error: ${data.error || "Unknown error"}`,
          },
        }));
      }
    } catch (error) {
      setResults((prev) => ({
        ...prev,
        genre: {
          success: false,
          message: `❌ Network error: ${(error as Error).message}`,
        },
      }));
    } finally {
      setTesting(false);
    }
  };

  return (
    <div
      className="p-8 max-w-4xl mx-auto"
      style={{
        padding: "32px",
        maxWidth: "896px",
        margin: "0 auto",
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "#FFFFFF",
      }}
    >
      <div className="mb-8">
        <h1
          className="text-4xl font-bold mb-2"
          style={{
            fontSize: "32px",
            lineHeight: "36px",
            fontWeight: 700,
            color: "#FFFFFF",
            marginBottom: "8px",
          }}
        >
          Music API Test
        </h1>
        <p
          className="text-spotify-text-gray"
          style={{
            fontSize: "14px",
            lineHeight: "20px",
            color: "#B3B3B3",
          }}
        >
          Test Jamendo API integration and verify your API key is configured
          correctly
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <div
          className="bg-spotify-light-gray rounded-lg p-6"
          style={{
            backgroundColor: "#181818",
            borderRadius: "8px",
            padding: "24px",
          }}
        >
          <h2
            className="text-xl font-bold mb-4"
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: "16px",
            }}
          >
            Setup Instructions
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-spotify-text-gray">
            <li>
              Get your Jamendo API key from https://devportal.jamendo.com/
            </li>
            <li>
              Add it to your .env file:{" "}
              <code className="text-spotify-green">
                JAMENDO_API_KEY=your_key_here
              </code>
            </li>
            <li>
              Restart your dev server:{" "}
              <code className="text-spotify-green">npm run dev</code>
            </li>
            <li>Click the test buttons below to verify</li>
          </ol>
        </div>
      </div>

      <div className="space-y-4">
        <div
          className="bg-spotify-light-gray rounded-lg p-6"
          style={{
            backgroundColor: "#181818",
            borderRadius: "8px",
            padding: "24px",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-xl font-bold"
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#FFFFFF",
              }}
            >
              Test Mood API
            </h2>
            <button
              onClick={testMoodAPI}
              disabled={testing}
              className="px-4 py-2 bg-spotify-green text-black font-semibold rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "#7209B7",
                color: "#000000",
                fontWeight: 700,
                padding: "8px 16px",
                borderRadius: "500px",
                border: "none",
                cursor: testing ? "not-allowed" : "pointer",
              }}
            >
              {testing ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  Testing...
                </span>
              ) : (
                "Test /api/tracks/mood/happy"
              )}
            </button>
          </div>

          {results.mood && (
            <div
              className={`p-4 rounded-lg flex items-start gap-3 ${
                results.mood.success
                  ? "bg-green-900/20 border border-green-500/30"
                  : "bg-red-900/20 border border-red-500/30"
              }`}
            >
              {results.mood.success ? (
                <CheckCircle
                  size={20}
                  className="text-green-500 flex-shrink-0 mt-0.5"
                />
              ) : (
                <XCircle
                  size={20}
                  className="text-red-500 flex-shrink-0 mt-0.5"
                />
              )}
              <div className="flex-1">
                <p className="text-sm font-medium text-white mb-1">
                  {results.mood.message}
                </p>
                {results.mood.data && (
                  <div className="mt-2 text-xs text-spotify-text-gray">
                    <p>Source: {results.mood.data.source}</p>
                    <p>License: {results.mood.data.license}</p>
                    {results.mood.data.tracks &&
                      results.mood.data.tracks.length > 0 && (
                        <div className="mt-2">
                          <p className="font-semibold mb-1">Sample tracks:</p>
                          <ul className="list-disc list-inside space-y-1">
                            {results.mood.data.tracks
                              .slice(0, 3)
                              .map((track: any) => (
                                <li key={track.id}>
                                  {track.name} by {track.artist}
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div
          className="bg-spotify-light-gray rounded-lg p-6"
          style={{
            backgroundColor: "#181818",
            borderRadius: "8px",
            padding: "24px",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-xl font-bold"
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#FFFFFF",
              }}
            >
              Test Genre API
            </h2>
            <button
              onClick={testGenreAPI}
              disabled={testing}
              className="px-4 py-2 bg-spotify-green text-black font-semibold rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "#7209B7",
                color: "#000000",
                fontWeight: 700,
                padding: "8px 16px",
                borderRadius: "500px",
                border: "none",
                cursor: testing ? "not-allowed" : "pointer",
              }}
            >
              {testing ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  Testing...
                </span>
              ) : (
                "Test /api/tracks/genre/rock"
              )}
            </button>
          </div>

          {results.genre && (
            <div
              className={`p-4 rounded-lg flex items-start gap-3 ${
                results.genre.success
                  ? "bg-green-900/20 border border-green-500/30"
                  : "bg-red-900/20 border border-red-500/30"
              }`}
            >
              {results.genre.success ? (
                <CheckCircle
                  size={20}
                  className="text-green-500 flex-shrink-0 mt-0.5"
                />
              ) : (
                <XCircle
                  size={20}
                  className="text-red-500 flex-shrink-0 mt-0.5"
                />
              )}
              <div className="flex-1">
                <p className="text-sm font-medium text-white mb-1">
                  {results.genre.message}
                </p>
                {results.genre.data && (
                  <div className="mt-2 text-xs text-spotify-text-gray">
                    <p>Source: {results.genre.data.source}</p>
                    <p>License: {results.genre.data.license}</p>
                    {results.genre.data.tracks &&
                      results.genre.data.tracks.length > 0 && (
                        <div className="mt-2">
                          <p className="font-semibold mb-1">Sample tracks:</p>
                          <ul className="list-disc list-inside space-y-1">
                            {results.genre.data.tracks
                              .slice(0, 3)
                              .map((track: any) => (
                                <li key={track.id}>
                                  {track.name} by {track.artist}
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
