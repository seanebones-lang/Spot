# Spotify Features Missing in EmPulse - Complete Audit List

**Last Updated:** January 15, 2026  
**Total Missing Features:** ~85+ features/components  
**Status:** Organized by priority for systematic implementation

---

## 📋 **IMPLEMENTATION PRIORITY**

### **Priority 1 - Critical for Spotify Parity** (Start Here)
1. ✅ Context menus (3-dots) everywhere
2. ✅ Individual Shuffle/Play buttons  
3. ✅ Search within library
4. ✅ Library filters/sorting & view modes (Grid/List/Compact)
5. ✅ Playlist editing (cover art, description, privacy)
6. ✅ Drag & drop reordering
7. ✅ Track controls (Like, Hide, Snooze)
8. ✅ Lyrics view
9. ✅ Friends Activity sidebar widget
10. ✅ Share features

### **Priority 2 - Important for UX**
- Queue enhancements (Autoplay, Smart Shuffle)
- Playback stats/analytics
- Device management UI
- Keyboard shortcuts panel
- Podcast-specific features
- Ad system components

### **Priority 3 - Nice to Have**
- Full-screen mode
- Miniplayer
- Visualizer
- Equalizer
- Advanced sharing options

---

## 🚨 **CRITICAL UI/UX FEATURES**

### 1. **Library View Modes** ❌ MISSING
- **Compact View** - Sidebar/library shows only icons/text, no album art
- **Grid View** - Large artwork thumbnails for playlists/albums
- **List View** - Text-based list with small cover art
- **Toggle between views** - Button/dropdown to switch modes

### 2. **Playlist/Album Management** ❌ MISSING
- **Drag & Drop reordering** - Reorder songs within playlists
- **Pin playlists** - Pin favorites to top of library sidebar
- **Edit playlist cover art** - Change cover image from playlist page
- **Edit playlist details** - Title, description, privacy settings
- **Delete playlist** - With confirmation dialog
- **Duplicate playlist** - Copy existing playlist
- **Sort options** - Sort tracks by title, artist, date added, duration
- **Filter tracks** - Search within playlist/album

### 3. **Context Menus (3-Dots)** ⚠️ PARTIAL
- **Track context menu** - Right-click or 3-dots on track rows
  - Add to playlist
  - Show artist page
  - Show album page
  - Remove from playlist
  - Save to library
  - Hide song
  - Copy link
- **Playlist context menu** - Right-click on playlists
  - Rename
  - Delete
  - Duplicate
  - Share
  - Make collaborative
- **Album context menu**
- **Artist context menu**

### 4. **Individual Shuffle/Play Buttons** ❌ MISSING
- **Separate Shuffle and Play buttons** at top of playlist/album pages (Spotify 2022 update)
- Currently: Single play button that shuffles
- Needed: Two distinct buttons - "Shuffle Play" and "Play" (normal order)

### 5. **Queue Management** ⚠️ PARTIAL
- **Queue panel** - ✅ We have this
- **Autoplay toggle** - Turn on/off automatic similar songs
- **Smart Shuffle toggle** - AI-enhanced shuffle mode
- **Remove from queue** - Individual track removal
- **Clear queue** - Remove all queued tracks
- **Save queue as playlist** - Convert current queue to playlist
- **Reorder queue** - Drag to reorder queued tracks

### 6. **Now Playing View Enhancements** ❌ MISSING
- **Lyrics view** - Full-screen or sidebar lyrics display
- **Song credits** - ✅ We have this partially
- **Artist biography** - Expandable bio section
- **Tour dates** - Upcoming concerts for current artist
- **Merch links** - Merchandise for current artist
- **Similar artists** - Recommendations based on current track
- **Track transcripts** - For podcasts/audiobooks

### 7. **Library Filters & Search** ❌ MISSING
- **Search within library** - Filter saved content only
- **Smart filters** - Sort by mood, genre, activity (Spotify 2025 feature)
- **Date filters** - Recently added, recently played
- **Type filters** - Music only, Podcasts only, Audiobooks only
- **Grid/List toggle** - Switch view modes in library
- **Sort by** - Alphabetical, date added, artist, recently played

### 8. **Friends Activity** ⚠️ PARTIAL
- **Friends Activity sidebar** - ✅ We have `/friends` page
- **Real-time listening activity** - Live feed of what friends are playing
- **Toggle visibility** - Show/hide friends activity (icon in top bar)
- **Click to listen** - Join what friend is listening to

### 9. **Playback Features** ⚠️ PARTIAL
- **Crossfade** - ✅ We have setting, need to implement in player
- **Gapless playback** - Seamless track transitions
- **Normalize volume** - Automatic volume leveling
- **Explicit content filter** - Toggle explicit song filtering
- **Private session** - Hide listening activity temporarily

### 10. **Track Controls** ❌ MISSING
- **Snooze track** - Temporarily hide from recommendations (30 days)
- **Hide song** - Permanently hide from playlists/recommendations
- **Don't play this artist** - Block specific artist
- **Like/Unlike** - Heart button on tracks (currently just play)
- **Show credits** - Quick access to song credits
- **Copy song link** - Share track URL

### 11. **Keyboard Shortcuts** ⚠️ PARTIAL
- **Keyboard shortcuts panel** - Help modal showing all shortcuts
- **Space = Play/Pause** - Standard music player shortcut
- **Arrow keys for seek** - Left/Right to jump 10 seconds
- **J/K for previous/next** - Spotify standard shortcuts
- **L to like** - Toggle like on current track
- **M to mute** - Quick mute toggle

### 12. **Playlist Creation & Editing** ❌ MISSING
- **"Create Playlist" button** - Prominent in library sidebar
- **Collaborative playlists** - Multiple users can edit
- **Playlist description editor** - Rich text description
- **Playlist privacy settings** - Public/Private/Unlisted
- **Playlist cover art upload** - Custom image upload
- **Playlist sorting** - Order playlists in sidebar

### 13. **Album View** ⚠️ PARTIAL
- **Full album page** - ✅ We have this
- **Album shuffle play** - Shuffle all album tracks
- **Add to playlist from album** - Bulk add tracks
- **Album credits** - Detailed credits page
- **Album reviews** - User reviews/ratings

### 14. **Artist View** ⚠️ PARTIAL
- **Artist page** - ✅ We have this
- **Follow/Unfollow button** - With follower count
- **Artist radio** - Create radio station from artist
- **Popular releases** - Top tracks/albums
- **Artist playlists** - Curated playlists by artist
- **On tour** - Tour dates widget
- **Merchandise** - Merch links/widget

### 15. **Search Enhancements** ⚠️ PARTIAL
- **Search filters** - ✅ We have All/Music/Podcasts/Audiobooks
- **Recent searches** - Show search history
- **Voice search** - Microphone button for voice input
- **Search suggestions** - Autocomplete dropdown
- **Search within results** - Filter search results further

### 16. **Settings & Preferences** ⚠️ PARTIAL
- **Settings pages** - ✅ We have structure
- **Audio quality settings** - ✅ We have this
- **Download quality** - Separate setting for offline
- **Storage management** - See/downloaded content size
- **Cache management** - Clear cache option
- **Streaming quality** - Auto/High/Very High
- **Social features toggle** - Enable/disable social aspects
- **Data saver mode** - Reduce data usage

### 17. **Download/Offline Features** ⚠️ PARTIAL
- **Downloads page** - ✅ We have this
- **Download playlist** - Make playlist available offline
- **Download quality selection** - Before downloading
- **Storage usage indicator** - How much space used
- **Auto-download** - Automatically download new releases
- **Download limits** - Set max storage for downloads

### 18. **Share Features** ❌ MISSING
- **Share track** - Copy link, social media share
- **Share playlist** - Generate shareable link
- **Share album** - Share album link
- **Embed player** - Generate embed code for websites
- **QR code** - Generate QR for mobile sharing
- **Share to social** - Direct share buttons (Twitter, Facebook, etc.)

### 19. **Podcast Features** ⚠️ PARTIAL
- **Podcast episodes list** - Episode-by-episode view
- **Podcast subscriptions** - Subscribe to podcast feeds
- **Download episodes** - Individual episode downloads
- **Playback speed** - 0.5x, 1x, 1.25x, 1.5x, 2x
- **Skip silence** - Automatically skip dead air
- **Sleep timer** - Auto-stop after X minutes
- **Episode transcripts** - Read-along transcripts

### 20. **Audiobook Features** ❌ MISSING
- **Audiobook player** - Specialized player with chapters
- **Chapter navigation** - Jump to specific chapters
- **Bookmarking** - Save specific locations
- **Sleep timer** - Auto-pause after set time
- **Playback speed** - Adjust narration speed

### 21. **Visual/Accessibility** ❌ MISSING
- **Full-screen mode** - Maximize player with artwork
- **Miniplayer mode** - Floating window (PIP)
- **Dark/Light theme toggle** - Theme switcher
- **High contrast mode** - Accessibility option
- **Font size adjustment** - Larger text option
- **Color blind mode** - Color adjustments

### 22. **Notifications** ⚠️ PARTIAL
- **Settings page** - ✅ We have structure
- **Email notification preferences** - Granular toggles
- **Push notifications** - Desktop notifications
- **New release notifications** - Artist releases
- **Playlist updates** - When collaborative playlists change
- **Friend activity** - When friends follow/listen

### 23. **Social Features** ⚠️ PARTIAL
- **Friends list** - ✅ We have `/friends` page
- **Follow users** - Follow other users
- **User profiles** - View other users' public profiles
- **Shared playlists** - See playlists shared with you
- **Activity feed** - Friends' listening activity timeline
- **Collaborative playlists** - Multiple editors

### 24. **Premium Features** ❌ MISSING
- **Premium badge** - Visual indicator in UI
- **Premium-only playlists** - Gated content
- **HiFi indicator** - Lossless quality badge
- **Premium benefits page** - What you get with Premium
- **Upgrade prompts** - CTAs throughout app for free users

### 25. **Ad System** ❌ MISSING (CRITICAL)
- **Ad banner component** - In home feed
- **Interstitial ads** - Between tracks (free tier)
- **Audio ads** - Spoken advertisements
- **Video ads** - Visual ads with audio
- **Skip ad button** - After 30 seconds (free)
- **Ad-free toggle** - Premium indicator

### 26. **Collection/Library Features** ⚠️ PARTIAL
- **Liked Songs playlist** - ✅ Auto-generated from likes
- **Recently played section** - ✅ We have `/history`
- **Top tracks this month** - Statistics/analytics
- **Saved albums** - Separate from playlists
- **Saved artists** - Followed artists collection
- **Saved podcasts** - Subscribed podcasts
- **Local files** - Upload personal music files

### 27. **Playlist Pages** ⚠️ PARTIAL
- **Playlist cover art** - ✅ We have this
- **Playlist owner info** - ✅ We have this
- **Playlist description** - May need richer editor
- **Playlist stats** - Total tracks, duration, followers
- **Make collaborative** - Enable multi-user editing
- **Download playlist** - Offline access
- **Sort tracks** - By title, artist, date added, etc.

### 28. **Navigation & Breadcrumbs** ⚠️ PARTIAL
- **Back/Forward buttons** - Browser-style navigation in TopBar
- **Breadcrumb navigation** - Show current location path
- **Recent pages** - Quick access to recently visited
- **Quick navigation** - Keyboard shortcuts for pages

### 29. **Help & Support** ✅ COMPLETE
- **Help page** - ✅ `/help`
- **Chat support** - ✅ `/support` (xAI Grok ready)
- **FAQ sections** - ✅ We have categories
- **Contact options** - ✅ Available

### 30. **Mobile Sync Features** ❌ MISSING
- **Connect device** - See what's playing on other devices
- **Remote control** - Control other devices from web
- **Device list** - All connected devices
- **Transfer playback** - Move playback to different device
- **Device icon** - Shows current playback device

### 31. **Playback Stats** ❌ MISSING
- **Year in review** - Annual listening statistics
- **Listening time** - Total hours this week/month
- **Top genres** - Most listened genres
- **Top artists** - Most played artists
- **Top tracks** - Most played songs
- **Streak tracking** - Consecutive days listening (different from check-in)

### 32. **Content Discovery** ⚠️ PARTIAL
- **Made for You** - ✅ We have this concept
- **Daily Mixes** - ✅ Referenced in browse
- **Release Radar** - ✅ Referenced
- **Discover Weekly** - ✅ Referenced
- **Time Capsule** - ✅ Referenced
- **On Repeat** - ✅ Referenced
- **Tastebreakers** - New genres discovery playlist
- **Blend playlists** - Merge with friend's taste

### 33. **Player Bar Enhancements** ⚠️ PARTIAL
- **Volume slider** - ✅ We have this
- **Mute button** - Quick mute toggle
- **Lyrics button** - Toggle lyrics display
- **Queue button** - ✅ We have this
- **Full-screen toggle** - Expand player view
- **Device selector** - Choose output device
- **Quality indicator** - Show current quality
- **Explicit indicator** - "E" badge for explicit content

### 34. **Context Menus (Right-Click)** ❌ MISSING
- **Track right-click menu** - Full context menu
- **Playlist right-click** - Playlist actions
- **Album right-click** - Album actions
- **Artist right-click** - Artist actions
- **Customizable menu** - User preferences for menu items

### 35. **Drag & Drop** ❌ MISSING
- **Reorder playlist tracks** - Drag songs to reorder
- **Add to queue** - Drag track to queue
- **Add to playlist** - Drag track to playlist sidebar item
- **Reorder playlists** - Drag playlists in sidebar
- **Visual feedback** - Highlight drop zones

### 36. **Search Bar Enhancements** ⚠️ PARTIAL
- **Search suggestions** - Autocomplete dropdown
- **Recent searches** - Quick access dropdown
- **Voice search** - Microphone button
- **Filter in search** - Already in results view
- **Search shortcuts** - Keyboard shortcuts for search focus

### 37. **Collection Page** ⚠️ PARTIAL
- **Filter tabs** - Music/Podcasts/Audiobooks - ✅ We have this
- **View modes** - Grid/List/Compact - ❌ Missing
- **Sort options** - Alphabetical, Recently added - ❌ Missing
- **Search in library** - Filter saved content - ❌ Missing
- **Create playlist button** - Prominent CTA - ❌ Missing

### 38. **Empty States** ⚠️ PARTIAL
- **Empty playlist state** - "Add songs to get started"
- **Empty library state** - "Start building your collection"
- **Empty search results** - "Try different keywords"
- **No internet state** - "Check your connection"
- **Loading skeletons** - Better loading states

### 39. **Error Handling** ⚠️ PARTIAL
- **404 pages** - ✅ We have `/not-found`
- **Error boundaries** - May need React error boundaries
- **Retry buttons** - For failed requests
- **Error messages** - User-friendly error states
- **Offline mode** - Graceful degradation

### 40. **Advanced Features** ❌ MISSING
- **Equalizer** - Audio EQ controls
- **Visualizer** - Audio visualizations
- **Sleep timer** - Auto-stop playback
- **Crossfade** - ✅ Setting exists, needs implementation
- **Gapless playback** - Seamless transitions
- **Loudness normalization** - Consistent volume levels

---

## 📊 **SUMMARY**

**Total Missing: ~85+ features/components**

**Priority 1 (Critical for Spotify parity):**
1. Context menus (3-dots) everywhere
2. Drag & drop reordering
3. View mode toggles (Grid/List/Compact)
4. Individual Shuffle/Play buttons
5. Search within library
6. Library filters/sorting
7. Snooze/Hide tracks
8. Playlist editing (cover art, description, privacy)
9. Friends Activity sidebar widget
10. Lyrics view

**Priority 2 (Important for UX):**
1. Queue enhancements (Autoplay, Smart Shuffle)
2. Share features (links, social media)
3. Playback stats/analytics
4. Device management UI
5. Keyboard shortcuts panel
6. Podcast-specific features
7. Ad system components

**Priority 3 (Nice to have):**
1. Full-screen mode
2. Miniplayer
3. Visualizer
4. Equalizer
5. Advanced sharing options
