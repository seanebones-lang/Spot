<<<<<<< HEAD
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  User,
  Lock,
  Smartphone,
  Music2,
  Bell,
  Globe,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

const settingsCategories = [
  {
    id: "account",
    title: "Account",
    icon: User,
    href: "/settings/account",
    description: "Profile, email, password, and account management",
  },
  {
    id: "privacy",
    title: "Privacy",
    icon: Lock,
    href: "/settings/privacy",
    description: "Privacy settings, data controls, and sharing preferences",
  },
  {
    id: "devices",
    title: "Devices",
    icon: Smartphone,
    href: "/settings/devices",
    description: "Connected devices and playback settings",
  },
  {
    id: "playback",
    title: "Playback",
    icon: Music2,
    href: "/settings/playback",
    description: "Audio quality, crossfade, and playback preferences",
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: Bell,
    href: "/settings/notifications",
    description: "Email and push notification preferences",
  },
  {
    id: "language",
    title: "Language & Region",
    icon: Globe,
    href: "/settings/language",
    description: "Language, region, and content preferences",
  },
  {
    id: "security",
    title: "Security",
    icon: Shield,
    href: "/settings/security",
    description: "Two-factor authentication and security settings",
  },
=======
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, User, Lock, Smartphone, Music2, Bell, Globe, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const settingsCategories = [
  {
    id: 'account',
    title: 'Account',
    icon: User,
    href: '/settings/account',
    description: 'Profile, email, password, and account management'
  },
  {
    id: 'privacy',
    title: 'Privacy',
    icon: Lock,
    href: '/settings/privacy',
    description: 'Privacy settings, data controls, and sharing preferences'
  },
  {
    id: 'devices',
    title: 'Devices',
    icon: Smartphone,
    href: '/settings/devices',
    description: 'Connected devices and playback settings'
  },
  {
    id: 'playback',
    title: 'Playback',
    icon: Music2,
    href: '/settings/playback',
    description: 'Audio quality, crossfade, and playback preferences'
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: Bell,
    href: '/settings/notifications',
    description: 'Email and push notification preferences'
  },
  {
    id: 'language',
    title: 'Language & Region',
    icon: Globe,
    href: '/settings/language',
    description: 'Language, region, and content preferences'
  },
  {
    id: 'security',
    title: 'Security',
    icon: Shield,
    href: '/settings/security',
    description: 'Two-factor authentication and security settings'
  }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
];

export default function SettingsPage() {
  return (
<<<<<<< HEAD
    <div
      className="min-h-screen bg-spotify-dark text-white p-8"
      style={{
        minHeight: "100vh",
        backgroundColor: "#121212",
        padding: "32px",
      }}
    >
      <div className="max-w-4xl mx-auto" style={{ maxWidth: "896px" }}>
        <h1
          className="text-4xl font-bold mb-8"
          style={{
            fontSize: "32px",
            lineHeight: "36px",
            fontWeight: 700,
            color: "#FFFFFF",
            marginBottom: "32px",
=======
    <div 
      className="min-h-screen bg-spotify-dark text-white p-8"
      style={{
        minHeight: '100vh',
        backgroundColor: '#121212',
        padding: '32px'
      }}
    >
      <div 
        className="max-w-4xl mx-auto"
        style={{ maxWidth: '896px' }}
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
          Settings
        </h1>

<<<<<<< HEAD
        <div className="space-y-2" style={{ gap: "8px" }}>
=======
        <div 
          className="space-y-2"
          style={{ gap: '8px' }}
        >
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          {settingsCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                href={category.href}
                className="flex items-center gap-4 p-4 bg-spotify-light-gray hover:bg-spotify-dark-gray rounded-lg transition-colors group"
                style={{
<<<<<<< HEAD
                  gap: "16px",
                  padding: "16px",
                  backgroundColor: "#181818",
                  borderRadius: "8px",
                  transition: "background-color 200ms ease-out",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#282828";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#181818";
                }}
              >
                <div
                  className="w-12 h-12 bg-spotify-dark-gray rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    backgroundColor: "#282828",
                  }}
                >
                  <Icon
                    className="w-6 h-6 text-white"
                    style={{
                      width: "24px",
                      height: "24px",
                      color: "#FFFFFF",
=======
                  gap: '16px',
                  padding: '16px',
                  backgroundColor: '#181818',
                  borderRadius: '8px',
                  transition: 'background-color 200ms ease-out',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#282828';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#181818';
                }}
              >
                <div 
                  className="w-12 h-12 bg-spotify-dark-gray rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#282828'
                  }}
                >
                  <Icon 
                    className="w-6 h-6 text-white"
                    style={{
                      width: '24px',
                      height: '24px',
                      color: '#FFFFFF'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
<<<<<<< HEAD
                  <h3
                    className="text-white font-medium mb-1"
                    style={{
                      fontSize: "16px",
                      lineHeight: "24px",
                      fontWeight: 600,
                      color: "#FFFFFF",
                      marginBottom: "4px",
=======
                  <h3 
                    className="text-white font-medium mb-1"
                    style={{
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      marginBottom: '4px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                    }}
                  >
                    {category.title}
                  </h3>
<<<<<<< HEAD
                  <p
                    className="text-sm text-spotify-text-gray truncate"
                    style={{
                      fontSize: "13px",
                      lineHeight: "16px",
                      color: "#B3B3B3",
=======
                  <p 
                    className="text-sm text-spotify-text-gray truncate"
                    style={{
                      fontSize: '13px',
                      lineHeight: '16px',
                      color: '#B3B3B3'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                    }}
                  >
                    {category.description}
                  </p>
                </div>
<<<<<<< HEAD
                <ChevronRight
                  className="w-5 h-5 text-spotify-text-gray group-hover:text-white transition-colors flex-shrink-0"
                  style={{
                    width: "20px",
                    height: "20px",
                    color: "#B3B3B3",
                    transition: "color 200ms ease-out",
=======
                <ChevronRight 
                  className="w-5 h-5 text-spotify-text-gray group-hover:text-white transition-colors flex-shrink-0"
                  style={{
                    width: '20px',
                    height: '20px',
                    color: '#B3B3B3',
                    transition: 'color 200ms ease-out'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  }}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
