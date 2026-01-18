'use client';

export default function SocialPage() {
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
        }}
      >
        Social
      </h1>
      <div 
        className="text-center py-24"
        style={{
          textAlign: 'center',
          padding: '96px 16px'
        }}
      >
        <p 
          className="text-spotify-text-gray text-xl font-medium mb-2"
          style={{
            fontSize: '20px',
            lineHeight: '28px',
            fontWeight: 600,
            color: '#B3B3B3',
            marginBottom: '8px'
          }}
        >
          Social features coming soon
        </p>
        <p 
          className="text-spotify-text-gray text-sm"
          style={{
            fontSize: '14px',
            lineHeight: '20px',
            color: '#B3B3B3'
          }}
        >
          Connect with friends and share your music
        </p>
      </div>
    </div>
  );
}
