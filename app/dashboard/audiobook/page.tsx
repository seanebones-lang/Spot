<<<<<<< HEAD
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
=======
'use client';

import { useState } from 'react';
import { TrendingUp, DollarSign, BookOpen, Eye, EyeOff, BarChart3, AlertCircle } from 'lucide-react';

// Mock audiobook data
const mockAudiobooks = [
  { id: '1', name: 'The Great Adventure', author: 'John Doe', narrator: 'Jane Smith', uploadDate: '2024-01-10', status: 'published', streams: 1250, earnings: 5.00, duration: '8h 45m' },
  { id: '2', name: 'Mystery Solved', author: 'John Doe', narrator: 'Jane Smith', uploadDate: '2024-01-12', status: 'published', streams: 890, earnings: 3.56, duration: '12h 30m' },
  { id: '3', name: 'New Release (Draft)', author: 'John Doe', narrator: 'Jane Smith', uploadDate: '2024-01-14', status: 'unpublished', streams: 0, earnings: 0, duration: '10h 15m' },
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
];

export default function AudiobookDashboardPage() {
  const [audiobooks, setAudiobooks] = useState(mockAudiobooks);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const togglePublish = (bookId: string) => {
<<<<<<< HEAD
    const updatedBooks = audiobooks.map((book) =>
      book.id === bookId
        ? {
            ...book,
            status: book.status === "published" ? "unpublished" : "published",
          }
        : book,
=======
    const updatedBooks = audiobooks.map(book => 
      book.id === bookId 
        ? { ...book, status: book.status === 'published' ? 'unpublished' : 'published' }
        : book
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    );
    setAudiobooks(updatedBooks);
  };

  const totalStreams = audiobooks.reduce((sum, book) => sum + book.streams, 0);
<<<<<<< HEAD
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
=======
  const totalEarnings = audiobooks.reduce((sum, book) => sum + book.earnings, 0);
  const publishedBooks = audiobooks.filter(b => b.status === 'published');

  return (
    <div 
      className="p-8"
      style={{
        padding: '32px',
        backgroundColor: '#121212',
        minHeight: '100vh',
        color: '#FFFFFF'
      }}
    >
      <div 
        className="flex items-center justify-between mb-8"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '32px',
          gap: '16px'
        }}
      >
        <h1 
          className="text-4xl font-bold"
          style={{
            fontSize: '32px',
            lineHeight: '36px',
            fontWeight: 700,
            color: '#FFFFFF'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }}
        >
          Audiobook Creator Dashboard
        </h1>
      </div>

      {/* Legal Requirements Notice */}
<<<<<<< HEAD
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
=======
      <div 
        className="bg-blue-600/20 border border-blue-600/50 rounded-lg p-6 mb-8"
        style={{
          backgroundColor: 'rgba(13, 115, 236, 0.2)',
          border: '1px solid rgba(13, 115, 236, 0.5)',
          borderRadius: '8px',
          padding: '24px',
          marginBottom: '32px'
        }}
      >
        <div className="flex items-start gap-3">
          <AlertCircle size={24} className="text-blue-400 flex-shrink-0" style={{ color: '#60A5FA' }} />
          <div>
            <h3 
              className="text-lg font-bold mb-2"
              style={{
                fontSize: '18px',
                lineHeight: '24px',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '8px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              }}
            >
              Legal Requirements for Audiobook Creators
            </h3>
<<<<<<< HEAD
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
=======
            <ul 
              className="text-sm text-spotify-text-gray space-y-1 list-disc list-inside"
              style={{
                fontSize: '14px',
                lineHeight: '20px',
                color: '#B3B3B3',
                listStyle: 'disc',
                paddingLeft: '20px'
              }}
            >
              <li>You must own or have licensed <strong>text rights</strong> to create the audio derivative work</li>
              <li>You must own or have licensed <strong>sound recording rights</strong> (if using a narrator/producer, secure proper agreements)</li>
              <li>Third-party content (music, sound effects, quotations) requires separate licenses or permissions</li>
              <li>Cover art, metadata, author name, and biographical info rights must be cleared</li>
              <li>Copyright registration recommended before or within 3 months of publication for legal protection</li>
              <li>Indemnification agreement: you must indemnify the platform against claims if rights are infringed</li>
              <li>Distribution rights license required (exclusive or non-exclusive, territory-specific or worldwide)</li>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            </ul>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
<<<<<<< HEAD
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
=======
      <div 
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '32px'
        }}
      >
        <div 
          className="bg-gradient-to-br from-orange-500 to-red-500 rounded-lg p-6 text-white"
          style={{
            background: 'linear-gradient(135deg, #F97316 0%, #EF4444 100%)',
            borderRadius: '8px',
            padding: '24px',
            color: '#FFFFFF'
          }}
        >
          <div 
            className="text-sm opacity-80 mb-1"
            style={{
              fontSize: '13px',
              lineHeight: '16px',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '4px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            Total Audiobooks
          </div>
<<<<<<< HEAD
          <div
            className="text-3xl font-bold"
            style={{
              fontSize: "32px",
              lineHeight: "36px",
              fontWeight: 700,
              color: "#FFFFFF",
=======
          <div 
            className="text-3xl font-bold"
            style={{
              fontSize: '32px',
              lineHeight: '36px',
              fontWeight: 700,
              color: '#FFFFFF'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            {audiobooks.length}
          </div>
<<<<<<< HEAD
          <div
            className="text-xs opacity-60 mt-1"
            style={{
              fontSize: "12px",
              opacity: 0.6,
              marginTop: "4px",
=======
          <div 
            className="text-xs opacity-60 mt-1"
            style={{
              fontSize: '12px',
              opacity: 0.6,
              marginTop: '4px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            {publishedBooks.length} published
          </div>
        </div>

<<<<<<< HEAD
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
=======
        <div 
          className="bg-gradient-to-br from-empulse-purple to-empulse-blue rounded-lg p-6 text-white"
          style={{
            background: 'linear-gradient(135deg, #7209B7 0%, #457B9D 100%)',
            borderRadius: '8px',
            padding: '24px',
            color: '#FFFFFF'
          }}
        >
          <div 
            className="text-sm opacity-80 mb-1"
            style={{
              fontSize: '13px',
              lineHeight: '16px',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '4px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            Total Listens
          </div>
<<<<<<< HEAD
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
=======
          <div 
            className="text-3xl font-bold flex items-center gap-2"
            style={{
              fontSize: '32px',
              lineHeight: '36px',
              fontWeight: 700,
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <TrendingUp size={24} style={{ width: '24px', height: '24px' }} />
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            {totalStreams.toLocaleString()}
          </div>
        </div>

<<<<<<< HEAD
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
=======
        <div 
          className="bg-gradient-to-br from-green-500 to-teal-500 rounded-lg p-6 text-white"
          style={{
            background: 'linear-gradient(135deg, #22C55E 0%, #14B8A6 100%)',
            borderRadius: '8px',
            padding: '24px',
            color: '#FFFFFF'
          }}
        >
          <div 
            className="text-sm opacity-80 mb-1"
            style={{
              fontSize: '13px',
              lineHeight: '16px',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '4px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            Total Earnings
          </div>
<<<<<<< HEAD
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
=======
          <div 
            className="text-3xl font-bold flex items-center gap-2"
            style={{
              fontSize: '32px',
              lineHeight: '36px',
              fontWeight: 700,
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <DollarSign size={24} style={{ width: '24px', height: '24px' }} />
            ${totalEarnings.toFixed(2)}
          </div>
        </div>

        <div 
          className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-6 text-white"
          style={{
            background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)',
            borderRadius: '8px',
            padding: '24px',
            color: '#FFFFFF'
          }}
        >
          <div 
            className="text-sm opacity-80 mb-1"
            style={{
              fontSize: '13px',
              lineHeight: '16px',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '4px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            Avg. Listens/Book
          </div>
<<<<<<< HEAD
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
=======
          <div 
            className="text-3xl font-bold"
            style={{
              fontSize: '32px',
              lineHeight: '36px',
              fontWeight: 700,
              color: '#FFFFFF'
            }}
          >
            {publishedBooks.length > 0 ? Math.round(totalStreams / publishedBooks.length).toLocaleString() : '0'}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          </div>
        </div>
      </div>

      {/* Upload Section - Feature Coming Soon */}
<<<<<<< HEAD
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
=======
      <div 
        className="bg-spotify-light-gray rounded-lg p-6 mb-8"
        style={{
          backgroundColor: '#181818',
          borderRadius: '8px',
          padding: '24px',
          marginBottom: '32px'
        }}
      >
        <h2 
          className="text-2xl font-bold mb-4"
          style={{
            fontSize: '24px',
            lineHeight: '28px',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '16px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }}
        >
          Upload New Audiobook
        </h2>
<<<<<<< HEAD
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
=======
        <div 
          className="bg-yellow-600/20 border border-yellow-600/50 rounded-lg p-6 text-center"
          style={{
            backgroundColor: 'rgba(234, 179, 8, 0.2)',
            border: '1px solid rgba(234, 179, 8, 0.5)',
            borderRadius: '8px',
            padding: '24px',
            textAlign: 'center'
          }}
        >
          <BookOpen 
            size={48} 
            className="mx-auto mb-4 text-yellow-400"
            style={{
              width: '48px',
              height: '48px',
              color: '#FACC15',
              margin: '0 auto 16px'
            }}
          />
          <h3 
            className="text-xl font-bold mb-2 text-white"
            style={{
              fontSize: '20px',
              lineHeight: '24px',
              fontWeight: 700,
              color: '#FFFFFF',
              marginBottom: '8px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            Feature Coming Soon
          </h3>
<<<<<<< HEAD
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
=======
          <p 
            className="text-spotify-text-gray"
            style={{
              fontSize: '14px',
              lineHeight: '20px',
              color: '#B3B3B3'
            }}
          >
            Audiobook upload functionality is currently under development. We&apos;re working to ensure full legal compliance, rights verification, and quality standards before launch.
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
<<<<<<< HEAD
                <tr
                  key={book.id}
                  className="border-b border-white/10 hover:bg-white/5 transition-colors"
                >
=======
                <tr key={book.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  <td className="py-3">
                    <div className="font-medium">{book.name}</div>
                  </td>
                  <td className="py-3 text-spotify-text-gray">{book.author}</td>
<<<<<<< HEAD
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
=======
                  <td className="py-3 text-spotify-text-gray">{book.narrator}</td>
                  <td className="py-3 text-spotify-text-gray">{book.duration}</td>
                  <td className="py-3 text-spotify-text-gray">{new Date(book.uploadDate).toLocaleDateString()}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      book.status === 'published'
                        ? 'bg-green-600/20 text-green-400'
                        : 'bg-yellow-600/20 text-yellow-400'
                    }`}>
                      {book.status === 'published' ? 'Published' : 'Unpublished'}
                    </span>
                  </td>
                  <td className="py-3 text-right font-medium">{book.streams.toLocaleString()}</td>
                  <td className="py-3 text-right font-medium">${book.earnings.toFixed(2)}</td>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  <td className="py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => togglePublish(book.id)}
                        className={`p-2 rounded hover:bg-white/10 transition-colors ${
<<<<<<< HEAD
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
=======
                          book.status === 'published' ? 'text-yellow-400' : 'text-green-400'
                        }`}
                        title={book.status === 'published' ? 'Unpublish' : 'Publish'}
                      >
                        {book.status === 'published' ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      <button 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
<<<<<<< HEAD
              <div className="text-sm text-spotify-text-gray">
                Revenue Model
              </div>
              <div className="text-2xl font-bold">Royalty % of Sales</div>
              <div className="text-xs text-spotify-text-gray mt-1">
                Exclusive: 40% of retail price (Pay-for-Production) or 20%
                (Royalty Share)
=======
              <div className="text-sm text-spotify-text-gray">Revenue Model</div>
              <div className="text-2xl font-bold">Royalty % of Sales</div>
              <div className="text-xs text-spotify-text-gray mt-1">
                Exclusive: 40% of retail price (Pay-for-Production) or 20% (Royalty Share)
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              </div>
              <div className="text-xs text-spotify-text-gray mt-1">
                Non-Exclusive: 25% of retail price | Platform retains 60-75%
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-spotify-dark-gray rounded-lg">
<<<<<<< HEAD
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
=======
              <div className="text-sm text-spotify-text-gray mb-1">Pending Payment</div>
              <div className="text-xl font-bold">$0.00</div>
            </div>
            <div className="p-4 bg-spotify-dark-gray rounded-lg">
              <div className="text-sm text-spotify-text-gray mb-1">This Month</div>
              <div className="text-xl font-bold">${totalEarnings.toFixed(2)}</div>
            </div>
            <div className="p-4 bg-spotify-dark-gray rounded-lg">
              <div className="text-sm text-spotify-text-gray mb-1">Lifetime</div>
              <div className="text-xl font-bold">${totalEarnings.toFixed(2)}</div>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
