"use client";

import Image from "next/image";

export default function FriendsPage() {
  // Mock friends activity data
  const friendsActivity = [
    {
      id: "1",
      name: "Alex",
      avatar: "",
      track: "Echos of choices",
      artist: "NextEleven Label Showcase",
      time: "now",
    },
    {
      id: "2",
      name: "Sarah",
      avatar: "",
      track: "Digital Goldrush",
      artist: "NextEleven Label Showcase",
      time: "5 min ago",
    },
    {
      id: "3",
      name: "Mike",
      avatar: "",
      track: "Storm Chant",
      artist: "Ash Reed",
      time: "10 min ago",
    },
  ];

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
        }}
      >
        Friends Activity
      </h1>

      {friendsActivity.length === 0 ? (
        <div
          className="text-center py-24"
          style={{
            textAlign: "center",
            padding: "96px 16px",
          }}
        >
          <p
            className="text-spotify-text-gray text-xl font-medium mb-2"
            style={{
              fontSize: "20px",
              lineHeight: "28px",
              fontWeight: 600,
              color: "#B3B3B3",
              marginBottom: "8px",
            }}
          >
            No friends activity yet
          </p>
          <p
            className="text-spotify-text-gray text-sm"
            style={{
              fontSize: "14px",
              lineHeight: "20px",
              color: "#B3B3B3",
            }}
          >
            Connect with friends to see what they're listening to
          </p>
        </div>
      ) : (
        <div className="space-y-4" style={{ gap: "16px" }}>
          {friendsActivity.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center gap-4 p-4 bg-spotify-light-gray hover:bg-spotify-dark-gray rounded-lg transition-colors"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "16px",
                backgroundColor: "#181818",
                borderRadius: "8px",
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
                className="w-12 h-12 bg-gradient-to-br from-spotify-green to-spotify-green rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  width: "48px",
                  height: "48px",
                  background:
                    "linear-gradient(135deg, #1DB954 0%, #1ed760 100%)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  className="text-white font-medium"
                  style={{
                    color: "#FFFFFF",
                    fontSize: "16px",
                    lineHeight: "24px",
                    fontWeight: 600,
                  }}
                >
                  {friend.name.charAt(0)}
                </span>
              </div>
              <div
                className="flex-1 min-w-0"
                style={{
                  flex: "1 1 0%",
                  minWidth: 0,
                }}
              >
                <p
                  className="text-white"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#FFFFFF",
                    marginBottom: "4px",
                  }}
                >
                  <span
                    className="font-medium"
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    {friend.name}
                  </span>
                  {" is listening to "}
                  <span
                    className="font-medium hover:underline cursor-pointer"
                    style={{
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "text-decoration 200ms ease-out",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.textDecoration = "underline")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.textDecoration = "none")
                    }
                  >
                    {friend.track}
                  </span>
                  {" by "}
                  <span
                    className="hover:underline cursor-pointer"
                    style={{
                      cursor: "pointer",
                      transition: "text-decoration 200ms ease-out",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.textDecoration = "underline")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.textDecoration = "none")
                    }
                  >
                    {friend.artist}
                  </span>
                </p>
                <p
                  className="text-sm text-spotify-text-gray"
                  style={{
                    fontSize: "13px",
                    lineHeight: "16px",
                    color: "#B3B3B3",
                  }}
                >
                  {friend.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
