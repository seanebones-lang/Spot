<<<<<<< HEAD
=======
import { MoodTags } from './mood';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

// Legal metadata for royalty and rights management
export interface Contributor {
  firstName: string; // Full legal first name (required)
  lastName: string; // Full legal last name (required)
<<<<<<< HEAD
  role: "Composer" | "Lyricist" | "Composer & Lyricist";
=======
  role: 'Composer' | 'Lyricist' | 'Composer & Lyricist';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  ipiNumber?: string; // IPI/CAE number from PRO
  ownershipPercentage: number; // Composition ownership percentage
}

export interface Publisher {
  name: string; // Publisher name (or "Self-Published" if independent)
  contactEmail?: string;
  contactPhone?: string;
  ipiNumber?: string; // Publisher IPI/CAE number
}

export interface RightsMetadata {
  // Composition rights (songwriters/composers)
  composers: Contributor[]; // At least one required
  lyricists: Contributor[]; // Separate from composers if different
  publishers: Publisher[]; // Optional, can be self-published
  compositionOwnershipTotal: number; // Must equal 100%
<<<<<<< HEAD

  // Master recording rights
  masterOwnershipPercentage: number; // Must be 100% or have valid licenses

=======
  
  // Master recording rights
  masterOwnershipPercentage: number; // Must be 100% or have valid licenses
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  // Identification codes
  iswc?: string; // International Standard Musical Work Code (composition)
  isrc: string; // International Standard Recording Code (recording)
  upc?: string; // Universal Product Code (for albums)
  ean?: string; // European Article Number (alternative to UPC)
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  // Legal declarations
  ownsMasterRights: boolean; // Warranty that uploader owns 100% of master rights
  isOriginalComposition: boolean; // Warranty that composition is original
  samplesCleared: boolean; // Warranty that all samples/covers are cleared
  hasMechanicalLicenses: boolean; // For covers, has mechanical licenses via HFA/MLC
  explicitContent: boolean; // Explicit content flag for parental advisories
<<<<<<< HEAD
  territoryRights: "worldwide" | string[]; // Territory distribution rights
  agreesToIndemnify: boolean; // Agreement to indemnify platform against claims

  // PRO affiliation
  proAffiliation?: "ASCAP" | "BMI" | "SESAC" | "GMR" | "Multiple" | "None";
  proAffiliationDetails?: string; // Additional PRO information

=======
  territoryRights: 'worldwide' | string[]; // Territory distribution rights
  agreesToIndemnify: boolean; // Agreement to indemnify platform against claims
  
  // PRO affiliation
  proAffiliation?: 'ASCAP' | 'BMI' | 'SESAC' | 'GMR' | 'Multiple' | 'None';
  proAffiliationDetails?: string; // Additional PRO information
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  // Timestamps for legal audits
  legalDeclarationTimestamp?: string;
  legalDeclarationIP?: string;
}

export interface Track {
  id: string;
  name: string;
  artist: string;
  artistId: string;
  album: string;
  albumId: string;
  duration: number; // in milliseconds
<<<<<<< HEAD
  audioUrl: string;
  coverArt: string;
  format?: "WAV" | "FLAC" | "MP3" | "M4A" | "MP4";
  quality?: "lossless" | "high" | "standard" | "data-saver";
  releaseDate?: string;
  isrc?: string;

  // Legal and rights metadata (required for direct uploads)
  rightsMetadata?: RightsMetadata;

=======
  audioUrl?: string; // Optional - for UI-only mode without media
  coverArt?: string; // Optional - fallback to music icon
  moodTags: MoodTags;
  format?: 'WAV' | 'FLAC' | 'MP3' | 'M4A' | 'MP4';
  quality?: 'lossless' | 'high' | 'standard' | 'data-saver';
  releaseDate?: string;
  isrc?: string;
  
  // Legal and rights metadata (required for direct uploads)
  rightsMetadata?: RightsMetadata;
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  // Full legal artist name(s) per 2025 Spotify rules
  artistFullLegalName?: string;
  featuredArtists?: Array<{
    fullLegalName: string;
    role?: string;
  }>;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  // Genre/subgenre from standardized lists
  genre?: string;
  subgenre?: string;
}
