<<<<<<< HEAD
"use client";

export default function AccountSettingsPage() {
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

export default function AccountSettingsPage() {
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
        Account
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
            Profile
          </h2>
<<<<<<< HEAD
          <div className="space-y-4" style={{ gap: "16px" }}>
            <div>
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
            className="space-y-4"
            style={{ gap: '16px' }}
          >
            <div>
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
                Email
              </label>
<<<<<<< HEAD
              <input
                type="email"
                defaultValue="user@example.com"
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
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#1DB954";
                  e.currentTarget.style.borderWidth = "2px";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "transparent";
                  e.currentTarget.style.borderWidth = "1px";
=======
              <input 
                type="email" 
                defaultValue="user@example.com" 
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
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#7209B7';
                  e.currentTarget.style.borderWidth = '2px';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.borderWidth = '1px';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                }}
              />
            </div>
            <div>
<<<<<<< HEAD
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
                Username
              </label>
<<<<<<< HEAD
              <input
                type="text"
                defaultValue="User"
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
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#1DB954";
                  e.currentTarget.style.borderWidth = "2px";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "transparent";
                  e.currentTarget.style.borderWidth = "1px";
=======
              <input 
                type="text" 
                defaultValue="User" 
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
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#7209B7';
                  e.currentTarget.style.borderWidth = '2px';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.borderWidth = '1px';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                }}
              />
            </div>
          </div>
        </div>
<<<<<<< HEAD
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
            Change Password
          </h2>
<<<<<<< HEAD
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
              border: "none",
              cursor: "pointer",
              transition: "all 200ms ease-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f5f5f5";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#FFFFFF";
              e.currentTarget.style.transform = "scale(1)";
=======
          <button 
            className="bg-white text-black px-6 py-2 rounded-full hover:bg-[#f5f5f5] transition-colors"
            style={{
              backgroundColor: '#FFFFFF',
              color: '#000000',
              padding: '12px 24px',
              borderRadius: '500px',
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 200ms ease-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f5f5f5';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.transform = 'scale(1)';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
