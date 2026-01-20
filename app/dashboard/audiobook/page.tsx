"use client";

import { useState } from "react";
import {
  TrendingUp,
  DollarSign,
  BookOpen,
  Eye,
  EyeOff,
  BarChart3,
  AlertCircle,
} from "lucide-react";

// Mock audiobook data
const mockAudiobooks = [
  {
    id: "1",
    name: "The Great Adventure",
    author: "John Doe",
    narrator: "Jane Smith",
    uploadDate: "2024-01-10",
    status: "published",
    streams: 1250,
    earnings: 5.0,
    duration: "8h 45m",
  },
  {
    id: "2",
    name: "Mystery Solved",
    author: "John Doe",
    narrator: "Jane Smith",
    uploadDate: "2024-01-12",
    status: "published",
    streams: 890,
    earnings: 3.56,
    duration: "12h 30m",
  },
  {
    id: "3",
    name: "New Release (Draft)",
    author: "John Doe",
    narrator: "Jane Smith",
    uploadDate: "2024-01-14",
    status: "unpublished",
    streams: 0,
    earnings: 0,
    duration: "10h 15m",
  },
];

export default function AudiobookDashboardPage() {
  const [audiobooks, setAudiobooks] = useState(mockAudiobooks);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const togglePublish = (bookId: string) => {
    const updatedBooks = audiobooks.map((book) =>
      book.id === bookId
        ? {
            ...book,
            status: book.status === "published" ? "unpublished" : "published",
          }
        : book,
    );
    setAudiobooks(updatedBooks);
  };

  const totalStreams = audiobooks.reduce((sum, book) => sum + book.streams, 0);
  const totalEarnings = audiobooks.reduce(
    (sum, book) => sum + book.earnings,
    0,
  );
  const publishedBooks = audiobooks.filter((b) => b.status === "published");

  return (
    <div
      className="p-8"
      style={{
        padding: "32px",
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "#FFFFFF",
      }}
    >
      <div
        className="flex items-center justify-between mb-8"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "32px",
          gap: "16px",
        }}
      >
        <h1
          className="text-4xl font-bold"
          style={{
            fontSize: "32px",
            lineHeight: "36px",
            fontWeight: 700,
            color: "#FFFFFF",
          }}
        >
          Audiobook Creator Dashboard
        </h1>
      </div>

      {/* Legal Requirements Notice */}
      <div
        className="bg-blue-600/20 border border-blue-600/50 rounded-lg p-6 mb-8"
        style={{
          backgroundColor: "rgba(13, 115, 236, 0.2)",
          border: "1px solid rgba(13, 115, 236, 0.5)",
          borderRadius: "8px",
          padding: "24px",
          marginBottom: "32px",
        }}
      >
        <div className="flex items-start gap-3">
          <AlertCircle
            size={24}
            className="text-blue-400 flex-shrink-0"
            style={{ color: "#60A5FA" }}
          />
          <div>
            <h3
              className="text-lg font-bold mb-2"
              style={{
                fontSize: "18px",
                lineHeight: "24px",
                fontWeight: 700,
                color: "#FFFFFF",
                marginBottom: "8px",
              }}
            >
              Legal Requirements for Audiobook Creators
            </h3>
            <ul
              className="text-sm text-spotify-text-gray space-y-1 list-disc list-inside"
              style={{
                fontSize: "14px",
                lineHeight: "20px",
                color: "#B3B3B3",
                listStyle: "disc",
                paddingLeft: "20px",
              }}
            >
              <li>
                You must own or have licensed <strong>text rights</strong> to
                create the audio derivative work
              </li>
              <li>
                You must own or have licensed{" "}
                <strong>sound recording rights</strong> (if using a
                narrator/producer, secure proper agreements)
              </li>
              <li>
                Third-party content (music, sound effects, quotations) requires
                separate licenses or permissions
              </li>
              <li>
                Cover art, metadata, author name, and biographical info rights
                must be cleared
              </li>
              <li>
                Copyright registration recommended before or within 3 months of
                publication for legal protection
              </li>
              <li>
                Indemnification agreement: you must indemnify the platform
                against claims if rights are infringed
              </li>
              <li>
                Distribution rights license required (exclusive or
                non-exclusive, territory-specific or worldwide)
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        <div
          className="bg-gradient-to-br from-orange-500 to-red-500 rounded-lg p-6 text-white"
          style={{
            background: "linear-gradient(135deg, #F97316 0%, #EF4444 100%)",
            borderRadius: "8px",
            padding: "24px",
            color: "#FFFFFF",
          }}
        >
          <div
            className="text-sm opacity-80 mb-1"
            style={{
              fontSize: "13px",
              lineHeight: "16px",
              color: "rgba(255, 255, 255, 0.8)",
              marginBottom: "4px",
            }}
          >
            Total Audiobooks
          </div>
          <div
            className="text-3xl font-bold"
            style={{
              fontSize: "32px",
              lineHeight: "36px",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {audiobooks.length}
          </div>
          <div
            className="text-xs opacity-60 mt-1"
            style={{
              fontSize: "12px",
              opacity: 0.6,
              marginTop: "4px",
            }}
          >
            {publishedBooks.length} published
          </div>
        </div>

        <div
          className="bg-gradient-to-br from-spotify-green to-spotify-green rounded-lg p-6 text-white"
          style={{
            background: "linear-gradient(135deg, #1DB954 0%, #1ed760 100%)",
            borderRadius: "8px",
            padding: "24px",
            color: "#FFFFFF",
          }}
        >
          <div
            className="text-sm opacity-80 mb-1"
            style={{
              fontSize: "13px",
              lineHeight: "16px",
              color: "rgba(255, 255, 255, 0.8)",
              marginBottom: "4px",
            }}
          >
            Total Listens
          </div>
          <div
            className="text-3xl font-bold flex items-center gap-2"
            style={{
              fontSize: "32px",
              lineHeight: "36px",
              fontWeight: 700,
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <TrendingUp size={24} style={{ width: "24px", height: "24px" }} />
            {totalStreams.toLocaleString()}
          </div>
        </div>

        <div
          className="bg-gradient-to-br from-green-500 to-teal-500 rounded-lg p-6 text-white"
          style={{
            background: "linear-gradient(135deg, #22C55E 0%, #14B8A6 100%)",
            borderRadius: "8px",
            padding: "24px",
            color: "#FFFFFF",
          }}
        >
          <div
            className="text-sm opacity-80 mb-1"
            style={{
              fontSize: "13px",
              lineHeight: "16px",
              color: "rgba(255, 255, 255, 0.8)",
              marginBottom: "4px",
            }}
          >
            Total Earnings
          </div>
          <div
            className="text-3xl font-bold flex items-center gap-2"
            style={{
              fontSize: "32px",
              lineHeight: "36px",
              fontWeight: 700,
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <DollarSign size={24} style={{ width: "24px", height: "24px" }} />$
            {totalEarnings.toFixed(2)}
          </div>
        </div>

        <div
          className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-6 text-white"
          style={{
            background: "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)",
            borderRadius: "8px",
            padding: "24px",
            color: "#FFFFFF",
          }}
        >
          <div
            className="text-sm opacity-80 mb-1"
            style={{
              fontSize: "13px",
              lineHeight: "16px",
              color: "rgba(255, 255, 255, 0.8)",
              marginBottom: "4px",
            }}
          >
            Avg. Listens/Book
          </div>
          <div
            className="text-3xl font-bold"
            style={{
              fontSize: "32px",
              lineHeight: "36px",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {publishedBooks.length > 0
              ? Math.round(
                  totalStreams / publishedBooks.length,
                ).toLocaleString()
              : "0"}
          </div>
        </div>
      </div>

      {/* Upload Section - Feature Coming Soon */}
      <div
        className="bg-spotify-light-gray rounded-lg p-6 mb-8"
        style={{
          backgroundColor: "#181818",
          borderRadius: "8px",
          padding: "24px",
          marginBottom: "32px",
        }}
      >
        <h2
          className="text-2xl font-bold mb-4"
          style={{
            fontSize: "24px",
            lineHeight: "28px",
            fontWeight: 700,
            color: "#FFFFFF",
            marginBottom: "16px",
          }}
        >
          Upload New Audiobook
        </h2>
        <div
          className="bg-yellow-600/20 border border-yellow-600/50 rounded-lg p-6 text-center"
          style={{
            backgroundColor: "rgba(234, 179, 8, 0.2)",
            border: "1px solid rgba(234, 179, 8, 0.5)",
            borderRadius: "8px",
            padding: "24px",
            textAlign: "center",
          }}
        >
          <BookOpen
            size={48}
            className="mx-auto mb-4 text-yellow-400"
            style={{
              width: "48px",
              height: "48px",
              color: "#FACC15",
              margin: "0 auto 16px",
            }}
          />
          <h3
            className="text-xl font-bold mb-2 text-white"
            style={{
              fontSize: "20px",
              lineHeight: "24px",
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: "8px",
            }}
          >
            Feature Coming Soon
          </h3>
          <p
            className="text-spotify-text-gray"
            style={{
              fontSize: "14px",
              lineHeight: "20px",
              color: "#B3B3B3",
            }}
          >
            Audiobook upload functionality is currently under development.
            We&apos;re working to ensure full legal compliance, rights
            verification, and quality standards before launch.
          </p>
        </div>
      </div>

      {/* Audiobook Management */}
      <div className="bg-spotify-light-gray rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Audiobook Management</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 text-left text-sm text-spotify-text-gray">
                <th className="pb-3">Title</th>
                <th className="pb-3">Author</th>
                <th className="pb-3">Narrator</th>
                <th className="pb-3">Duration</th>
                <th className="pb-3">Upload Date</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Listens</th>
                <th className="pb-3 text-right">Earnings</th>
                <th className="pb-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {audiobooks.map((book) => (
                <tr
                  key={book.id}
                  className="border-b border-white/10 hover:bg-white/5 transition-colors"
                >
                  <td className="py-3">
                    <div className="font-medium">{book.name}</div>
                  </td>
                  <td className="py-3 text-spotify-text-gray">{book.author}</td>
                  <td className="py-3 text-spotify-text-gray">
                    {book.narrator}
                  </td>
                  <td className="py-3 text-spotify-text-gray">
                    {book.duration}
                  </td>
                  <td className="py-3 text-spotify-text-gray">
                    {new Date(book.uploadDate).toLocaleDateString()}
                  </td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        book.status === "published"
                          ? "bg-green-600/20 text-green-400"
                          : "bg-yellow-600/20 text-yellow-400"
                      }`}
                    >
                      {book.status === "published"
                        ? "Published"
                        : "Unpublished"}
                    </span>
                  </td>
                  <td className="py-3 text-right font-medium">
                    {book.streams.toLocaleString()}
                  </td>
                  <td className="py-3 text-right font-medium">
                    ${book.earnings.toFixed(2)}
                  </td>
                  <td className="py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => togglePublish(book.id)}
                        className={`p-2 rounded hover:bg-white/10 transition-colors ${
                          book.status === "published"
                            ? "text-yellow-400"
                            : "text-green-400"
                        }`}
                        title={
                          book.status === "published" ? "Unpublish" : "Publish"
                        }
                      >
                        {book.status === "published" ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                      <button
                        className="p-2 rounded hover:bg-white/10 transition-colors text-spotify-text-gray hover:text-white"
                        title="View Analytics"
                        aria-label="View audiobook analytics"
                      >
                        <BarChart3 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Earnings Dashboard */}
      <div className="bg-spotify-light-gray rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Earnings Dashboard</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-spotify-dark-gray rounded-lg">
            <div>
              <div className="text-sm text-spotify-text-gray">
                Revenue Model
              </div>
              <div className="text-2xl font-bold">Royalty % of Sales</div>
              <div className="text-xs text-spotify-text-gray mt-1">
                Exclusive: 40% of retail price (Pay-for-Production) or 20%
                (Royalty Share)
              </div>
              <div className="text-xs text-spotify-text-gray mt-1">
                Non-Exclusive: 25% of retail price | Platform retains 60-75%
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-spotify-dark-gray rounded-lg">
              <div className="text-sm text-spotify-text-gray mb-1">
                Pending Payment
              </div>
              <div className="text-xl font-bold">$0.00</div>
            </div>
            <div className="p-4 bg-spotify-dark-gray rounded-lg">
              <div className="text-sm text-spotify-text-gray mb-1">
                This Month
              </div>
              <div className="text-xl font-bold">
                ${totalEarnings.toFixed(2)}
              </div>
            </div>
            <div className="p-4 bg-spotify-dark-gray rounded-lg">
              <div className="text-sm text-spotify-text-gray mb-1">
                Lifetime
              </div>
              <div className="text-xl font-bold">
                ${totalEarnings.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
