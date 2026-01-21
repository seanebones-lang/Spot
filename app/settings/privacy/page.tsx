<<<<<<< HEAD
"use client";

export default function PrivacySettingsPage() {
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
'use client';

export default function PrivacySettingsPage() {
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
        Privacy
      </h1>
<<<<<<< HEAD
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
=======
      <div 
        className="max-w-2xl space-y-6"
        style={{
          maxWidth: '672px',
          gap: '24px'
        }}
      >
        <div 
          className="bg-spotify-light-gray rounded-lg p-6"
          style={{
            backgroundColor: '#181818',
            borderRadius: '8px',
            padding: '24px'
          }}
        >
          <h2 
            className="text-xl font-bold mb-4"
            style={{
              fontSize: '20px',
              lineHeight: '28px',
              fontWeight: 700,
              color: '#FFFFFF',
              marginBottom: '16px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            Data Settings
          </h2>
<<<<<<< HEAD
          <div className="space-y-4" style={{ gap: "16px" }}>
            <label
              className="flex items-center justify-between cursor-pointer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                cursor: "pointer",
                padding: "12px 0",
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 400,
                  color: "#FFFFFF",
=======
          <div 
            className="space-y-4"
            style={{ gap: '16px' }}
          >
            <label 
              className="flex items-center justify-between cursor-pointer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                cursor: 'pointer',
                padding: '12px 0'
              }}
            >
              <span 
                style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: 400,
                  color: '#FFFFFF'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                }}
              >
                Share listening activity
              </span>
<<<<<<< HEAD
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5"
                style={{
                  width: "20px",
                  height: "20px",
                  cursor: "pointer",
                  accentColor: "#1DB954",
                }}
              />
            </label>
            <label
              className="flex items-center justify-between cursor-pointer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                cursor: "pointer",
                padding: "12px 0",
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 400,
                  color: "#FFFFFF",
=======
              <input 
                type="checkbox" 
                defaultChecked 
                className="w-5 h-5"
                style={{
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer',
                  accentColor: '#7209B7'
                }}
              />
            </label>
            <label 
              className="flex items-center justify-between cursor-pointer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                cursor: 'pointer',
                padding: '12px 0'
              }}
            >
              <span 
                style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: 400,
                  color: '#FFFFFF'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                }}
              >
                Show my activity
              </span>
<<<<<<< HEAD
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5"
                style={{
                  width: "20px",
                  height: "20px",
                  cursor: "pointer",
                  accentColor: "#1DB954",
=======
              <input 
                type="checkbox" 
                defaultChecked 
                className="w-5 h-5"
                style={{
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer',
                  accentColor: '#7209B7'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                }}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
