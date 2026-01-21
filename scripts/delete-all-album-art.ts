/**
 * Script to delete all album art references from the database
 * This will set all coverArt fields to null in Album, Track, and TrackSubmission models
<<<<<<< HEAD
 *
=======
 * 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
 * Usage: npx tsx scripts/delete-all-album-art.ts
 */

// Load environment variables
<<<<<<< HEAD
import { config } from "dotenv";
config();

import prisma from "../lib/db";
import { logger } from "../lib/logger";

async function deleteAllAlbumArt() {
  try {
    logger.info("Starting album art deletion...");
=======
import { config } from 'dotenv';
config();

import prisma from '../lib/db';
import { logger } from '../lib/logger';

async function deleteAllAlbumArt() {
  try {
    logger.info('Starting album art deletion...');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

    // Clear coverArt from Albums
    const albumsResult = await prisma.album.updateMany({
      where: {
        coverArt: {
          not: null,
        },
      },
      data: {
        coverArt: null,
      },
    });
    logger.info(`Cleared coverArt from ${albumsResult.count} albums`);

    // Clear coverArt from Tracks
    const tracksResult = await prisma.track.updateMany({
      where: {
        coverArt: {
          not: null,
        },
      },
      data: {
        coverArt: null,
      },
    });
    logger.info(`Cleared coverArt from ${tracksResult.count} tracks`);

    // Clear coverArtUrl from TrackSubmissions
    const submissionsResult = await prisma.trackSubmission.updateMany({
      where: {
        coverArtUrl: {
          not: null,
        },
      },
      data: {
        coverArtUrl: null,
        coverArtFileName: null,
        coverArtFileSize: null,
      },
    });
<<<<<<< HEAD
    logger.info(
      `Cleared coverArt from ${submissionsResult.count} track submissions`,
    );

    logger.info("Album art deletion completed successfully", {
=======
    logger.info(`Cleared coverArt from ${submissionsResult.count} track submissions`);

    logger.info('Album art deletion completed successfully', {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      albums: albumsResult.count,
      tracks: tracksResult.count,
      submissions: submissionsResult.count,
    });
<<<<<<< HEAD
  } catch (error) {
    logger.error("Error deleting album art", error);
=======

  } catch (error) {
    logger.error('Error deleting album art', error);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
deleteAllAlbumArt()
  .then(() => {
<<<<<<< HEAD
    console.log("✅ Album art deletion completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Album art deletion failed:", error);
    process.exit(1);
  });
=======
    console.log('✅ Album art deletion completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Album art deletion failed:', error);
    process.exit(1);
  });
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
