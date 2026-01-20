"use client";

import { useState } from "react";
import Link from "next/link";
import { useLibraryStore } from "@/stores/libraryStore";
import { mockData } from "@/lib/data";
import { cn } from "@/lib/utils";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import { Users, Heart, Music, PlayCircle, Edit2 } from "lucide-react";

export default function ProfilePage() {
  const [filter, setFilter] = useState<
    "all" | "playlists" | "artists" | "albums"
  >("all");
  const [editMode, setEditMode] = useState(false);
  const { savedTracks, savedAlbums, savedPlaylists } = useLibraryStore();
  const albums = mockData.getAlbums();
  const artists = mockData.getArtists();

  // User profile data - from your own system
  // TODO: Replace with actual user store/auth system
  const userName = "Bones";
  const userEmail = "bones@nextEleven.com";
  const userHandle = userName.toLowerCase().replace(" ", "");
  const userAvatar = undefined; // Add user avatar from your system
  const followers = 1247;
  const following = 89;
  const publicPlaylists = savedPlaylists.length; // All playlists in library are considered public
  const monthlyListeners = 1250000; // Mock data

  // Filter saved albums
  const savedAlbumsData = albums.filter((album) =>
    savedAlbums.includes(album.id),
  );

  // Get unique artists from saved albums and playlists
  const savedArtistsData = artists.filter(
    (artist) =>
      savedAlbumsData.some((album) => album.artist.id === artist.id) ||
      savedPlaylists.some((playlist) => playlist.owner.includes(artist.name)),
  );

  // Use saved playlists from library store
  const allPlaylists = savedPlaylists;

  return (
    <div
      className="min-h-screen bg-spotify-dark text-white"
      style={{
        minHeight: "100vh",
        backgroundColor: "#121212",
        color: "#FFFFFF",
      }}
    >
      {/* Profile Header - Enhanced Spotify Style */}
      <div
        className="relative bg-gradient-to-b from-[#2a2a2a] to-spotify-dark pt-16 pb-8 px-8"
        style={{
          position: "relative",
          background: "linear-gradient(180deg, #2a2a2a 0%, #121212 100%)",
          paddingTop: "64px",
          paddingBottom: "32px",
          paddingLeft: "32px",
          paddingRight: "32px",
        }}
      >
        <div
          className="flex items-end gap-6"
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "24px",
          }}
        >
          {/* Avatar - Enhanced with glow effect */}
          <Avatar
            size="xl"
            src={userAvatar}
            fallback={userName}
            border
            glow
            className="shadow-2xl"
          />

          {/* User Info - Enhanced */}
          <div
            className="flex-1 min-w-0 pb-2"
            style={{
              flex: "1 1 0%",
              minWidth: 0,
              paddingBottom: "8px",
            }}
          >
            <div className="mb-4" style={{ marginBottom: "16px" }}>
              <h1
                className="text-6xl font-black mb-2 tracking-tight"
                style={{
                  fontSize: "72px",
                  lineHeight: "80px",
                  fontWeight: 900,
                  color: "#FFFFFF",
                  marginBottom: "8px",
                  letterSpacing: "-0.02em",
                }}
              >
                {userName}
              </h1>
              <p
                className="text-xl text-gray-400 mb-6"
                style={{
                  fontSize: "20px",
                  lineHeight: "28px",
                  color: "#B3B3B3",
                  marginBottom: "24px",
                }}
              >
                @{userHandle}
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={() => setEditMode(!editMode)}
                icon={Edit2}
                className="mb-4"
              >
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards - New Spotify Style */}
      <div
        className="px-8 py-6"
        style={{
          padding: "24px 32px",
        }}
      >
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "24px",
            marginBottom: "32px",
          }}
        >
          {/* Public Playlists Stat */}
          <div
            className="text-center p-6 bg-gray-900/50 rounded-2xl hover:bg-gray-900 transition-all cursor-pointer"
            style={{
              textAlign: "center",
              padding: "24px",
              backgroundColor: "rgba(17, 17, 17, 0.5)",
              borderRadius: "16px",
              transition: "background-color 200ms ease-out",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1a1a1a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(17, 17, 17, 0.5)";
            }}
          >
            <Music
              className="w-12 h-12 mx-auto mb-4 text-spotify-green"
              style={{
                width: "48px",
                height: "48px",
                margin: "0 auto 16px",
                color: "#1DB954",
              }}
            />
            <div
              className="text-4xl font-black mb-2"
              style={{
                fontSize: "36px",
                lineHeight: "44px",
                fontWeight: 900,
                marginBottom: "8px",
                color: "#FFFFFF",
              }}
            >
              {publicPlaylists}
            </div>
            <div
              className="text-gray-400 text-sm"
              style={{
                fontSize: "14px",
                lineHeight: "20px",
                color: "#B3B3B3",
              }}
            >
              Public Playlists
            </div>
          </div>

          {/* Followers Stat */}
          <div
            className="text-center p-6 bg-gray-900/50 rounded-2xl hover:bg-gray-900 transition-all cursor-pointer"
            style={{
              textAlign: "center",
              padding: "24px",
              backgroundColor: "rgba(17, 17, 17, 0.5)",
              borderRadius: "16px",
              transition: "background-color 200ms ease-out",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1a1a1a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(17, 17, 17, 0.5)";
            }}
          >
            <Users
              className="w-12 h-12 mx-auto mb-4 text-spotify-green"
              style={{
                width: "48px",
                height: "48px",
                margin: "0 auto 16px",
                color: "#1DB954",
              }}
            />
            <div
              className="text-4xl font-black mb-2"
              style={{
                fontSize: "36px",
                lineHeight: "44px",
                fontWeight: 900,
                marginBottom: "8px",
                color: "#FFFFFF",
              }}
            >
              {followers.toLocaleString()}
            </div>
            <div
              className="text-gray-400 text-sm"
              style={{
                fontSize: "14px",
                lineHeight: "20px",
                color: "#B3B3B3",
              }}
            >
              Followers
            </div>
          </div>

          {/* Monthly Listeners Stat */}
          <div
            className="text-center p-6 bg-gray-900/50 rounded-2xl hover:bg-gray-900 transition-all cursor-pointer"
            style={{
              textAlign: "center",
              padding: "24px",
              backgroundColor: "rgba(17, 17, 17, 0.5)",
              borderRadius: "16px",
              transition: "background-color 200ms ease-out",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1a1a1a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(17, 17, 17, 0.5)";
            }}
          >
            <Heart
              className="w-12 h-12 mx-auto mb-4 text-spotify-green"
              style={{
                width: "48px",
                height: "48px",
                margin: "0 auto 16px",
                color: "#1DB954",
              }}
            />
            <div
              className="text-4xl font-black mb-2"
              style={{
                fontSize: "36px",
                lineHeight: "44px",
                fontWeight: 900,
                marginBottom: "8px",
                color: "#FFFFFF",
              }}
            >
              {(monthlyListeners / 1000000).toFixed(1)}M
            </div>
            <div
              className="text-gray-400 text-sm"
              style={{
                fontSize: "14px",
                lineHeight: "20px",
                color: "#B3B3B3",
              }}
            >
              Monthly Listeners
            </div>
          </div>
        </div>

        {/* Filter Buttons - Exact Spotify Style */}
        <div
          className="sticky top-16 z-30 bg-spotify-dark border-b border-white/10 px-8 py-4 -mx-8"
          style={{
            position: "sticky",
            top: "64px",
            zIndex: 30,
            backgroundColor: "#121212",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "16px 32px",
            marginLeft: "-32px",
            marginRight: "-32px",
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
            {(["all", "playlists", "artists", "albums"] as const).map(
              (filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={cn(
                    "rounded-full font-medium transition-colors whitespace-nowrap",
                    filter === filterType
                      ? "bg-white text-black hover:bg-[#f5f5f5]"
                      : "bg-transparent text-spotify-text-gray hover:text-white hover:bg-white/10",
                  )}
                  style={{
                    padding: "6px 16px",
                    borderRadius: "500px",
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    transition: "all 200ms ease-out",
                    backgroundColor:
                      filter === filterType ? "#FFFFFF" : "transparent",
                    color: filter === filterType ? "#000000" : "#B3B3B3",
                    border: "none",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    textTransform: "capitalize",
                  }}
                  onMouseEnter={(e) => {
                    if (filter !== filterType) {
                      e.currentTarget.style.color = "#FFFFFF";
                      e.currentTarget.style.backgroundColor =
                        "rgba(255, 255, 255, 0.1)";
                    } else {
                      e.currentTarget.style.backgroundColor = "#f5f5f5";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (filter !== filterType) {
                      e.currentTarget.style.color = "#B3B3B3";
                      e.currentTarget.style.backgroundColor = "transparent";
                    } else {
                      e.currentTarget.style.backgroundColor = "#FFFFFF";
                    }
                  }}
                >
                  {filterType}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Content Grid - Enhanced with animations */}
        <div className="py-6">
          {/* Playlists Section */}
          {(filter === "all" || filter === "playlists") &&
            allPlaylists.length > 0 && (
              <section className="mb-12">
                {filter === "all" && (
                  <h2
                    className="text-3xl font-bold mb-8 flex items-center"
                    style={{
                      fontSize: "32px",
                      lineHeight: "40px",
                      fontWeight: 700,
                      marginBottom: "32px",
                      display: "flex",
                      alignItems: "center",
                      color: "#FFFFFF",
                    }}
                  >
                    Public Playlists
                    <PlayCircle
                      className="w-8 h-8 ml-4 text-spotify-green"
                      style={{
                        width: "32px",
                        height: "32px",
                        marginLeft: "16px",
                        color: "#1DB954",
                      }}
                    />
                  </h2>
                )}
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: "16px",
                  }}
                >
                  {allPlaylists.map((playlist, index) => (
                    <Link
                      key={playlist.id}
                      href={`/playlist/${playlist.id}`}
                      className="group cursor-pointer"
                      style={{
                        animation: `fadeIn 0.3s ease-out ${index * 0.05}s both`,
                        cursor: "pointer",
                      }}
                    >
                      <div
                        className="w-full aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 group-hover:shadow-[0_8px_32px_rgba(29,185,84,0.3)] transition-all duration-300 relative"
                        style={{
                          width: "100%",
                          aspectRatio: "1",
                          borderRadius: "12px",
                          overflow: "hidden",
                          background:
                            "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)",
                          transition: "all 300ms ease-out",
                          position: "relative",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform =
                            "scale(1.05) translateY(-4px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform =
                            "scale(1) translateY(0)";
                        }}
                      >
                        {playlist.coverArt ? (
                          <img
                            src={playlist.coverArt}
                            alt={playlist.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-spotify-green to-spotify-dark-gray flex items-center justify-center">
                            <span className="text-4xl">🎵</span>
                          </div>
                        )}
                        <div
                          className="absolute bottom-2 left-2 right-2 bg-black/70 text-white p-2 rounded-lg text-sm truncate"
                          style={{
                            position: "absolute",
                            bottom: "8px",
                            left: "8px",
                            right: "8px",
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                            color: "#FFFFFF",
                            padding: "8px",
                            borderRadius: "8px",
                            fontSize: "14px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {playlist.name}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

          {/* Artists Section */}
          {(filter === "all" || filter === "artists") &&
            savedArtistsData.length > 0 && (
              <section className="mb-12">
                {filter === "all" && (
                  <h2 className="text-2xl font-bold mb-6">Artists</h2>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                  {savedArtistsData.map((artist) => (
                    <Link
                      key={artist.id}
                      href={`/artist/${artist.id}`}
                      className="group bg-spotify-light-gray hover:bg-[#3e3e3e] rounded-lg p-4 transition-colors cursor-pointer text-center"
                    >
                      <div className="relative w-full aspect-square mb-4 rounded-full overflow-hidden shadow-lg bg-spotify-dark-gray mx-auto max-w-[200px]">
                        {artist.image ? (
                          <img
                            src={artist.image}
                            alt={artist.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-spotify-green to-spotify-dark-gray flex items-center justify-center">
                            <span className="text-4xl">
                              {artist.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      <h3 className="font-semibold text-sm text-white mb-1 truncate group-hover:underline">
                        {artist.name}
                      </h3>
                      <p className="text-xs text-spotify-text-gray">Artist</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

          {/* Albums Section */}
          {(filter === "all" || filter === "albums") &&
            savedAlbumsData.length > 0 && (
              <section className="mb-12">
                {filter === "all" && (
                  <h2 className="text-2xl font-bold mb-6">Albums</h2>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                  {savedAlbumsData.map((album) => (
                    <Link
                      key={album.id}
                      href={`/album/${album.id}`}
                      className="group bg-spotify-light-gray hover:bg-[#3e3e3e] rounded-lg p-4 transition-colors cursor-pointer"
                    >
                      <div className="relative w-full aspect-square mb-4 rounded overflow-hidden shadow-lg bg-spotify-dark-gray">
                        {album.coverArt ? (
                          <img
                            src={album.coverArt}
                            alt={album.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-spotify-green to-spotify-dark-gray flex items-center justify-center">
                            <span className="text-4xl">💿</span>
                          </div>
                        )}
                      </div>
                      <h3 className="font-semibold text-sm text-white mb-1 truncate group-hover:underline">
                        {album.name}
                      </h3>
                      <p className="text-xs text-spotify-text-gray truncate">
                        {album.artist.name}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

          {/* Empty State */}
          {((filter === "playlists" && allPlaylists.length === 0) ||
            (filter === "artists" && savedArtistsData.length === 0) ||
            (filter === "albums" && savedAlbumsData.length === 0) ||
            (filter === "all" &&
              allPlaylists.length === 0 &&
              savedArtistsData.length === 0 &&
              savedAlbumsData.length === 0)) && (
            <div className="text-center py-24">
              <p className="text-spotify-text-gray text-xl font-medium mb-2">
                {filter === "all" ? "No content yet" : `No ${filter} yet`}
              </p>
              <p className="text-spotify-text-gray text-sm">
                Start exploring and save your favorites!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal - Placeholder */}
      {editMode && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          onClick={() => setEditMode(false)}
        >
          <div
            className="bg-spotify-light-gray rounded-2xl p-8 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <p className="text-spotify-text-gray mb-6">
              Profile editing coming soon...
            </p>
            <Button onClick={() => setEditMode(false)}>Close</Button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
