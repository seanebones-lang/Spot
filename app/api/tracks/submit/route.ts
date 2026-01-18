import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { requireAuth } from '@/lib/auth';

/**
 * API Route for Submitting Track Upload for Review
 * Handles track submission with file uploads (audio + cover art) and all metadata
 * Requires authentication
 */
export async function POST(request: NextRequest) {
  try {
    // Require authentication
    let user;
    try {
      user = requireAuth(request);
    } catch (error) {
      return NextResponse.json(
        { error: 'Authentication required. Please log in to submit tracks.' },
        { status: 401 }
      );
    }

    // Check if user is an approved artist
    // In production, check user.role === 'artist' && user.artistApproved === true
    // For now, allow any authenticated user
    // Parse FormData
    const formDataObj = await request.formData();
    
    // Get metadata payload first
    const payloadStr = formDataObj.get('payload') as string;
    if (!payloadStr) {
      return NextResponse.json(
        { error: 'Missing metadata payload' },
        { status: 400 }
      );
    }

    const formData = JSON.parse(payloadStr);
    const releaseType = formData.releaseType || 'single';
    
    // Get files based on release type
    const audioFile = releaseType === 'single' ? (formDataObj.get('audioFile') as File | null) : null;
    const coverArtFile = formDataObj.get('coverArtFile') as File | null;
    
    // For EP/LP, get all track files
    const trackFiles: File[] = [];
    if (releaseType !== 'single') {
      let index = 0;
      let trackFile = formDataObj.get(`track_${index}_file`) as File | null;
      while (trackFile) {
        trackFiles.push(trackFile);
        index++;
        trackFile = formDataObj.get(`track_${index}_file`) as File | null;
      }
    }
    
    // Validate required fields
    if (releaseType === 'single') {
      if (!formData.metadata || !formData.metadata.trackName) {
        return NextResponse.json(
          { error: 'Track name is required' },
          { status: 400 }
        );
      }
      if (!audioFile) {
        return NextResponse.json(
          { error: 'Audio file is required' },
          { status: 400 }
        );
      }
    } else {
      if (!formData.metadata || !formData.metadata.albumName) {
        return NextResponse.json(
          { error: `${releaseType === 'ep' ? 'EP' : 'Album'} name is required` },
          { status: 400 }
        );
      }
      if (!formData.tracks || formData.tracks.length === 0) {
        return NextResponse.json(
          { error: 'At least one track is required' },
          { status: 400 }
        );
      }
      if (trackFiles.length !== formData.tracks.length) {
        return NextResponse.json(
          { error: 'Number of track files must match number of tracks' },
          { status: 400 }
        );
      }
      const minTracks = releaseType === 'ep' ? 2 : 7;
      if (formData.tracks.length < minTracks) {
        return NextResponse.json(
          { error: `${releaseType === 'ep' ? 'EP' : 'Album'} must have at least ${minTracks} tracks` },
          { status: 400 }
        );
      }
    }

    if (!formData.artistMoodTags || !formData.artistMoodTags.mood) {
      return NextResponse.json(
        { error: 'Mood tags are required' },
        { status: 400 }
      );
    }

    if (!formData.legalWarranties) {
      return NextResponse.json(
        { error: 'Legal warranties are required' },
        { status: 400 }
      );
    }

    // Validate all legal warranties are checked
    const requiredWarranties = [
      'ownsMasterRights',
      'isOriginalComposition',
      'samplesCleared',
      'hasMechanicalLicenses',
      'agreesToIndemnify'
    ];

    const missingWarranties = requiredWarranties.filter(
      warranty => !formData.legalWarranties[warranty]
    );

    if (missingWarranties.length > 0) {
      return NextResponse.json(
        { 
          error: 'All legal warranties must be accepted',
          missingWarranties 
        },
        { status: 400 }
      );
    }

    // Generate submission ID
    const submissionId = releaseType === 'single' 
      ? `TRK-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      : `${releaseType.toUpperCase()}-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    // Create uploads directory structure
    const uploadsDir = join(process.cwd(), 'uploads');
    const audioDir = join(uploadsDir, 'audio', submissionId);
    const coverArtDir = join(uploadsDir, 'cover-art', submissionId);

    // Ensure directories exist
    if (!existsSync(audioDir)) {
      await mkdir(audioDir, { recursive: true });
    }
    if (coverArtFile && !existsSync(coverArtDir)) {
      await mkdir(coverArtDir, { recursive: true });
    }

    // Save audio file(s)
    let audioFileUrl: string | null = null;
    let audioFileUrls: string[] = [];

    if (releaseType === 'single' && audioFile) {
      // Single track
      const audioExtension = audioFile.name.split('.').pop() || 'mp3';
      const audioFileName = `audio.${audioExtension}`;
      const audioFilePath = join(audioDir, audioFileName);
      const audioBuffer = Buffer.from(await audioFile.arrayBuffer());
      await writeFile(audioFilePath, audioBuffer);
      audioFileUrl = `/uploads/audio/${submissionId}/${audioFileName}`;
    } else if (releaseType !== 'single' && trackFiles.length > 0) {
      // Multiple tracks for EP/LP
      for (let i = 0; i < trackFiles.length; i++) {
        const trackFile = trackFiles[i];
        const trackInfo = formData.tracks[i];
        const audioExtension = trackFile.name.split('.').pop() || 'mp3';
        const trackNumber = trackInfo?.trackNumber || i + 1;
        const audioFileName = `track_${trackNumber}.${audioExtension}`;
        const audioFilePath = join(audioDir, audioFileName);
        const audioBuffer = Buffer.from(await trackFile.arrayBuffer());
        await writeFile(audioFilePath, audioBuffer);
        audioFileUrls.push(`/uploads/audio/${submissionId}/${audioFileName}`);
      }
    }

    // Save cover art file (if provided)
    let coverArtUrl = null;
    if (coverArtFile) {
      const coverArtExtension = coverArtFile.name.split('.').pop() || 'jpg';
      const coverArtFileName = `cover.${coverArtExtension}`;
      const coverArtFilePath = join(coverArtDir, coverArtFileName);
      const coverArtBuffer = Buffer.from(await coverArtFile.arrayBuffer());
      await writeFile(coverArtFilePath, coverArtBuffer);
      
      coverArtUrl = `/uploads/cover-art/${submissionId}/${coverArtFileName}`;
    }

    // Create submission record
    // In production, you would save this to a database
    const submissionRecord = {
      id: submissionId,
      userId: user.userId, // Link to authenticated user
      userEmail: user.email,
      releaseType,
      trackName: releaseType === 'single' ? formData.metadata.trackName : formData.metadata.albumName,
      albumName: releaseType !== 'single' ? formData.metadata.albumName : null,
      artistName: formData.metadata.artistFullLegalName,
      status: 'published',
      publishedAt: new Date().toISOString(),
      audioFileUrl: releaseType === 'single' ? audioFileUrl : null,
      audioFileUrls: releaseType !== 'single' ? audioFileUrls : null,
      audioFileName: releaseType === 'single' ? (audioFile?.name || null) : null,
      audioFileSize: releaseType === 'single' ? (audioFile?.size || null) : null,
      audioFileType: releaseType === 'single' ? (audioFile?.type || null) : null,
      trackFiles: releaseType !== 'single' ? trackFiles.map(f => ({
        name: f.name,
        size: f.size,
        type: f.type,
      })) : null,
      trackCount: releaseType !== 'single' ? formData.tracks.length : 1,
      tracks: formData.tracks || null,
      coverArtUrl,
      coverArtFileName: coverArtFile?.name || null,
      coverArtFileSize: coverArtFile?.size || null,
      coverArtFileType: coverArtFile?.type || null,
      moodTags: formData.artistMoodTags,
      metadata: formData.metadata,
      composers: formData.composers || [],
      lyricists: formData.lyricists || [],
      publishers: formData.publishers || [],
      rightsMetadata: formData.rightsMetadata,
      legalWarranties: formData.legalWarranties,
    };

    // Log publication (in production, save to database)
    console.log('Track published:', {
      submissionId,
      releaseType,
      trackName: releaseType === 'single' ? formData.metadata?.trackName : formData.metadata?.albumName,
      audioFileSize: releaseType === 'single' ? (audioFile?.size || 0) : trackFiles.reduce((sum, f) => sum + f.size, 0),
      coverArtFileSize: coverArtFile?.size || 0,
      status: 'published',
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      submissionId,
      message: 'Track published successfully and is now live',
      submission: submissionRecord
    });

  } catch (error) {
    console.error('Error submitting track:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('Error details:', { errorMessage, errorStack });
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred while submitting your track. Please try again.',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}
