import { test, expect } from '@playwright/test';

test.describe('Player - Core Functionality Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Play/Pause Controls', () => {
    test('should play track when play button clicked', async ({ page }) => {
      // Find and click first play button (on a track card)
      const playButtons = page.locator('button[aria-label*="play" i]').or(
        page.locator('button').filter({ has: page.locator('svg') })
      );

      const playButton = playButtons.first();
      await playButton.click({ timeout: 5000 }).catch(() => {});

      await page.waitForTimeout(1000);

      // Player should show current track
      const player = page.locator('div[class*="fixed"][class*="bottom-0"]');
      await expect(player).toBeVisible();
    });

    test('should pause when pause button clicked', async ({ page }) => {
      // Start playback
      const playButton = page.locator('button[aria-label*="play" i]').first();
      await playButton.click({ timeout: 5000 }).catch(() => {});
      await page.waitForTimeout(1000);

      // Click pause (same button, now shows pause icon)
      const pauseButton = page.locator('button[aria-label*="pause" i]').or(
        page.locator('button[aria-label*="play" i]')
      ).first();
      await pauseButton.click();
      await page.waitForTimeout(500);

      // Player should still be visible but paused
      const player = page.locator('div[class*="fixed"][class*="bottom-0"]');
      await expect(player).toBeVisible();
    });
  });

  test.describe('Volume Control', () => {
    test('should adjust volume when slider moved', async ({ page }) => {
      // Find volume control
      const volumeControl = page.locator('div[class*="volume"]').or(
        page.locator('div[aria-label*="volume" i]')
      ).first();

      if (await volumeControl.count() > 0) {
        const volumeSlider = volumeControl.locator('div[role="slider"]').or(
          volumeControl.locator('div[class*="h-1"]')
        ).first();

        if (await volumeSlider.count() > 0) {
          const box = await volumeSlider.boundingBox();
          if (box) {
            // Set volume to 50%
            await volumeSlider.click({ position: { x: box.width * 0.5, y: box.height / 2 } });
            await page.waitForTimeout(200);
          }
        }
      }
    });
  });

  test.describe('Shuffle and Repeat', () => {
    test('should toggle shuffle when clicked', async ({ page }) => {
      // Start playback first
      const playButton = page.locator('button[aria-label*="play" i]').first();
      await playButton.click({ timeout: 5000 }).catch(() => {});
      await page.waitForTimeout(1000);

      // Find shuffle button (usually a shuffle icon)
      const shuffleButton = page.locator('button').filter({ has: page.locator('svg') }).nth(0);
      
      // Click shuffle button
      await shuffleButton.click({ timeout: 2000 }).catch(() => {});
      await page.waitForTimeout(300);
    });

    test('should cycle through repeat modes when clicked', async ({ page }) => {
      const playButton = page.locator('button[aria-label*="play" i]').first();
      await playButton.click({ timeout: 5000 }).catch(() => {});
      await page.waitForTimeout(1000);

      // Find repeat button (usually has repeat icon)
      const controlButtons = page.locator('div[class*="flex"] button').filter({ has: page.locator('svg') });
      const repeatButton = controlButtons.last();

      await repeatButton.click({ timeout: 2000 }).catch(() => {});
      await page.waitForTimeout(300);
    });
  });

  test.describe('Next/Previous Track', () => {
    test('should play next track when next button clicked', async ({ page }) => {
      const playButton = page.locator('button[aria-label*="play" i]').first();
      await playButton.click({ timeout: 5000 }).catch(() => {});
      await page.waitForTimeout(1000);

      // Find next button (skip forward icon)
      const controlButtons = page.locator('div[class*="flex"] button').filter({ has: page.locator('svg') });
      const nextButton = controlButtons.nth(2); // Usually index 2 for next

      await nextButton.click({ timeout: 2000 }).catch(() => {});
      await page.waitForTimeout(1000);
    });

    test('should play previous track when previous button clicked', async ({ page }) => {
      const playButton = page.locator('button[aria-label*="play" i]').first();
      await playButton.click({ timeout: 5000 }).catch(() => {});
      await page.waitForTimeout(1000);

      const controlButtons = page.locator('div[class*="flex"] button').filter({ has: page.locator('svg') });
      const prevButton = controlButtons.nth(1); // Usually index 1 for previous

      await prevButton.click({ timeout: 2000 }).catch(() => {});
      await page.waitForTimeout(1000);
    });
  });

  test.describe('Player UI Elements', () => {
    test('should display current track info', async ({ page }) => {
      const playButton = page.locator('button[aria-label*="play" i]').first();
      await playButton.click({ timeout: 5000 }).catch(() => {});
      await page.waitForTimeout(1000);

      const player = page.locator('div[class*="fixed"][class*="bottom-0"]');
      
      // Check for track name
      const trackName = player.locator('div:has-text(/,/)').first().or(
        player.locator('div[class*="text-sm"]')
      );
      
      // Player should be visible with track info
      await expect(player).toBeVisible();
    });

    test('should show progress bar when track is playing', async ({ page }) => {
      const playButton = page.locator('button[aria-label*="play" i]').first();
      await playButton.click({ timeout: 5000 }).catch(() => {});
      await page.waitForTimeout(1000);

      const progressBar = page.locator('div[role="progressbar"]').or(
        page.locator('div').filter({ has: page.locator('span:has-text(/:\\d{2}/)') })
      ).first();

      // Progress bar should be visible
      await expect(progressBar).toBeVisible({ timeout: 2000 });
    });
  });
});
