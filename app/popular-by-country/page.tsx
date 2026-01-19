'use client';

import Link from 'next/link';
import { Globe, Music, TrendingUp, ArrowRight } from 'lucide-react';

export default function PopularByCountryPage() {
  const countries = [
    { name: 'United States', flag: '🇺🇸', popular: ['Pop', 'Hip-Hop', 'Country'] },
    { name: 'United Kingdom', flag: '🇬🇧', popular: ['Rock', 'Pop', 'Electronic'] },
    { name: 'Canada', flag: '🇨🇦', popular: ['Pop', 'Rock', 'Indie'] },
    { name: 'Australia', flag: '🇦🇺', popular: ['Rock', 'Pop', 'Electronic'] },
    { name: 'Germany', flag: '🇩🇪', popular: ['Electronic', 'Rock', 'Hip-Hop'] },
    { name: 'France', flag: '🇫🇷', popular: ['Pop', 'Hip-Hop', 'Electronic'] },
    { name: 'Japan', flag: '🇯🇵', popular: ['J-Pop', 'Rock', 'Electronic'] },
    { name: 'Brazil', flag: '🇧🇷', popular: ['Latin', 'Pop', 'Sertanejo'] },
    { name: 'Mexico', flag: '🇲🇽', popular: ['Latin', 'Pop', 'Reggaeton'] },
    { name: 'Spain', flag: '🇪🇸', popular: ['Latin', 'Pop', 'Flamenco'] },
    { name: 'India', flag: '🇮🇳', popular: ['Bollywood', 'Pop', 'Classical'] },
    { name: 'South Korea', flag: '🇰🇷', popular: ['K-Pop', 'Hip-Hop', 'R&B'] }
  ];

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
      <div 
        className="max-w-6xl mx-auto"
        style={{
          maxWidth: '1152px',
          margin: '0 auto'
        }}
      >
        {/* Header */}
        <div 
          className="mb-12 text-center"
          style={{ marginBottom: '48px', textAlign: 'center' }}
        >
          <Globe 
            size={64} 
            className="mx-auto mb-6 text-spotify-green"
            style={{ color: '#7209B7', marginBottom: '24px' }}
          />
          <h1 
            className="text-5xl font-bold mb-4"
            style={{
              fontSize: '48px',
              lineHeight: '56px',
              fontWeight: 900,
              color: '#FFFFFF',
              marginBottom: '16px'
            }}
          >
            Popular by Country
          </h1>
          <p 
            className="text-xl text-spotify-text-gray max-w-3xl mx-auto"
            style={{
              fontSize: '20px',
              lineHeight: '28px',
              color: '#B3B3B3',
              maxWidth: '672px',
              margin: '0 auto'
            }}
          >
            Discover the most popular music genres and artists in different countries around the world.
          </p>
        </div>

        {/* Countries Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countries.map((country, index) => (
              <Link
                key={index}
                href={`/categories/${country.popular[0].toLowerCase()}`}
                className="bg-spotify-light-gray rounded-lg p-6 hover:bg-spotify-light-gray/80 transition-colors"
                style={{
                  backgroundColor: '#282828',
                  borderRadius: '8px',
                  padding: '24px',
                  transition: 'background-color 0.2s'
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">{country.flag}</span>
                  <h3 
                    className="text-xl font-bold"
                    style={{
                      fontSize: '20px',
                      lineHeight: '28px',
                      fontWeight: 700,
                      color: '#FFFFFF'
                    }}
                  >
                    {country.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {country.popular.map((genre, genreIndex) => (
                    <span
                      key={genreIndex}
                      className="px-3 py-1 bg-spotify-green/20 text-spotify-green rounded-full text-sm"
                      style={{
                        padding: '4px 12px',
                        backgroundColor: 'rgba(114, 9, 183, 0.2)',
                        color: '#7209B7',
                        borderRadius: '9999px',
                        fontSize: '12px'
                      }}
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 text-spotify-green text-sm font-medium">
                  <span>Explore</span>
                  <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Global Stats */}
        <section>
          <div 
            className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg p-8 border border-purple-600/30 text-center"
            style={{
              background: 'linear-gradient(to right, rgba(114, 9, 183, 0.2), rgba(69, 123, 157, 0.2))',
              borderRadius: '8px',
              padding: '32px',
              border: '1px solid rgba(114, 9, 183, 0.3)',
              textAlign: 'center'
            }}
          >
            <TrendingUp 
              size={48} 
              className="mx-auto mb-4 text-spotify-green"
              style={{ color: '#7209B7', marginBottom: '16px' }}
            />
            <h2 
              className="text-3xl font-bold mb-4"
              style={{
                fontSize: '32px',
                lineHeight: '40px',
                fontWeight: 900,
                color: '#FFFFFF',
                marginBottom: '16px'
              }}
            >
              Global Music Trends
            </h2>
            <p 
              className="text-lg text-spotify-text-gray mb-6"
              style={{
                fontSize: '18px',
                lineHeight: '28px',
                color: '#B3B3B3',
                marginBottom: '24px'
              }}
            >
              Discover what's trending worldwide. Browse by country to see the most popular 
              genres, artists, and tracks in different regions.
            </p>
            <Link
              href="/trending"
              className="bg-spotify-green hover:bg-[#8a1dd0] text-black font-bold py-3 px-6 rounded-full transition-colors inline-block"
              style={{
                backgroundColor: '#7209B7',
                color: '#000000',
                fontWeight: 700,
                padding: '12px 24px',
                borderRadius: '9999px',
                transition: 'background-color 0.2s'
              }}
            >
              View Global Trends
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
