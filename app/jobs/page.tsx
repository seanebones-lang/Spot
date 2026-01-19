'use client';

import Link from 'next/link';
import { Briefcase, Users, Zap, Heart, MapPin, ExternalLink } from 'lucide-react';

export default function JobsPage() {
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
          <Briefcase 
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
            Join the EmPulse Team
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
            We're building the future of music. Join us and help artists connect with audiences worldwide.
          </p>
        </div>

        {/* Why Work Here */}
        <section className="mb-16">
          <div 
            className="bg-spotify-light-gray rounded-lg p-8"
            style={{
              backgroundColor: '#282828',
              borderRadius: '8px',
              padding: '32px'
            }}
          >
            <h2 
              className="text-3xl font-bold mb-6"
              style={{
                fontSize: '32px',
                lineHeight: '40px',
                fontWeight: 900,
                color: '#FFFFFF',
                marginBottom: '24px'
              }}
            >
              Why Work at EmPulse?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Heart,
                  title: 'Mission-Driven',
                  description: 'We\'re building a platform that empowers artists and supports community wellness.'
                },
                {
                  icon: Zap,
                  title: 'Innovation',
                  description: 'Work with cutting-edge AI, RAG systems, and graph databases to revolutionize music discovery.'
                },
                {
                  icon: Users,
                  title: 'Great Team',
                  description: 'Join a diverse team of passionate music lovers, engineers, and designers.'
                },
                {
                  icon: MapPin,
                  title: 'Flexible Work',
                  description: 'Remote-friendly work environment with flexible hours and global team collaboration.'
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-spotify-dark rounded-lg p-6"
                  style={{
                    backgroundColor: '#121212',
                    borderRadius: '8px',
                    padding: '24px'
                  }}
                >
                  <feature.icon 
                    size={32} 
                    className="mb-4 text-spotify-green"
                    style={{ color: '#7209B7', marginBottom: '16px' }}
                  />
                  <h3 
                    className="text-xl font-bold mb-2"
                    style={{
                      fontSize: '20px',
                      lineHeight: '28px',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      marginBottom: '8px'
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p 
                    className="text-spotify-text-gray text-sm"
                    style={{
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#B3B3B3'
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="mb-16">
          <h2 
            className="text-3xl font-bold mb-8"
            style={{
              fontSize: '32px',
              lineHeight: '40px',
              fontWeight: 900,
              color: '#FFFFFF',
              marginBottom: '32px'
            }}
          >
            Open Positions
          </h2>
          <div 
            className="bg-spotify-light-gray rounded-lg p-8"
            style={{
              backgroundColor: '#282828',
              borderRadius: '8px',
              padding: '32px'
            }}
          >
            <div className="text-center">
              <p 
                className="text-lg text-spotify-text-gray mb-6"
                style={{
                  fontSize: '18px',
                  lineHeight: '28px',
                  color: '#B3B3B3',
                  marginBottom: '24px'
                }}
              >
                We're always looking for talented individuals to join our team. 
                While we don't have active openings listed at the moment, we're open to hearing from exceptional candidates.
              </p>
              <p 
                className="text-spotify-text-gray mb-8"
                style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#B3B3B3',
                  marginBottom: '32px'
                }}
              >
                Check back soon for new opportunities, or send us an email to introduce yourself.
              </p>
              <Link
                href="/support"
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
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* Departments */}
        <section className="mb-16">
          <h2 
            className="text-3xl font-bold mb-8"
            style={{
              fontSize: '32px',
              lineHeight: '40px',
              fontWeight: 900,
              color: '#FFFFFF',
              marginBottom: '32px'
            }}
          >
            Departments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Engineering', description: 'Backend, Frontend, DevOps, AI/ML' },
              { title: 'Product', description: 'Product Management, Design, UX Research' },
              { title: 'Artist Relations', description: 'Artist Support, Label Relations' },
              { title: 'Marketing', description: 'Growth, Content, Social Media' },
              { title: 'Business', description: 'Strategy, Partnerships, Sales' },
              { title: 'Operations', description: 'Customer Support, Legal, Finance' }
            ].map((dept, index) => (
              <div
                key={index}
                className="bg-spotify-light-gray rounded-lg p-6 hover:bg-spotify-light-gray/80 transition-colors"
                style={{
                  backgroundColor: '#282828',
                  borderRadius: '8px',
                  padding: '24px',
                  transition: 'background-color 0.2s'
                }}
              >
                <h3 
                  className="text-xl font-bold mb-2"
                  style={{
                    fontSize: '20px',
                    lineHeight: '28px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    marginBottom: '8px'
                  }}
                >
                  {dept.title}
                </h3>
                <p 
                  className="text-spotify-text-gray text-sm"
                  style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#B3B3B3'
                  }}
                >
                  {dept.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
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
              Interested in Joining Us?
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
              We'd love to hear from you. Send us a message and let us know how you'd like to contribute.
            </p>
            <Link
              href="/support"
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
              Get in Touch
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
