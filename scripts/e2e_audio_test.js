#!/usr/bin/env node
/**
 * E2E Audio Test - Validates audio playback functionality
 * Tests that audio URLs are accessible and player can load/play them
 */

<<<<<<< HEAD
const fs = require("fs");
const path = require("path");
const http = require("http");

const PUBLIC_AUDIO_DIR = path.join(__dirname, "../public/audio");
const TRACKS_DATA_FILE = path.join(__dirname, "../data/mock/tracks.json");

// Read tracks data
const tracksData = JSON.parse(fs.readFileSync(TRACKS_DATA_FILE, "utf8"));

console.log("🎵 E2E Audio Test\n");
=======
const fs = require('fs');
const path = require('path');
const http = require('http');

const PUBLIC_AUDIO_DIR = path.join(__dirname, '../public/audio');
const TRACKS_DATA_FILE = path.join(__dirname, '../data/mock/tracks.json');

// Read tracks data
const tracksData = JSON.parse(fs.readFileSync(TRACKS_DATA_FILE, 'utf8'));

console.log('🎵 E2E Audio Test\n');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
console.log(`Testing ${tracksData.length} tracks...\n`);

// Check audio directory exists
if (!fs.existsSync(PUBLIC_AUDIO_DIR)) {
<<<<<<< HEAD
  console.error("❌ Audio directory does not exist:", PUBLIC_AUDIO_DIR);
=======
  console.error('❌ Audio directory does not exist:', PUBLIC_AUDIO_DIR);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  process.exit(1);
}

// Get list of audio files in public/audio
<<<<<<< HEAD
const audioFiles = fs
  .readdirSync(PUBLIC_AUDIO_DIR)
  .filter((f) => f.endsWith(".mp3"));
=======
const audioFiles = fs.readdirSync(PUBLIC_AUDIO_DIR).filter(f => f.endsWith('.mp3'));
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
console.log(`Found ${audioFiles.length} audio files in public/audio/`);

// Test results
const results = {
  total: tracksData.length,
  found: 0,
  missing: 0,
<<<<<<< HEAD
  errors: [],
=======
  errors: []
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
};

// Check each track's audio URL
tracksData.forEach((track, index) => {
  const audioUrl = track.audioUrl;
  const audioFilename = path.basename(audioUrl);
  const audioPath = path.join(PUBLIC_AUDIO_DIR, audioFilename);
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  if (fs.existsSync(audioPath)) {
    const stats = fs.statSync(audioPath);
    if (stats.size > 0) {
      results.found++;
<<<<<<< HEAD
      if (index < 10) {
        // Show first 10
        console.log(
          `✓ ${track.name} - ${audioFilename} (${(stats.size / 1024).toFixed(1)}KB)`,
        );
=======
      if (index < 10) { // Show first 10
        console.log(`✓ ${track.name} - ${audioFilename} (${(stats.size / 1024).toFixed(1)}KB)`);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      }
    } else {
      results.missing++;
      results.errors.push(`Empty file: ${audioFilename}`);
    }
  } else {
    results.missing++;
<<<<<<< HEAD
    if (index < 10) {
      // Show first 10 missing
=======
    if (index < 10) { // Show first 10 missing
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      console.log(`✗ ${track.name} - ${audioFilename} (MISSING)`);
    }
  }
});

<<<<<<< HEAD
console.log("\n" + "=".repeat(50));
console.log("📊 Test Results:");
=======
console.log('\n' + '='.repeat(50));
console.log('📊 Test Results:');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
console.log(`Total Tracks: ${results.total}`);
console.log(`✓ Files Found: ${results.found}`);
console.log(`✗ Files Missing: ${results.missing}`);
console.log(`Coverage: ${((results.found / results.total) * 100).toFixed(1)}%`);

if (results.missing > 0) {
<<<<<<< HEAD
  console.log("\n⚠️  Missing audio files detected.");
  console.log("\nTo generate test audio files:");
  console.log("  1. Install ffmpeg: brew install ffmpeg");
  console.log("  2. Run: ./scripts/setup_test_audio.sh");
  console.log(
    "\nOr use placeholder URLs that point to CDN-hosted royalty-free audio.",
  );
} else {
  console.log("\n✅ All audio files found!");
}

// Check player.ts compatibility
console.log("\n🔍 Checking player integration...");
const playerTs = path.join(__dirname, "../lib/player.ts");
if (fs.existsSync(playerTs)) {
  const playerContent = fs.readFileSync(playerTs, "utf8");
  if (playerContent.includes("Howl") && playerContent.includes("audioUrl")) {
    console.log("✓ Player.ts uses Howler.js for audio playback");
    console.log("✓ Audio URLs are properly integrated");
  } else {
    console.log("⚠️  Player.ts may need audio URL integration");
=======
  console.log('\n⚠️  Missing audio files detected.');
  console.log('\nTo generate test audio files:');
  console.log('  1. Install ffmpeg: brew install ffmpeg');
  console.log('  2. Run: ./scripts/setup_test_audio.sh');
  console.log('\nOr use placeholder URLs that point to CDN-hosted royalty-free audio.');
} else {
  console.log('\n✅ All audio files found!');
}

// Check player.ts compatibility
console.log('\n🔍 Checking player integration...');
const playerTs = path.join(__dirname, '../lib/player.ts');
if (fs.existsSync(playerTs)) {
  const playerContent = fs.readFileSync(playerTs, 'utf8');
  if (playerContent.includes('Howl') && playerContent.includes('audioUrl')) {
    console.log('✓ Player.ts uses Howler.js for audio playback');
    console.log('✓ Audio URLs are properly integrated');
  } else {
    console.log('⚠️  Player.ts may need audio URL integration');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  }
}

// Summary
<<<<<<< HEAD
if (results.found >= results.total * 0.1) {
  // At least 10% coverage
  console.log("\n✅ E2E audio test PASSED (minimum coverage met)");
  process.exit(0);
} else {
  console.log("\n❌ E2E audio test FAILED (insufficient audio files)");
  console.log("   Please generate test audio files or use CDN URLs");
=======
if (results.found >= results.total * 0.1) { // At least 10% coverage
  console.log('\n✅ E2E audio test PASSED (minimum coverage met)');
  process.exit(0);
} else {
  console.log('\n❌ E2E audio test FAILED (insufficient audio files)');
  console.log('   Please generate test audio files or use CDN URLs');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  process.exit(1);
}
