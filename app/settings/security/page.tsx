"use client";

export default function SecuritySettingsPage() {
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
        Security
      </h1>
      <div
        className="max-w-2xl space-y-6"
        style={{
          maxWidth: "672px",
          gap: "24px",
        }}
      >
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
              lineHeight: "28px",
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: "16px",
            }}
          >
            Two-Factor Authentication
          </h2>
          <button
            className="bg-white text-black px-6 py-2 rounded-full hover:bg-[#f5f5f5] transition-colors"
            style={{
              backgroundColor: "#FFFFFF",
              color: "#000000",
              padding: "12px 24px",
              borderRadius: "500px",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 700,
              letterSpacing: "0.05em",
              transition: "all 200ms ease-out",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f5f5f5";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#FFFFFF";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Enable 2FA
          </button>
        </div>
      </div>
    </div>
  );
}
