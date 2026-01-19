# Test Audio Files

For e2e testing, we need royalty-free audio samples.

## Options:

1. Use royalty-free audio from:
   - Free Music Archive (https://freemusicarchive.org/)
   - Internet Archive (https://archive.org/details/audio)
   - CC0 License audio

2. Generate test tones using ffmpeg:

   ```bash
   ffmpeg -f lavfi -i "sine=frequency=440:duration=30" public/audio/test-tone-440hz.mp3
   ```

3. Use placeholder audio URLs for development:
   - Point to CDN-hosted royalty-free samples
   - Use silent audio generation for testing player functionality

## Current Test Files:

- test-tone.mp3 (440Hz sine wave, 30 seconds)
- silent-10s.mp3 (silent audio for testing)
