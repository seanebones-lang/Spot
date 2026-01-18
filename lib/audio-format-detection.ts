/**
 * Audio Format Detection
 * Detects audio format from file magic bytes (not just extension)
 */

export interface AudioFormatInfo {
  format: 'mp3' | 'wav' | 'flac' | 'm4a' | 'ogg' | 'opus' | 'unknown';
  mimeType: string;
  bitDepth?: number;
  sampleRate?: number;
  bitrate?: number;
  codec?: string;
}

/**
 * Detect audio format from file/blob
 * Uses magic bytes for accurate detection
 */
export async function detectAudioFormat(file: File | Blob | string): Promise<AudioFormatInfo> {
  // If it's a URL string, try to detect from extension first
  if (typeof file === 'string') {
    return detectFormatFromUrl(file);
  }
  
  // Read first 12 bytes for magic byte detection
  const buffer = await file.slice(0, 12).arrayBuffer();
  const view = new DataView(buffer);
  
  // FLAC: "fLaC" signature at offset 0
  if (view.byteLength >= 4 && view.getUint32(0) === 0x664C6143) {
    return {
      format: 'flac',
      mimeType: 'audio/flac',
      codec: 'FLAC'
    };
  }
  
  // WAV/RIFF: "RIFF" at 0, "WAVE" at 8
  if (view.byteLength >= 12) {
    const riff = view.getUint32(0) === 0x52494646; // "RIFF"
    const wave = view.getUint32(8) === 0x57415645; // "WAVE"
    if (riff && wave) {
      // Try to read bit depth and sample rate from WAV header
      try {
        const fullHeader = await file.slice(0, 44).arrayBuffer();
        const headerView = new DataView(fullHeader);
        // Sample rate at offset 24, bit depth at offset 34
        if (headerView.byteLength >= 36) {
          return {
            format: 'wav',
            mimeType: 'audio/wav',
            sampleRate: headerView.getUint32(24, true), // Little-endian
            bitDepth: headerView.getUint16(34, true),
            codec: 'PCM'
          };
        }
      } catch (e) {
        // Fall back to basic WAV detection
      }
      return {
        format: 'wav',
        mimeType: 'audio/wav',
        codec: 'PCM'
      };
    }
  }
  
  // MP3: ID3 tag ("ID3") or MPEG sync word (0xFFFB, 0xFFF3, 0xFFF2)
  if (view.byteLength >= 3) {
    const id3Tag = String.fromCharCode(view.getUint8(0), view.getUint8(1), view.getUint8(2));
    if (id3Tag === 'ID3') {
      return {
        format: 'mp3',
        mimeType: 'audio/mpeg',
        codec: 'MP3'
      };
    }
  }
  
  // MPEG sync word check (skip ID3 if present)
  if (view.byteLength >= 4) {
    const sync = (view.getUint16(0) & 0xFFE0) === 0xFFE0;
    if (sync) {
      return {
        format: 'mp3',
        mimeType: 'audio/mpeg',
        codec: 'MP3'
      };
    }
  }
  
  // M4A/MP4: "ftyp" at offset 4, then "M4A " or "mp41"
  if (view.byteLength >= 12) {
    const ftyp = view.getUint32(4) === 0x66747970; // "ftyp"
    if (ftyp) {
      const brand1 = view.getUint32(8);
      const brand2 = view.getUint32(12);
      
      if (brand1 === 0x4D344120 || brand1 === 0x6D703431 || // "M4A " or "mp41"
          brand2 === 0x4D344120 || brand2 === 0x6D703431) {
        return {
          format: 'm4a',
          mimeType: 'audio/mp4',
          codec: 'AAC'
        };
      }
    }
  }
  
  // OGG: "OggS" at offset 0
  if (view.byteLength >= 4 && view.getUint32(0) === 0x4F676753) {
    return {
      format: 'ogg',
      mimeType: 'audio/ogg',
      codec: 'Vorbis/Opus'
    };
  }
  
  // Fallback: try to detect from extension
  if (file instanceof File) {
    return detectFormatFromFilename(file.name);
  }
  
  return {
    format: 'unknown',
    mimeType: 'audio/mpeg'
  };
}

/**
 * Detect format from URL/filename extension
 */
function detectFormatFromUrl(url: string): AudioFormatInfo {
  const extension = url.toLowerCase().split('.').pop() || '';
  
  const formatMap: Record<string, AudioFormatInfo> = {
    'mp3': { format: 'mp3', mimeType: 'audio/mpeg', codec: 'MP3' },
    'wav': { format: 'wav', mimeType: 'audio/wav', codec: 'PCM' },
    'flac': { format: 'flac', mimeType: 'audio/flac', codec: 'FLAC' },
    'm4a': { format: 'm4a', mimeType: 'audio/mp4', codec: 'AAC' },
    'ogg': { format: 'ogg', mimeType: 'audio/ogg', codec: 'Vorbis' },
    'opus': { format: 'opus', mimeType: 'audio/ogg; codecs=opus', codec: 'Opus' }
  };
  
  return formatMap[extension] || {
    format: 'unknown',
    mimeType: 'audio/mpeg'
  };
}

/**
 * Detect format from filename
 */
function detectFormatFromFilename(filename: string): AudioFormatInfo {
  return detectFormatFromUrl(filename);
}

/**
 * Get quality label from format info
 */
export function getQualityLabel(formatInfo: AudioFormatInfo): string {
  if (formatInfo.format === 'flac' || formatInfo.format === 'wav') {
    if (formatInfo.bitDepth && formatInfo.bitDepth > 16) {
      return 'Ultra HiFi';
    }
    return 'Lossless';
  }
  
  if (formatInfo.format === 'm4a' && formatInfo.codec === 'AAC') {
    return 'High';
  }
  
  if (formatInfo.format === 'mp3') {
    return 'Standard';
  }
  
  return 'Standard';
}

/**
 * Get technical specs string for display
 */
export function getTechnicalSpecs(formatInfo: AudioFormatInfo): string {
  const parts: string[] = [];
  
  if (formatInfo.sampleRate) {
    parts.push(`${formatInfo.sampleRate / 1000}kHz`);
  }
  
  if (formatInfo.bitDepth) {
    parts.push(`${formatInfo.bitDepth}-bit`);
  }
  
  if (formatInfo.codec) {
    parts.push(formatInfo.codec);
  }
  
  return parts.join(' • ') || formatInfo.format.toUpperCase();
}
