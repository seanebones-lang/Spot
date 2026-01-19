/**
 * Script to delete all album art references from the database
 * This will set all coverArt fields to null in Album, Track, and TrackSubmission models
 * 
 * Usage: npx tsx scripts/delete-all-album-art.ts
 */

// Load environment variables
import { config } from 'dotenv';
config();

import prisma from '../lib/db';
import { logger } from '../lib/logger';

async function deleteAllAlbumArt() {
  try {
    logger.info('Starting album art deletion...');

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
    logger.info(`Cleared coverArt from ${submissionsResult.count} track submissions`);

    logger.info('Album art deletion completed successfully', {
      albums: albumsResult.count,
      tracks: tracksResult.count,
      submissions: submissionsResult.count,
    });

  } catch (error) {
    logger.error('Error deleting album art', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
deleteAllAlbumArt()
  .then(() => {
    console.log('✅ Album art deletion completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Album art deletion failed:', error);
    process.exit(1);
  });