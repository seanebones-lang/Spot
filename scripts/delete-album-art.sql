-- SQL script to delete all album art references
-- Run this directly on your PostgreSQL database

UPDATE albums SET "coverArt" = NULL WHERE "coverArt" IS NOT NULL;
UPDATE tracks SET "coverArt" = NULL WHERE "coverArt" IS NOT NULL;
UPDATE track_submissions SET "coverArtUrl" = NULL, "coverArtFileName" = NULL, "coverArtFileSize" = NULL WHERE "coverArtUrl" IS NOT NULL;
