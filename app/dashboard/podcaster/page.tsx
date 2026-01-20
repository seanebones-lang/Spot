"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TrendingUp,
  DollarSign,
  Mic,
  Eye,
  EyeOff,
  BarChart3,
  AlertCircle,
  Radio,
} from "lucide-react";

// Mock episode data
const mockEpisodes = [
  {
    id: "1",
    name: "Episode 1: Getting Started",
    series: "My Podcast",
    uploadDate: "2024-01-10",
    status: "published",
    streams: 1250,
    earnings: 5.0,
  },
  {
    id: "2",
    name: "Episode 2: Deep Dive",
    series: "My Podcast",
    uploadDate: "2024-01-12",
    status: "published",
    streams: 890,
    earnings: 3.56,
  },
  {
    id: "3",
    name: "Episode 3: Interview Special",
    series: "My Podcast",
    uploadDate: "2024-01-14",
    status: "unpublished",
    streams: 0,
    earnings: 0,
  },
];

export default function PodcasterDashboardPage() {
  const router = useRouter();
  const [episodes, setEpisodes] = useState(mockEpisodes);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const togglePublish = (episodeId: string) => {
    const updatedEpisodes = episodes.map((episode) =>
      episode.id === episodeId
        ? {
            ...episode,
            status:
              episode.status === "published" ? "unpublished" : "published",
          }
        : episode,
    );
    setEpisodes(updatedEpisodes);
  };

  const totalStreams = episodes.reduce(
    (sum, episode) => sum + episode.streams,
    0,
  );
  const totalEarnings = episodes.reduce(
    (sum, episode) => sum + episode.earnings,
    0,
  );
  const publishedEpisodes = episodes.filter((e) => e.status === "published");

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
          Podcaster Dashboard
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
              Legal Requirements for Podcasters
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
                You must own or have licensed all rights to content you upload
                (music, sound effects, artwork, etc.)
              </li>
              <li>
                Content must comply with copyright, defamation, harassment, and
                other content policies
              </li>
              <li>
                Explicit content must be properly tagged with parental advisory
                labels
              </li>
              <li>
                Accurate metadata required (title, description, episode number,
                release date)
              </li>
              <li>
                Tax and banking information required for monetization and
                payouts
              </li>
              <li>
                Must grant distribution rights license to the platform for
                content delivery
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
            Total Episodes
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
            {episodes.length}
          </div>
          <div
            className="text-xs opacity-60 mt-1"
            style={{
              fontSize: "12px",
              opacity: 0.6,
              marginTop: "4px",
            }}
          >
            {publishedEpisodes.length} published
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
            Total Streams
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
            Avg. Listens/Episode
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
            {publishedEpisodes.length > 0
              ? Math.round(
                  totalStreams / publishedEpisodes.length,
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
          Upload New Episode
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
          <Mic
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
            Episode upload functionality is currently under development.
            We&apos;re working hard to bring you the best podcasting experience
            with proper legal compliance and distribution tools.
          </p>
        </div>
      </div>

      {/* Episode Management */}
      <div className="bg-spotify-light-gray rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Episode Management</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 text-left text-sm text-spotify-text-gray">
                <th className="pb-3">Episode</th>
                <th className="pb-3">Series</th>
                <th className="pb-3">Upload Date</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Listens</th>
                <th className="pb-3 text-right">Earnings</th>
                <th className="pb-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {episodes.map((episode) => (
                <tr
                  key={episode.id}
                  className="border-b border-white/10 hover:bg-white/5 transition-colors"
                >
                  <td className="py-3">
                    <div className="font-medium">{episode.name}</div>
                  </td>
                  <td className="py-3 text-spotify-text-gray">
                    {episode.series}
                  </td>
                  <td className="py-3 text-spotify-text-gray">
                    {new Date(episode.uploadDate).toLocaleDateString()}
                  </td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        episode.status === "published"
                          ? "bg-green-600/20 text-green-400"
                          : "bg-yellow-600/20 text-yellow-400"
                      }`}
                    >
                      {episode.status === "published"
                        ? "Published"
                        : "Unpublished"}
                    </span>
                  </td>
                  <td className="py-3 text-right font-medium">
                    {episode.streams.toLocaleString()}
                  </td>
                  <td className="py-3 text-right font-medium">
                    ${episode.earnings.toFixed(2)}
                  </td>
                  <td className="py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => togglePublish(episode.id)}
                        className={`p-2 rounded hover:bg-white/10 transition-colors ${
                          episode.status === "published"
                            ? "text-yellow-400"
                            : "text-green-400"
                        }`}
                        title={
                          episode.status === "published"
                            ? "Unpublish"
                            : "Publish"
                        }
                      >
                        {episode.status === "published" ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                      <button
                        className="p-2 rounded hover:bg-white/10 transition-colors text-spotify-text-gray hover:text-white"
                        title="View Analytics"
                        aria-label="View episode analytics"
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
              <div className="text-2xl font-bold">Ad Revenue (CPM)</div>
              <div className="text-xs text-spotify-text-gray mt-1">
                Pre-roll: $15-30 CPM | Mid-roll: $25-50 CPM | Post-roll: $10-20
                CPM
              </div>
              <div className="text-xs text-spotify-text-gray mt-1">
                Plus subscription revenue (70-100% share) from paid subscribers
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
