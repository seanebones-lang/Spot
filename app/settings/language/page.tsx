<<<<<<< HEAD
"use client";

export default function LanguageSettingsPage() {
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

export default function LanguageSettingsPage() {
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
        Language & Region
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
          <label
            className="block text-sm font-medium mb-2"
            style={{
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 600,
              color: "#FFFFFF",
              marginBottom: "8px",
              display: "block",
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
          <label 
            className="block text-sm font-medium mb-2"
            style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: 600,
              color: '#FFFFFF',
              marginBottom: '8px',
              display: 'block'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            Language
          </label>
<<<<<<< HEAD
          <select
            className="w-full bg-spotify-dark-gray text-white px-4 py-2 rounded"
            style={{
              width: "100%",
              backgroundColor: "#282828",
              color: "#FFFFFF",
              padding: "12px 16px",
              borderRadius: "4px",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 400,
              border: "1px solid transparent",
              fontFamily: "inherit",
              cursor: "pointer",
              transition: "border-color 200ms ease-out",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#1DB954";
              e.currentTarget.style.borderWidth = "2px";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "transparent";
              e.currentTarget.style.borderWidth = "1px";
            }}
          >
            <option style={{ backgroundColor: "#282828", color: "#FFFFFF" }}>
              English (US)
            </option>
            <option style={{ backgroundColor: "#282828", color: "#FFFFFF" }}>
              Spanish
            </option>
            <option style={{ backgroundColor: "#282828", color: "#FFFFFF" }}>
              French
            </option>
          </select>
        </div>
        <div
          className="bg-spotify-light-gray rounded-lg p-6"
          style={{
            backgroundColor: "#181818",
            borderRadius: "8px",
            padding: "24px",
          }}
        >
          <label
            className="block text-sm font-medium mb-2"
            style={{
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 600,
              color: "#FFFFFF",
              marginBottom: "8px",
              display: "block",
=======
          <select 
            className="w-full bg-spotify-dark-gray text-white px-4 py-2 rounded"
            style={{
              width: '100%',
              backgroundColor: '#282828',
              color: '#FFFFFF',
              padding: '12px 16px',
              borderRadius: '4px',
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: 400,
              border: '1px solid transparent',
              fontFamily: 'inherit',
              cursor: 'pointer',
              transition: 'border-color 200ms ease-out'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#7209B7';
              e.currentTarget.style.borderWidth = '2px';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.borderWidth = '1px';
            }}
          >
            <option style={{ backgroundColor: '#282828', color: '#FFFFFF' }}>English (US)</option>
            <option style={{ backgroundColor: '#282828', color: '#FFFFFF' }}>Spanish</option>
            <option style={{ backgroundColor: '#282828', color: '#FFFFFF' }}>French</option>
          </select>
        </div>
        <div 
          className="bg-spotify-light-gray rounded-lg p-6"
          style={{
            backgroundColor: '#181818',
            borderRadius: '8px',
            padding: '24px'
          }}
        >
          <label 
            className="block text-sm font-medium mb-2"
            style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: 600,
              color: '#FFFFFF',
              marginBottom: '8px',
              display: 'block'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            Region
          </label>
<<<<<<< HEAD
          <select
            className="w-full bg-spotify-dark-gray text-white px-4 py-2 rounded"
            style={{
              width: "100%",
              backgroundColor: "#282828",
              color: "#FFFFFF",
              padding: "12px 16px",
              borderRadius: "4px",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 400,
              border: "1px solid transparent",
              fontFamily: "inherit",
              cursor: "pointer",
              transition: "border-color 200ms ease-out",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#1DB954";
              e.currentTarget.style.borderWidth = "2px";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "transparent";
              e.currentTarget.style.borderWidth = "1px";
            }}
          >
            <option style={{ backgroundColor: "#282828", color: "#FFFFFF" }}>
              United States
            </option>
            <option style={{ backgroundColor: "#282828", color: "#FFFFFF" }}>
              United Kingdom
            </option>
            <option style={{ backgroundColor: "#282828", color: "#FFFFFF" }}>
              Canada
            </option>
=======
          <select 
            className="w-full bg-spotify-dark-gray text-white px-4 py-2 rounded"
            style={{
              width: '100%',
              backgroundColor: '#282828',
              color: '#FFFFFF',
              padding: '12px 16px',
              borderRadius: '4px',
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: 400,
              border: '1px solid transparent',
              fontFamily: 'inherit',
              cursor: 'pointer',
              transition: 'border-color 200ms ease-out'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#7209B7';
              e.currentTarget.style.borderWidth = '2px';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.borderWidth = '1px';
            }}
          >
            <option style={{ backgroundColor: '#282828', color: '#FFFFFF' }}>United States</option>
            <option style={{ backgroundColor: '#282828', color: '#FFFFFF' }}>United Kingdom</option>
            <option style={{ backgroundColor: '#282828', color: '#FFFFFF' }}>Canada</option>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          </select>
        </div>
      </div>
    </div>
  );
}
