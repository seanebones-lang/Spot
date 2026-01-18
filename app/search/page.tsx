'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { mockData } from '@/lib/data';
import { useSearchStore } from '@/stores/searchStore';
import PlayButton from '@/components/PlayButton';
import { usePlayerStore } from '@/stores/playerStore';
import { cn } from '@/lib/utils';

interface BrowseCategory {
  id: string;
  title: string;
  href?: string;
  color: string;
  image?: string;
  category: 'music' | 'podcasts' | 'features' | 'mental-health' | 'artist' | 'store' | 'account' | 'lifestyle' | 'genres';
}

const browseCategories: BrowseCategory[] = [
  // Music Genres
  { id: 'pop', title: 'Pop', href: '/search?q=pop', color: '#8D67AB', category: 'music', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop&q=80' },
  { id: 'rock', title: 'Rock', color: '#E61E32', category: 'music', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop&q=80' },
  { id: 'hip-hop', title: 'Hip-Hop', color: '#BA5D07', category: 'music', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=400&fit=crop&q=80' },
  { id: 'electronic', title: 'Dance/Electronic', color: '#509BF5', category: 'music', image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&h=400&fit=crop&q=80' },
  { id: 'r-b', title: 'R&B', color: '#E8115B', category: 'music', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop&q=80' },
  { id: 'latin', title: 'Latin', color: '#148A08', category: 'music', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=400&fit=crop&q=80' },
  { id: 'jazz', title: 'Jazz', color: '#1E3264', category: 'music', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop&q=80' },
  { id: 'country', title: 'Country', color: '#D84000', category: 'music', image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=400&fit=crop&q=80' },
  { id: 'indie', title: 'Indie', color: '#E1118C', category: 'music', image: 'https://images.unsplash.com/photo-1461784180009-21121b2f2044?w=400&h=400&fit=crop&q=80' },
  { id: 'metal', title: 'Metal', color: '#778899', category: 'music', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&q=80' },
  { id: 'blues', title: 'Blues', color: '#1E3264', category: 'music', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop&q=80' },
  { id: 'soul', title: 'Soul', color: '#E8115B', category: 'music', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop&q=80' },
  { id: 'classical', title: 'Classical', color: '#1E3264', category: 'music', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&q=80' },
  { id: 'folk', title: 'Folk', color: '#148A08', category: 'music', image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=400&fit=crop&q=80' },
  { id: 'k-pop', title: 'K-Pop', color: '#E8115B', category: 'music', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop&q=80' },
  { id: 'world', title: 'World Music', color: '#148A08', category: 'music', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=400&fit=crop&q=80' },
  { id: 'punk', title: 'Punk', color: '#E61E32', category: 'music', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop&q=80' },
  { id: 'reggae', title: 'Reggae', color: '#148A08', category: 'music', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=400&fit=crop&q=80' },
  { id: 'gospel', title: 'Gospel', color: '#8D67AB', category: 'music', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop&q=80' },
  { id: 'alternative', title: 'Alternative', color: '#E1118C', category: 'music', image: 'https://images.unsplash.com/photo-1461784180009-21121b2f2044?w=400&h=400&fit=crop&q=80' },
  { id: 'funk', title: 'Funk', color: '#BA5D07', category: 'music', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=400&fit=crop&q=80' },
  { id: 'disco', title: 'Disco', color: '#E8115B', category: 'music', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop&q=80' },
  { id: 'house', title: 'House', color: '#509BF5', category: 'music', image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&h=400&fit=crop&q=80' },
  { id: 'techno', title: 'Techno', color: '#1E3264', category: 'music', image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&h=400&fit=crop&q=80' },
  { id: 'trap', title: 'Trap', color: '#BA5D07', category: 'music', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=400&fit=crop&q=80' },
  { id: 'afrobeats', title: 'Afrobeats', color: '#148A08', category: 'music', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=400&fit=crop&q=80' },
  { id: 'acoustic', title: 'Acoustic', color: '#148A08', category: 'music', image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=400&fit=crop&q=80' },
  { id: 'instrumental', title: 'Instrumental', color: '#1E3264', category: 'music', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop&q=80' },
  
  // Podcasts & Audio
  { id: 'podcasts', title: 'Podcasts', href: '/radio?filter=podcasts', color: '#056952', category: 'podcasts', image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop&q=80' },
  { id: 'audiobooks', title: 'Audiobooks', color: '#1E3264', category: 'podcasts', image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=400&fit=crop&q=80' },
  { id: 'mental-health-podcasts', title: 'Mental Health Podcasts', href: '/radio?filter=mental-health', color: '#E61E32', category: 'podcasts', image: 'https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=400&h=400&fit=crop&q=80' },
  
  // Features - Spotify Personalized
  { id: 'made-for-you', title: 'Made For You', href: '/', color: '#0D73EC', category: 'features', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=400&fit=crop&q=80' },
  { id: 'discover-weekly', title: 'Discover Weekly', href: '/', color: '#1DB954', category: 'features', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=400&fit=crop&q=80' },
  { id: 'release-radar', title: 'Release Radar', href: '/', color: '#509BF5', category: 'features', image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop&q=80' },
  { id: 'daily-mix', title: 'Daily Mix', href: '/', color: '#8D67AB', category: 'features', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=400&fit=crop&q=80' },
  { id: 'time-capsule', title: 'Time Capsule', href: '/', color: '#BA5D07', category: 'features', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&q=80' },
  { id: 'on-repeat', title: 'On Repeat', href: '/', color: '#E8115B', category: 'features', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop&q=80' },
  { id: 'repeat-rewind', title: 'Repeat Rewind', href: '/', color: '#1E3264', category: 'features', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop&q=80' },
  { id: 'top-songs', title: 'Your Top Songs', href: '/', color: '#FF4632', category: 'features', image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop&q=80' },
  { id: 'liked-songs', title: 'Liked Songs', href: '/collection?filter=liked', color: '#1DB954', category: 'features', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&q=80' },
  { id: 'recently-played', title: 'Recently Played', href: '/collection?filter=recent', color: '#509BF5', category: 'features', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=400&fit=crop&q=80' },
  { id: 'new-releases', title: 'New Releases', href: '/', color: '#FF4632', category: 'features', image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop&q=80' },
  { id: 'live-events', title: 'Live Events', href: '/events', color: '#8400E7', category: 'features', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop&q=80' },
  { id: 'radio', title: 'Radio Stations', href: '/radio', color: '#509BF5', category: 'features', image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400&h=400&fit=crop&q=80' },
  { id: 'live-broadcasts', title: 'Live Broadcasts', href: '/broadcasts', color: '#FF4632', category: 'features', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=400&fit=crop&q=80' },
  
  // Mental Health Features
  { id: 'mood', title: 'Mood Discovery', href: '/mood', color: '#E22134', category: 'mental-health', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&q=80' },
  { id: 'wellness', title: 'Mental Health Hub', href: '/wellness', color: '#457B9D', category: 'mental-health', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop&q=80' },
  { id: 'check-in', title: 'Daily Check-In', href: '/check-in', color: '#7209B7', category: 'mental-health', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=400&fit=crop&q=80' },
  { id: 'journal', title: 'Journal', href: '/journal', color: '#457B9D', category: 'mental-health', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop&q=80' },
  { id: 'affirmations', title: 'Affirmations', href: '/affirmations', color: '#E22134', category: 'mental-health', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop&q=80' },
  { id: 'mhz-sounds', title: 'MHz Sounds', href: '/categories/mhz', color: '#1DB954', category: 'mental-health', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&q=80' },
  { id: 'withdrawal', title: 'Withdrawal Sounds', href: '/categories/withdrawal', color: '#8D67AB', category: 'mental-health', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop&q=80' },
  
  // Artist Features
  { id: 'artist-dashboard', title: 'Artist Dashboard', href: '/dashboard/artist', color: '#8400E7', category: 'artist', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&q=80' },
  { id: 'upload', title: 'Upload Music', href: '/upload', color: '#1DB954', category: 'artist', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop&q=80' },
  { id: 'artist-signup', title: 'Become an Artist', href: '/artist/signup', color: '#E8115B', category: 'artist', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop&q=80' },
  { id: 'artist-interviews', title: 'Artist Interviews', href: '/interviews', color: '#8D67AB', category: 'artist', image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop&q=80' },
  
  // Store & Account
  { id: 'merch', title: 'Merch Store', href: '/merch', color: '#FF4632', category: 'store', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop&q=80' },
  { id: 'rewards', title: 'Rewards & Points', href: '/rewards', color: '#FFA500', category: 'store', image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=400&fit=crop&q=80' },
  { id: 'subscription', title: 'Subscription', href: '/subscription', color: '#1DB954', category: 'account', image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=400&fit=crop&q=80' },
  { id: 'settings', title: 'Settings', href: '/settings', color: '#B3B3B3', category: 'account', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=400&fit=crop&q=80' },
  { id: 'collection', title: 'Your Library', href: '/collection', color: '#1E3264', category: 'account', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop&q=80' },
  { id: 'profile', title: 'Profile', href: '/profile', color: '#BA5D07', category: 'account', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop&q=80' },
  { id: 'announcements', title: 'Announcements', href: '/announcements', color: '#E22134', category: 'account', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=400&fit=crop&q=80' },
  { id: 'newsletter', title: 'Newsletter', href: '/newsletters', color: '#509BF5', category: 'account', image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop&q=80' },
  
  // Lifestyle & Activity Categories
  { id: 'workout', title: 'Workout', color: '#E8115B', category: 'lifestyle', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop&q=80' },
  { id: 'focus', title: 'Focus', color: '#509BF5', category: 'lifestyle', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&q=80' },
  { id: 'study', title: 'Study', color: '#1E3264', category: 'lifestyle', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop&q=80' },
  { id: 'sleep', title: 'Sleep', color: '#8D67AB', category: 'lifestyle', image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=400&fit=crop&q=80' },
  { id: 'chill', title: 'Chill', color: '#1DB954', category: 'lifestyle', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop&q=80' },
  { id: 'travel', title: 'Travel', color: '#FF4632', category: 'lifestyle', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=400&fit=crop&q=80' },
  { id: 'party', title: 'Party', color: '#E8115B', category: 'lifestyle', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop&q=80' },
  { id: 'romance', title: 'Romance', color: '#E61E32', category: 'lifestyle', image: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400&h=400&fit=crop&q=80' },
  { id: 'commute', title: 'Commute', color: '#509BF5', category: 'lifestyle', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=400&fit=crop&q=80' },
  { id: 'gaming', title: 'Gaming', color: '#8D67AB', category: 'lifestyle', image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=400&fit=crop&q=80' },
  { id: 'cooking', title: 'Cooking', color: '#BA5D07', category: 'lifestyle', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=400&fit=crop&q=80' },
  { id: 'running', title: 'Running', color: '#E8115B', category: 'lifestyle', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop&q=80' },
  { id: 'yoga', title: 'Yoga', color: '#1DB954', category: 'lifestyle', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop&q=80' },
  { id: 'meditation', title: 'Meditation', color: '#8D67AB', category: 'lifestyle', image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=400&fit=crop&q=80' },
  { id: 'energy', title: 'Energy Boost', color: '#FF4632', category: 'lifestyle', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop&q=80' },
  { id: 'motivation', title: 'Motivation', color: '#FFA500', category: 'lifestyle', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=400&fit=crop&q=80' },
  { id: 'driving', title: 'Driving', color: '#509BF5', category: 'lifestyle', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=400&fit=crop&q=80' },
  { id: 'road-trip', title: 'Road Trip', color: '#148A08', category: 'lifestyle', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=400&fit=crop&q=80' },
  { id: 'morning', title: 'Morning', color: '#FFA500', category: 'lifestyle', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&q=80' },
  { id: 'evening', title: 'Evening', color: '#8D67AB', category: 'lifestyle', image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=400&fit=crop&q=80' },
  { id: 'night', title: 'Night', color: '#1E3264', category: 'lifestyle', image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=400&fit=crop&q=80' },
  
  // Additional Podcast Categories
  { id: 'comedy', title: 'Comedy', href: '/radio?filter=comedy', color: '#FFA500', category: 'podcasts', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=400&fit=crop&q=80' },
  { id: 'true-crime', title: 'True Crime', href: '/radio?filter=true-crime', color: '#1E3264', category: 'podcasts', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=400&fit=crop&q=80' },
  { id: 'business', title: 'Business', href: '/radio?filter=business', color: '#0D73EC', category: 'podcasts', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=400&fit=crop&q=80' },
  { id: 'education', title: 'Education', href: '/radio?filter=education', color: '#1DB954', category: 'podcasts', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop&q=80' },
  { id: 'news', title: 'News', href: '/radio?filter=news', color: '#BA5D07', category: 'podcasts', image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=400&fit=crop&q=80' },
  { id: 'technology', title: 'Technology', href: '/radio?filter=technology', color: '#509BF5', category: 'podcasts', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop&q=80' },
  { id: 'science', title: 'Science', href: '/radio?filter=science', color: '#0D73EC', category: 'podcasts', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop&q=80' },
  { id: 'history', title: 'History', href: '/radio?filter=history', color: '#BA5D07', category: 'podcasts', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=400&fit=crop&q=80' },
  { id: 'sports', title: 'Sports', href: '/radio?filter=sports', color: '#E61E32', category: 'podcasts', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop&q=80' },
  { id: 'entertainment', title: 'Entertainment', href: '/radio?filter=entertainment', color: '#E8115B', category: 'podcasts', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=400&fit=crop&q=80' },
  { id: 'society-culture', title: 'Society & Culture', href: '/radio?filter=society', color: '#8D67AB', category: 'podcasts', image: 'https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=400&h=400&fit=crop&q=80' },
  { id: 'health-fitness', title: 'Health & Fitness', href: '/radio?filter=health', color: '#1DB954', category: 'podcasts', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop&q=80' },
  { id: 'kids-family', title: 'Kids & Family', href: '/radio?filter=kids', color: '#FFA500', category: 'podcasts', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=400&fit=crop&q=80' },
  { id: 'religion', title: 'Religion & Spirituality', href: '/radio?filter=religion', color: '#8D67AB', category: 'podcasts', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop&q=80' },
  
  // Genre Mixes & Decades
  { id: 'pop-mix', title: 'Pop Mix', href: '/search?q=pop%20mix', color: '#8D67AB', category: 'genres', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop&q=80' },
  { id: 'hip-hop-mix', title: 'Hip-Hop Mix', href: '/search?q=hip%20hop%20mix', color: '#BA5D07', category: 'genres', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=400&fit=crop&q=80' },
  { id: 'rock-mix', title: 'Rock Mix', href: '/search?q=rock%20mix', color: '#E61E32', category: 'genres', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop&q=80' },
  { id: 'nineties', title: '90s', href: '/search?q=90s', color: '#FF4632', category: 'genres', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&q=80' },
  { id: '2000s', title: '2000s', href: '/search?q=2000s', color: '#509BF5', category: 'genres', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop&q=80' },
  { id: '2010s', title: '2010s', href: '/search?q=2010s', color: '#E8115B', category: 'genres', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop&q=80' },
  { id: '2020s', title: '2020s', href: '/search?q=2020s', color: '#509BF5', category: 'genres', image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop&q=80' },
  { id: 'eighties', title: '80s', href: '/search?q=80s', color: '#E8115B', category: 'genres', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop&q=80' },
  { id: 'seventies', title: '70s', href: '/search?q=70s', color: '#BA5D07', category: 'genres', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&q=80' },
  { id: 'sixties', title: '60s', href: '/search?q=60s', color: '#8D67AB', category: 'genres', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop&q=80' },
  { id: 'fifties', title: '50s', href: '/search?q=50s', color: '#1E3264', category: 'genres', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop&q=80' },
  
  // Additional Mental Health & Wellness
  { id: 'therapy-directory', title: 'Therapy Directory', href: '/wellness/therapy', color: '#457B9D', category: 'mental-health', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80' },
  { id: 'donations', title: 'Donate', href: '/wellness/donations', color: '#1DB954', category: 'mental-health', image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&h=400&fit=crop&q=80' },
  
  // Additional Artist Features
  { id: 'ai-marketing', title: 'AI Marketing Tools', href: '/dashboard/artist/marketing', color: '#8400E7', category: 'artist', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=400&fit=crop&q=80' },
  { id: 'payouts', title: 'Payouts & Earnings', href: '/dashboard/artist/payouts', color: '#1DB954', category: 'artist', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop&q=80' },
  { id: 'analytics', title: 'Analytics', href: '/dashboard/artist/analytics', color: '#509BF5', category: 'artist', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop&q=80' },
  
  // Device & Settings
  { id: 'devices', title: 'Devices', href: '/settings/devices', color: '#B3B3B3', category: 'account', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=400&fit=crop&q=80' },
  { id: 'privacy', title: 'Privacy Settings', href: '/settings/privacy', color: '#1E3264', category: 'account', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=400&fit=crop&q=80' },
  
  // Regional & World Music
  { id: 'bollywood', title: 'Bollywood', color: '#E8115B', category: 'music', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=400&fit=crop&q=80' },
  { id: 'arabic', title: 'Arabic', color: '#148A08', category: 'music', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=400&fit=crop&q=80' },
  { id: 'french', title: 'French', color: '#509BF5', category: 'music', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=400&fit=crop&q=80' },
  { id: 'spanish', title: 'Spanish', color: '#E61E32', category: 'music', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=400&fit=crop&q=80' },
  { id: 'brazilian', title: 'Brazilian', color: '#148A08', category: 'music', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=400&fit=crop&q=80' },
  { id: 'japanese', title: 'Japanese', color: '#E8115B', category: 'music', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=400&fit=crop&q=80' },
  
  // Holiday & Seasonal
  { id: 'christmas', title: 'Christmas', href: '/search?q=christmas', color: '#E61E32', category: 'genres', image: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=400&h=400&fit=crop&q=80' },
  { id: 'halloween', title: 'Halloween', href: '/search?q=halloween', color: '#8D67AB', category: 'genres', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&q=80' },
  { id: 'summer', title: 'Summer', href: '/search?q=summer', color: '#FFA500', category: 'genres', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop&q=80' },
  { id: 'winter', title: 'Winter', href: '/search?q=winter', color: '#509BF5', category: 'genres', image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=400&fit=crop&q=80' },
  
  // Additional Artist Features
  { id: 'tour-dates', title: 'Tour Dates', href: '/tours', color: '#8400E7', category: 'artist', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop&q=80' },
  { id: 'artist-merch', title: 'Artist Merch', href: '/merch/artists', color: '#FF4632', category: 'artist', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop&q=80' },
  { id: 'fan-insights', title: 'Fan Insights', href: '/dashboard/artist/fans', color: '#E8115B', category: 'artist', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop&q=80' },
  { id: 'collaborations', title: 'Collaborations', href: '/dashboard/artist/collaborations', color: '#8D67AB', category: 'artist', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&q=80' },
  
  // Additional Store Features
  { id: 'tickets', title: 'Concert Tickets', href: '/tickets', color: '#FF4632', category: 'store', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop&q=80' },
  { id: 'trials', title: 'Free Trials', href: '/trials', color: '#1DB954', category: 'store', image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=400&fit=crop&q=80' },
  
  // Innovative EmPulse Categories - Beyond Spotify
  { id: 'anxiety-relief', title: 'Anxiety Relief', href: '/categories/anxiety', color: '#457B9D', category: 'mental-health', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop&q=80' },
  { id: 'depression-support', title: 'Depression Support', href: '/categories/depression', color: '#7209B7', category: 'mental-health', image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=400&fit=crop&q=80' },
  { id: 'ptsd-healing', title: 'PTSD Healing', href: '/categories/ptsd', color: '#8D67AB', category: 'mental-health', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop&q=80' },
  { id: 'addiction-recovery', title: 'Addiction Recovery', href: '/categories/recovery', color: '#1DB954', category: 'mental-health', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop&q=80' },
  { id: 'grief-support', title: 'Grief Support', href: '/categories/grief', color: '#1E3264', category: 'mental-health', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop&q=80' },
  { id: 'trauma-healing', title: 'Trauma Healing', href: '/categories/trauma', color: '#457B9D', category: 'mental-health', image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=400&fit=crop&q=80' },
  
  // More Lifestyle Activities
  { id: 'pre-game', title: 'Pre-Game', color: '#E8115B', category: 'lifestyle', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop&q=80' },
  { id: 'post-game', title: 'Post-Game', color: '#1DB954', category: 'lifestyle', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop&q=80' },
  { id: 'pre-party', title: 'Pre-Party', color: '#E8115B', category: 'lifestyle', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop&q=80' },
  { id: 'post-party', title: 'Post-Party', color: '#8D67AB', category: 'lifestyle', image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=400&fit=crop&q=80' },
  { id: 'afternoon', title: 'Afternoon', color: '#FFA500', category: 'lifestyle', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&q=80' },
  
  // More Music Genres
  { id: 'dubstep', title: 'Dubstep', color: '#509BF5', category: 'music', image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&h=400&fit=crop&q=80' },
  { id: 'drill', title: 'Drill', color: '#BA5D07', category: 'music', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=400&fit=crop&q=80' },
  { id: 'trance', title: 'Trance', color: '#509BF5', category: 'music', image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&h=400&fit=crop&q=80' },
  { id: 'ambient', title: 'Ambient', color: '#8D67AB', category: 'music', image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=400&fit=crop&q=80' },
  { id: 'drum-bass', title: 'Drum & Bass', color: '#509BF5', category: 'music', image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&h=400&fit=crop&q=80' },
  { id: 'garage', title: 'Garage', color: '#8D67AB', category: 'music', image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&h=400&fit=crop&q=80' },
  { id: 'singer-songwriter', title: 'Singer-Songwriter', color: '#148A08', category: 'music', image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=400&fit=crop&q=80' },
  { id: 'bluegrass', title: 'Bluegrass', color: '#148A08', category: 'music', image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=400&fit=crop&q=80' },
  { id: 'americana', title: 'Americana', color: '#D84000', category: 'music', image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=400&fit=crop&q=80' },
  { id: 'celtic', title: 'Celtic', color: '#148A08', category: 'music', image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=400&fit=crop&q=80' },
  
  // More Regional
  { id: 'turkish', title: 'Turkish', color: '#E61E32', category: 'music', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=400&fit=crop&q=80' },
  { id: 'german', title: 'German', color: '#1E3264', category: 'music', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=400&fit=crop&q=80' },
  { id: 'italian', title: 'Italian', color: '#E61E32', category: 'music', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=400&fit=crop&q=80' },
  { id: 'chinese', title: 'Chinese', color: '#E61E32', category: 'music', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=400&fit=crop&q=80' },
  
  // More Features
  { id: 'trending', title: 'Trending Now', href: '/trending', color: '#FF4632', category: 'features', image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop&q=80' },
  { id: 'charts', title: 'Charts', href: '/charts', color: '#E8115B', category: 'features', image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop&q=80' },
  { id: 'viral', title: 'Viral Hits', href: '/viral', color: '#1DB954', category: 'features', image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop&q=80' },
  { id: 'fresh-finds', title: 'Fresh Finds', href: '/fresh', color: '#509BF5', category: 'features', image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop&q=80' },
  { id: 'underground', title: 'Underground', href: '/underground', color: '#1E3264', category: 'features', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&q=80' },
  
  // More Account Features
  { id: 'playback-history', title: 'Playback History', href: '/history', color: '#509BF5', category: 'account', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=400&fit=crop&q=80' },
  { id: 'downloads', title: 'Downloads', href: '/collection?filter=downloaded', color: '#1DB954', category: 'account', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop&q=80' },
  { id: 'social', title: 'Social', href: '/social', color: '#509BF5', category: 'account', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=400&fit=crop&q=80' },
  { id: 'friends-activity', title: 'Friends Activity', href: '/friends', color: '#8D67AB', category: 'account', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop&q=80' },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'music' | 'podcasts' | 'audiobooks'>('all');
  const { addSearch } = useSearchStore();
  const { setCurrentTrack, setIsPlaying, currentTrack, isPlaying } = usePlayerStore();
  
  // Sync query from URL search params
  useEffect(() => {
    const urlQuery = searchParams.get('q') || '';
    setQuery(urlQuery);
  }, [searchParams]);
  
  const tracks = mockData.getTracks();
  const artists = mockData.getArtists();
  const playlists = mockData.getPlaylists();
  const albums = mockData.getAlbums();

  const filteredTracks = tracks.filter(track =>
    track.name.toLowerCase().includes(query.toLowerCase()) ||
    track.artist.toLowerCase().includes(query.toLowerCase())
  );

  const filteredArtists = artists.filter(artist =>
    artist.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPlaylists = playlists.filter(playlist =>
    playlist.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredAlbums = albums.filter(album =>
    album.name.toLowerCase().includes(query.toLowerCase()) ||
    album.artist.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      addSearch(query);
    }
  };

  // Organize categories by section - ordered by user priority (most used first)
  const categorySections = {
    // 1. Most Common - Personalized Discovery & Quick Access
    'quick-access': browseCategories.filter(c => 
      ['made-for-you', 'discover-weekly', 'release-radar', 'daily-mix', 'liked-songs', 'recently-played', 'on-repeat', 'top-songs', 'new-releases'].includes(c.id)
    ),
    // 2. Music Genres - Core listening
    music: browseCategories.filter(c => 
      c.category === 'music' && !['bollywood', 'arabic', 'french', 'spanish', 'brazilian', 'japanese', 'turkish', 'german', 'italian', 'chinese'].includes(c.id)
    ),
    // 3. Lifestyle Activities - Daily use
    lifestyle: browseCategories.filter(c => c.category === 'lifestyle'),
    // 4. Genre Mixes & Decades - Discovery
    genres: browseCategories.filter(c => c.category === 'genres'),
    // 5. Mental Health & Wellness - EmPulse Core Features (excluding mood, which is separate)
    'mental-health': browseCategories.filter(c => c.category === 'mental-health' && c.id !== 'mood'),
    // 6. Mood Discovery - EmPulse Unique Feature (highlighted separately)
    mood: browseCategories.filter(c => c.id === 'mood'),
    // 7. Podcasts & Audio Content
    podcasts: browseCategories.filter(c => c.category === 'podcasts'),
    // 8. Regional & World Music
    regional: browseCategories.filter(c => 
      ['bollywood', 'arabic', 'french', 'spanish', 'brazilian', 'japanese', 'turkish', 'german', 'italian', 'chinese', 'world'].includes(c.id)
    ),
    // 9. Features - Additional Discovery
    features: browseCategories.filter(c => 
      c.category === 'features' && !['discover-weekly', 'release-radar', 'daily-mix', 'liked-songs', 'recently-played', 'on-repeat', 'top-songs', 'new-releases', 'made-for-you'].includes(c.id)
    ),
    // 10. For Artists - Artist Tools
    artist: browseCategories.filter(c => c.category === 'artist'),
    // 11. Store & Rewards - Monetization
    store: browseCategories.filter(c => c.category === 'store'),
    // 12. Account & Settings - Less frequent
    account: browseCategories.filter(c => c.category === 'account'),
  };

  const sectionTitles: Record<keyof typeof categorySections, string> = {
    'quick-access': 'Made For You',
    music: 'Music Genres',
    lifestyle: 'Lifestyle & Activities',
    genres: 'Genre Mixes, Decades & Seasonal',
    'mental-health': 'Mental Health & Wellness',
    mood: 'Mood Discovery',
    podcasts: 'Podcasts & Shows',
    regional: 'World & Regional Music',
    features: 'Discovery & Trending',
    artist: 'For Artists',
    store: 'Store & Rewards',
    account: 'Account & Settings',
  };

  // Browse All View (No Search Query)
  if (!query) {
    return (
      <div 
        className="min-h-screen"
        style={{ 
          backgroundColor: '#121212',
          minHeight: '100vh'
        }}
      >
        {/* Filter Buttons - Sticky below TopBar - Exact Spotify Style */}
        <div 
          className="sticky top-16 z-30 backdrop-blur-md px-8 py-4 border-b"
          style={{
            top: '56px',
            backgroundColor: 'rgba(18, 18, 18, 0.95)',
            padding: '16px 32px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div 
            className="flex items-center gap-2"
            style={{ gap: '8px' }}
          >
            <button
              onClick={() => setActiveFilter('all')}
              className={cn(
                "rounded-full font-medium transition-colors",
                activeFilter === 'all'
                  ? 'bg-white text-black hover:bg-[#f5f5f5]'
                  : 'bg-transparent text-spotify-text-gray hover:text-white hover:bg-white/10'
              )}
              style={{
                padding: '6px 16px',
                borderRadius: '500px',
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                transition: 'all 200ms ease-out'
              }}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('music')}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                activeFilter === 'music'
                  ? 'bg-white text-black hover:bg-[#f5f5f5]'
                  : 'bg-transparent text-spotify-text-gray hover:text-white hover:bg-white/10'
              )}
            >
              Music
            </button>
            <button
              onClick={() => setActiveFilter('podcasts')}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                activeFilter === 'podcasts'
                  ? 'bg-white text-black hover:bg-[#f5f5f5]'
                  : 'bg-transparent text-spotify-text-gray hover:text-white hover:bg-white/10'
              )}
            >
              Podcasts
            </button>
            <button
              onClick={() => setActiveFilter('audiobooks')}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                activeFilter === 'audiobooks'
                  ? 'bg-white text-black hover:bg-[#f5f5f5]'
                  : 'bg-transparent text-spotify-text-gray hover:text-white hover:bg-white/10'
              )}
            >
              Audiobooks
            </button>
          </div>
        </div>
        
        <div className="p-8">
          <div className="space-y-12">
          {Object.entries(categorySections).map(([sectionKey, categories]) => {
            if (categories.length === 0) return null;
            return (
              <section key={sectionKey} className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">{sectionTitles[sectionKey as keyof typeof sectionTitles]}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={category.href || '#'}
                      className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
                    >
                      {/* Background Image with Overlay */}
                      <div className="absolute inset-0">
                        {category.image ? (
                          <>
                            <Image
                              src={category.image}
                              alt={category.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover"
                            />
                            <div 
                              className="absolute inset-0 opacity-80"
                              style={{ backgroundColor: category.color }}
                            />
                          </>
                        ) : (
                          <div
                            className="w-full h-full"
                            style={{ backgroundColor: category.color }}
                          />
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                        <h3 className="text-2xl font-bold text-white leading-tight">
                          {category.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
          </div>
        </div>
      </div>
    );
  }

  // Search Results View
  return (
    <div className="min-h-screen bg-spotify-dark">
      {/* Filter Buttons - Sticky below TopBar */}
      <div className="sticky top-16 z-30 bg-spotify-dark/95 backdrop-blur-md px-8 py-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
              activeFilter === 'all'
                ? 'bg-white text-black hover:bg-[#f5f5f5]'
                : 'bg-transparent text-spotify-text-gray hover:text-white hover:bg-white/10'
            )}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter('music')}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
              activeFilter === 'music'
                ? 'bg-white text-black hover:bg-[#f5f5f5]'
                : 'bg-transparent text-spotify-text-gray hover:text-white hover:bg-white/10'
            )}
          >
            Music
          </button>
          <button
            onClick={() => setActiveFilter('podcasts')}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
              activeFilter === 'podcasts'
                ? 'bg-white text-black hover:bg-[#f5f5f5]'
                : 'bg-transparent text-spotify-text-gray hover:text-white hover:bg-white/10'
            )}
          >
            Podcasts
          </button>
          <button
            onClick={() => setActiveFilter('audiobooks')}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
              activeFilter === 'audiobooks'
                ? 'bg-white text-black hover:bg-[#f5f5f5]'
                : 'bg-transparent text-spotify-text-gray hover:text-white hover:bg-white/10'
            )}
          >
            Audiobooks
          </button>
        </div>
      </div>

      <div 
        className="p-8"
        style={{
          padding: '32px',
          backgroundColor: '#121212'
        }}
      >
        {/* Songs - Exact Spotify Style */}
        {filteredTracks.length > 0 && (
            <section className="mb-8" style={{ marginBottom: '32px' }}>
              <h2 
                className="text-2xl font-bold mb-4 text-white"
                style={{
                  fontSize: '24px',
                  lineHeight: '28px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '16px'
                }}
              >
                Songs
              </h2>
              <div 
                className="space-y-2"
                style={{ gap: '8px' }}
              >
                {filteredTracks.map((track) => (
                  <div
                    key={track.id}
                    className="flex items-center gap-4 p-3 hover:bg-white/10 rounded-lg group cursor-pointer"
                    style={{
                      gap: '16px',
                      padding: '12px 16px',
                      borderRadius: '4px',
                      transition: 'background-color 200ms ease-out'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <div 
                      className="w-12 h-12 bg-spotify-dark-gray rounded flex-shrink-0"
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '4px',
                        backgroundColor: '#282828'
                      }}
                    >
                      {track.coverArt && (
                        <img 
                          src={track.coverArt} 
                          alt={track.name} 
                          className="w-full h-full object-cover rounded"
                          style={{ borderRadius: '4px' }}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div 
                        className="font-medium text-white truncate"
                        style={{
                          fontSize: '14px',
                          lineHeight: '20px',
                          fontWeight: 400,
                          color: '#FFFFFF'
                        }}
                      >
                        {track.name}
                      </div>
                      <div 
                        className="text-sm text-spotify-text-gray truncate"
                        style={{
                          fontSize: '13px',
                          lineHeight: '16px',
                          color: '#B3B3B3'
                        }}
                      >
                        {track.artist}
                      </div>
                    </div>
                    <div 
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        transition: 'opacity 200ms ease-out'
                      }}
                    >
                      <PlayButton
                        isPlaying={currentTrack?.id === track.id && isPlaying}
                        onClick={() => {
                          setCurrentTrack(track);
                          setIsPlaying(true);
                        }}
                        size="sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
        )}

        {/* Artists - Exact Spotify Style */}
        {filteredArtists.length > 0 && (
            <section className="mb-8" style={{ marginBottom: '32px' }}>
              <h2 
                className="text-2xl font-bold mb-4 text-white"
                style={{
                  fontSize: '24px',
                  lineHeight: '28px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '16px'
                }}
              >
                Artists
              </h2>
              <div 
                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
                style={{ gap: '16px' }}
              >
                {filteredArtists.map((artist) => (
                  <Link
                    key={artist.id}
                    href={`/artist/${artist.id}`}
                    className="text-center group"
                    style={{ textDecoration: 'none' }}
                  >
                    <div 
                      className="w-full aspect-square rounded-full overflow-hidden mb-3 group-hover:scale-105 transition-transform"
                      style={{
                        marginBottom: '12px',
                        aspectRatio: '1',
                        transition: 'transform 200ms ease-out'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      {artist.image ? (
                        <img 
                          src={artist.image} 
                          alt={artist.name} 
                          className="w-full h-full object-cover"
                          style={{ borderRadius: '50%' }}
                        />
                      ) : (
                        <div 
                          className="w-full h-full bg-spotify-light-gray flex items-center justify-center"
                          style={{
                            backgroundColor: '#282828',
                            borderRadius: '50%'
                          }}
                        >
                          <span 
                            className="text-2xl"
                            style={{
                              fontSize: '24px',
                              lineHeight: '28px',
                              fontWeight: 700,
                              color: '#FFFFFF'
                            }}
                          >
                            {artist.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 
                      className="font-semibold text-white hover:underline truncate"
                      style={{
                        fontSize: '14px',
                        lineHeight: '20px',
                        fontWeight: 600,
                        color: '#FFFFFF'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                      onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                    >
                      {artist.name}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>
        )}

        {/* Playlists - Exact Spotify Style */}
        {filteredPlaylists.length > 0 && (
            <section className="mb-8" style={{ marginBottom: '32px' }}>
              <h2 
                className="text-2xl font-bold mb-4 text-white"
                style={{
                  fontSize: '24px',
                  lineHeight: '28px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '16px'
                }}
              >
                Playlists
              </h2>
              <div 
                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
                style={{ gap: '16px' }}
              >
                {filteredPlaylists.map((playlist) => (
                  <Link
                    key={playlist.id}
                    href={`/playlist/${playlist.id}`}
                    className="bg-spotify-light-gray rounded-lg p-4 hover:bg-spotify-dark-gray transition-all duration-200 group"
                    style={{
                      backgroundColor: '#181818',
                      borderRadius: '8px',
                      padding: '16px',
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
                      className="w-full aspect-square rounded mb-3 overflow-hidden"
                      style={{
                        borderRadius: '4px',
                        aspectRatio: '1',
                        marginBottom: '12px'
                      }}
                    >
                      {playlist.coverArt ? (
                        <img 
                          src={playlist.coverArt} 
                          alt={playlist.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          style={{
                            borderRadius: '4px',
                            transition: 'transform 200ms ease-out'
                          }}
                        />
                      ) : (
                        <div 
                          className="w-full h-full bg-gradient-to-br from-spotify-green to-spotify-dark-gray flex items-center justify-center"
                          style={{
                            background: 'linear-gradient(135deg, #1DB954 0%, #181818 100%)',
                            borderRadius: '4px'
                          }}
                        >
                          <span className="text-4xl" style={{ fontSize: '32px' }}>🎵</span>
                        </div>
                      )}
                    </div>
                    <h3 
                      className="font-semibold text-sm text-white truncate"
                      style={{
                        fontSize: '14px',
                        lineHeight: '20px',
                        fontWeight: 600,
                        color: '#FFFFFF'
                      }}
                    >
                      {playlist.name}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>
        )}

        {/* Albums - Exact Spotify Style */}
        {filteredAlbums.length > 0 && (
            <section className="mb-8" style={{ marginBottom: '32px' }}>
              <h2 
                className="text-2xl font-bold mb-4 text-white"
                style={{
                  fontSize: '24px',
                  lineHeight: '28px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '16px'
                }}
              >
                Albums
              </h2>
              <div 
                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
                style={{ gap: '16px' }}
              >
                {filteredAlbums.map((album) => (
                  <Link
                    key={album.id}
                    href={`/album/${album.id}`}
                    className="bg-spotify-light-gray rounded-lg p-4 hover:bg-spotify-dark-gray transition-all duration-200 group"
                    style={{
                      backgroundColor: '#181818',
                      borderRadius: '8px',
                      padding: '16px',
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
                      className="w-full aspect-square rounded mb-3 overflow-hidden"
                      style={{
                        borderRadius: '4px',
                        aspectRatio: '1',
                        marginBottom: '12px'
                      }}
                    >
                      {album.coverArt ? (
                        <img 
                          src={album.coverArt} 
                          alt={album.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          style={{
                            borderRadius: '4px',
                            transition: 'transform 200ms ease-out'
                          }}
                        />
                      ) : (
                        <div 
                          className="w-full h-full bg-gradient-to-br from-spotify-green to-spotify-dark-gray flex items-center justify-center"
                          style={{
                            background: 'linear-gradient(135deg, #1DB954 0%, #181818 100%)',
                            borderRadius: '4px'
                          }}
                        >
                          <span className="text-4xl" style={{ fontSize: '32px' }}>💿</span>
                        </div>
                      )}
                    </div>
                    <h3 
                      className="font-semibold text-sm text-white truncate"
                      style={{
                        fontSize: '14px',
                        lineHeight: '20px',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        marginBottom: '4px'
                      }}
                    >
                      {album.name}
                    </h3>
                    <p 
                      className="text-xs text-spotify-text-gray truncate"
                      style={{
                        fontSize: '13px',
                        lineHeight: '16px',
                        color: '#B3B3B3'
                      }}
                    >
                      {album.artist.name}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

        {filteredTracks.length === 0 && filteredArtists.length === 0 && filteredPlaylists.length === 0 && filteredAlbums.length === 0 && (
          <div className="text-center py-16">
            <p className="text-spotify-text-gray text-lg">No results found for &quot;{query}&quot;</p>
          </div>
        )}
      </div>
    </div>
  );
}
