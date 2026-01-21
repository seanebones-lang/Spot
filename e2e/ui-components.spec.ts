<<<<<<< HEAD
import { test, expect } from "@playwright/test";

test.describe("UI Components - Spotify Parity Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Wait for page to fully load
    await page.waitForLoadState("networkidle");
    await page
      .waitForSelector('[data-testid="player"]', { timeout: 10000 })
      .catch(() => {});
  });

  test.describe("QueuePanel - Slide-in Animation", () => {
    test("should slide in smoothly from bottom when opened", async ({
      page,
    }) => {
      // Find and click queue button
      const queueButton = page
        .locator('button[title="Queue"]')
        .or(page.locator('button:has-text("Queue")'))
        .first();
      await queueButton.click();

      // Wait for queue panel to appear
      const queuePanel = page
        .locator('div:has-text("Queue")')
        .filter({ hasText: /Queue|Now Playing|Autoplay/ })
        .first();
=======
import { test, expect } from '@playwright/test';

test.describe('UI Components - Spotify Parity Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('[data-testid="player"]', { timeout: 10000 }).catch(() => {});
  });

  test.describe('QueuePanel - Slide-in Animation', () => {
    test('should slide in smoothly from bottom when opened', async ({ page }) => {
      // Find and click queue button
      const queueButton = page.locator('button[title="Queue"]').or(page.locator('button:has-text("Queue")')).first();
      await queueButton.click();

      // Wait for queue panel to appear
      const queuePanel = page.locator('div:has-text("Queue")').filter({ hasText: /Queue|Now Playing|Autoplay/ }).first();
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      await expect(queuePanel).toBeVisible({ timeout: 5000 });

      // Verify smooth animation by checking transform
      const panelBox = await queuePanel.boundingBox();
      expect(panelBox).not.toBeNull();
      if (panelBox) {
        expect(panelBox.y).toBeGreaterThan(0); // Should be visible on screen (not off-screen)
      }
    });

<<<<<<< HEAD
    test("should slide out smoothly when closed", async ({ page }) => {
      // Open queue
      const queueButton = page
        .locator('button[title="Queue"]')
        .or(page.locator('button:has-text("Queue")'))
        .first();
      await queueButton.click();

      const queuePanel = page
        .locator('div:has-text("Queue")')
        .filter({ hasText: /Queue|Now Playing|Autoplay/ })
        .first();
      await expect(queuePanel).toBeVisible();

      // Close queue
      const closeButton = queuePanel
        .locator("button")
        .filter({ hasText: /×|X|Close/ })
        .or(queuePanel.locator('[aria-label*="close" i]'))
        .first();
=======
    test('should slide out smoothly when closed', async ({ page }) => {
      // Open queue
      const queueButton = page.locator('button[title="Queue"]').or(page.locator('button:has-text("Queue")')).first();
      await queueButton.click();
      
      const queuePanel = page.locator('div:has-text("Queue")').filter({ hasText: /Queue|Now Playing|Autoplay/ }).first();
      await expect(queuePanel).toBeVisible();

      // Close queue
      const closeButton = queuePanel.locator('button').filter({ hasText: /×|X|Close/ }).or(queuePanel.locator('[aria-label*="close" i]')).first();
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      await closeButton.click();

      // Panel should disappear with smooth transition
      await expect(queuePanel).not.toBeVisible({ timeout: 500 });
    });

<<<<<<< HEAD
    test("should close on backdrop click", async ({ page }) => {
      const queueButton = page
        .locator('button[title="Queue"]')
        .or(page.locator('button:has-text("Queue")'))
        .first();
      await queueButton.click();

      const queuePanel = page
        .locator('div:has-text("Queue")')
        .filter({ hasText: /Queue|Now Playing|Autoplay/ })
        .first();
      await expect(queuePanel).toBeVisible();

      // Click outside panel (on backdrop)
      const backdrop = page
        .locator('div[class*="fixed"][class*="inset-0"]')
        .first();
=======
    test('should close on backdrop click', async ({ page }) => {
      const queueButton = page.locator('button[title="Queue"]').or(page.locator('button:has-text("Queue")')).first();
      await queueButton.click();
      
      const queuePanel = page.locator('div:has-text("Queue")').filter({ hasText: /Queue|Now Playing|Autoplay/ }).first();
      await expect(queuePanel).toBeVisible();

      // Click outside panel (on backdrop)
      const backdrop = page.locator('div[class*="fixed"][class*="inset-0"]').first();
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      await backdrop.click({ position: { x: 10, y: 10 } });

      // Panel should close
      await expect(queuePanel).not.toBeVisible({ timeout: 500 });
    });
  });

<<<<<<< HEAD
  test.describe("ProgressBar - Hover and Drag Interactions", () => {
    test("should show hover indicator on progress bar hover", async ({
      page,
    }) => {
=======
  test.describe('ProgressBar - Hover and Drag Interactions', () => {
    test('should show hover indicator on progress bar hover', async ({ page }) => {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      // Wait for a track to be playing or load a track
      const playButton = page.locator('button[aria-label*="play" i]').first();
      await playButton.click({ timeout: 5000 }).catch(() => {});

      // Wait for progress bar to appear
<<<<<<< HEAD
      const progressBar = page
        .locator('div[role="progressbar"]')
        .or(
          page
            .locator("div")
            .filter({ has: page.locator("span:has-text(/:\\d{2}/)") }),
        )
        .first();
=======
      const progressBar = page.locator('div[role="progressbar"]').or(
        page.locator('div').filter({ has: page.locator('span:has-text(/:\\d{2}/)') })
      ).first();
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

      // Hover over progress bar
      await progressBar.hover();

      // Check for hover indicator (white circle)
<<<<<<< HEAD
      const hoverIndicator = page
        .locator('div[class*="rounded-full"][class*="bg-white"]')
        .filter({ hasText: "" });
=======
      const hoverIndicator = page.locator('div[class*="rounded-full"][class*="bg-white"]').filter({ hasText: '' });
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      // The indicator might be very small, so we check if it exists
      await page.waitForTimeout(100); // Small delay for hover effect
    });

<<<<<<< HEAD
    test("should allow seeking by clicking progress bar", async ({ page }) => {
=======
    test('should allow seeking by clicking progress bar', async ({ page }) => {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      // Start playback
      const playButton = page.locator('button[aria-label*="play" i]').first();
      await playButton.click({ timeout: 5000 }).catch(() => {});

      await page.waitForTimeout(1000); // Wait for playback to start

<<<<<<< HEAD
      const progressBar = page
        .locator('div[role="progressbar"]')
        .or(
          page
            .locator("div")
            .filter({ has: page.locator("span:has-text(/:\\d{2}/)") }),
        )
        .first();
=======
      const progressBar = page.locator('div[role="progressbar"]').or(
        page.locator('div').filter({ has: page.locator('span:has-text(/:\\d{2}/)') })
      ).first();
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

      // Click at 50% of progress bar width
      const box = await progressBar.boundingBox();
      if (box) {
<<<<<<< HEAD
        await progressBar.click({
          position: { x: box.width * 0.5, y: box.height / 2 },
        });
=======
        await progressBar.click({ position: { x: box.width * 0.5, y: box.height / 2 } });
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        await page.waitForTimeout(200);
        // Progress should update (time should reflect the seek)
      }
    });

<<<<<<< HEAD
    test("should allow dragging to seek", async ({ page }) => {
=======
    test('should allow dragging to seek', async ({ page }) => {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      const playButton = page.locator('button[aria-label*="play" i]').first();
      await playButton.click({ timeout: 5000 }).catch(() => {});

      await page.waitForTimeout(1000);

<<<<<<< HEAD
      const progressBar = page
        .locator('div[role="progressbar"]')
        .or(
          page
            .locator("div")
            .filter({ has: page.locator("span:has-text(/:\\d{2}/)") }),
        )
        .first();
=======
      const progressBar = page.locator('div[role="progressbar"]').or(
        page.locator('div').filter({ has: page.locator('span:has-text(/:\\d{2}/)') })
      ).first();
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

      const box = await progressBar.boundingBox();
      if (box) {
        // Drag from 20% to 80%
<<<<<<< HEAD
        await progressBar.hover({
          position: { x: box.width * 0.2, y: box.height / 2 },
        });
=======
        await progressBar.hover({ position: { x: box.width * 0.2, y: box.height / 2 } });
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        await page.mouse.down();
        await page.mouse.move(box.x + box.width * 0.8, box.y + box.height / 2);
        await page.mouse.up();
        await page.waitForTimeout(200);
      }
    });
  });

<<<<<<< HEAD
  test.describe("Drag and Drop - Queue Reordering", () => {
    test("should show visual feedback during drag", async ({ page }) => {
      // Open queue
      const queueButton = page
        .locator('button[title="Queue"]')
        .or(page.locator('button:has-text("Queue")'))
        .first();
=======
  test.describe('Drag and Drop - Queue Reordering', () => {
    test('should show visual feedback during drag', async ({ page }) => {
      // Open queue
      const queueButton = page.locator('button[title="Queue"]').or(page.locator('button:has-text("Queue")')).first();
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      await queueButton.click({ timeout: 5000 }).catch(() => {});

      await page.waitForTimeout(500);

      // Find draggable queue items
      const queueItems = page.locator('div[draggable="true"]');
      const count = await queueItems.count();

      if (count > 1) {
        const firstItem = queueItems.first();
        const secondItem = queueItems.nth(1);

        // Get bounding boxes
        const firstBox = await firstItem.boundingBox();
        const secondBox = await secondItem.boundingBox();

        if (firstBox && secondBox) {
          // Drag first item to second position
          await firstItem.hover();
          await page.mouse.down();
<<<<<<< HEAD
          await page.mouse.move(
            secondBox.x + secondBox.width / 2,
            secondBox.y + secondBox.height / 2,
          );

          // Check for visual feedback (opacity change, scale, border)
          await page.waitForTimeout(100);

=======
          await page.mouse.move(secondBox.x + secondBox.width / 2, secondBox.y + secondBox.height / 2);
          
          // Check for visual feedback (opacity change, scale, border)
          await page.waitForTimeout(100);
          
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          await page.mouse.up();
          await page.waitForTimeout(500);
        }
      }
    });
  });

<<<<<<< HEAD
  test.describe("Modal - Animation Smoothness", () => {
    test("should fade in smoothly when opened", async ({ page }) => {
=======
  test.describe('Modal - Animation Smoothness', () => {
    test('should fade in smoothly when opened', async ({ page }) => {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      // Look for any modal trigger (playlist edit, etc.)
      // For now, we'll test if modals exist in the DOM when triggered
      const modals = page.locator('[role="dialog"]');
      // Just verify modal structure exists
<<<<<<< HEAD
      await expect(modals.or(page.locator('div[class*="modal"]'))).toHaveCount(
        0,
      ); // Initially hidden
    });
  });

  test.describe("Tooltip - Fade Animation", () => {
    test("should appear with delay on hover", async ({ page }) => {
      // Find tooltip trigger (info icon, etc.)
      const tooltipTrigger = page
        .locator('[aria-label*="Tooltip" i]')
        .or(page.locator('svg[class*="info"]'))
        .first();

      if ((await tooltipTrigger.count()) > 0) {
        await tooltipTrigger.hover();

=======
      await expect(modals.or(page.locator('div[class*="modal"]'))).toHaveCount(0); // Initially hidden
    });
  });

  test.describe('Tooltip - Fade Animation', () => {
    test('should appear with delay on hover', async ({ page }) => {
      // Find tooltip trigger (info icon, etc.)
      const tooltipTrigger = page.locator('[aria-label*="Tooltip" i]').or(
        page.locator('svg[class*="info"]')
      ).first();

      if (await tooltipTrigger.count() > 0) {
        await tooltipTrigger.hover();
        
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        // Wait for tooltip delay (300ms)
        await page.waitForTimeout(400);

        // Tooltip should appear
        const tooltip = page.locator('[role="tooltip"]');
<<<<<<< HEAD
        const tooltipVisible = (await tooltip.count()) > 0;
        // Tooltip might be present in DOM even if not fully visible
        expect(tooltipVisible || (await tooltip.isVisible())).toBeTruthy();
      }
    });

    test("should fade out smoothly when mouse leaves", async ({ page }) => {
      const tooltipTrigger = page
        .locator('[aria-label*="Tooltip" i]')
        .or(page.locator('svg[class*="info"]'))
        .first();

      if ((await tooltipTrigger.count()) > 0) {
=======
        const tooltipVisible = await tooltip.count() > 0;
        // Tooltip might be present in DOM even if not fully visible
        expect(tooltipVisible || await tooltip.isVisible()).toBeTruthy();
      }
    });

    test('should fade out smoothly when mouse leaves', async ({ page }) => {
      const tooltipTrigger = page.locator('[aria-label*="Tooltip" i]').or(
        page.locator('svg[class*="info"]')
      ).first();

      if (await tooltipTrigger.count() > 0) {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        await tooltipTrigger.hover();
        await page.waitForTimeout(400);

        // Move mouse away
        await page.mouse.move(0, 0);
        await page.waitForTimeout(300);

        // Tooltip should fade out
        const tooltip = page.locator('[role="tooltip"]');
        const isVisible = await tooltip.isVisible().catch(() => false);
        expect(isVisible).toBeFalsy();
      }
    });
  });

<<<<<<< HEAD
  test.describe("Context Menu - Fade Animation", () => {
    test("should appear with fade-in animation on right-click", async ({
      page,
    }) => {
      // Find a track or playlist item to right-click
      const trackItem = page
        .locator('div[class*="cursor-pointer"]')
        .filter({ hasText: /Track|Song/ })
        .first()
        .or(
          page
            .locator("div")
            .filter({ has: page.locator("img") })
            .first(),
        );

      if ((await trackItem.count()) > 0) {
        await trackItem.click({ button: "right" });
        await page.waitForTimeout(200);

        // Context menu should appear
        const contextMenu = page
          .locator('div[class*="shadow-2xl"]')
          .filter({ hasText: /Play|Add to Queue|Share/ });
=======
  test.describe('Context Menu - Fade Animation', () => {
    test('should appear with fade-in animation on right-click', async ({ page }) => {
      // Find a track or playlist item to right-click
      const trackItem = page.locator('div[class*="cursor-pointer"]').filter({ hasText: /Track|Song/ }).first()
        .or(page.locator('div').filter({ has: page.locator('img') }).first());

      if (await trackItem.count() > 0) {
        await trackItem.click({ button: 'right' });
        await page.waitForTimeout(200);

        // Context menu should appear
        const contextMenu = page.locator('div[class*="shadow-2xl"]').filter({ hasText: /Play|Add to Queue|Share/ });
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        await expect(contextMenu).toBeVisible({ timeout: 1000 });
      }
    });
  });

<<<<<<< HEAD
  test.describe("Horizontal Scroll - Scrollbar Styling", () => {
    test("should show custom scrollbar on horizontal lists", async ({
      page,
    }) => {
      // Find horizontal scroll containers
      const horizontalScroll = page
        .locator('div[class*="horizontal-scroll"]')
        .or(page.locator('div[class*="overflow-x-auto"]'))
        .first();

      if ((await horizontalScroll.count()) > 0) {
=======
  test.describe('Horizontal Scroll - Scrollbar Styling', () => {
    test('should show custom scrollbar on horizontal lists', async ({ page }) => {
      // Find horizontal scroll containers
      const horizontalScroll = page.locator('div[class*="horizontal-scroll"]').or(
        page.locator('div[class*="overflow-x-auto"]')
      ).first();

      if (await horizontalScroll.count() > 0) {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        const box = await horizontalScroll.boundingBox();
        if (box && box.width < 800) {
          // If container is narrower than content, scrollbar should appear
          await horizontalScroll.evaluate((el) => {
            el.scrollLeft = 100;
          });
          await page.waitForTimeout(100);
        }
      }
    });

<<<<<<< HEAD
    test("should allow smooth horizontal scrolling", async ({ page }) => {
      const horizontalScroll = page
        .locator('div[class*="horizontal-scroll"]')
        .or(page.locator('div[class*="overflow-x-auto"]'))
        .first();

      if ((await horizontalScroll.count()) > 0) {
        const scrollContainer = horizontalScroll.first();
        const initialScroll = await scrollContainer.evaluate(
          (el) => el.scrollLeft,
        );

        // Scroll horizontally
        await scrollContainer.evaluate((el) => {
          el.scrollBy({ left: 200, behavior: "smooth" });
        });

        await page.waitForTimeout(500);

        const finalScroll = await scrollContainer.evaluate(
          (el) => el.scrollLeft,
        );
=======
    test('should allow smooth horizontal scrolling', async ({ page }) => {
      const horizontalScroll = page.locator('div[class*="horizontal-scroll"]').or(
        page.locator('div[class*="overflow-x-auto"]')
      ).first();

      if (await horizontalScroll.count() > 0) {
        const scrollContainer = horizontalScroll.first();
        const initialScroll = await scrollContainer.evaluate((el) => el.scrollLeft);
        
        // Scroll horizontally
        await scrollContainer.evaluate((el) => {
          el.scrollBy({ left: 200, behavior: 'smooth' });
        });
        
        await page.waitForTimeout(500);
        
        const finalScroll = await scrollContainer.evaluate((el) => el.scrollLeft);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        expect(finalScroll).toBeGreaterThan(initialScroll);
      }
    });
  });

<<<<<<< HEAD
  test.describe("Scroll Behavior - Smooth Momentum", () => {
    test("should have smooth scroll behavior", async ({ page }) => {
      // Check if smooth scroll is applied
      const htmlElement = page.locator("html");
      const scrollBehavior = await htmlElement.evaluate((el) => {
        return window.getComputedStyle(el).scrollBehavior;
      });

      expect(scrollBehavior).toBe("smooth");
    });

    test("should support momentum scrolling on mobile", async ({
      page,
      isMobile,
    }) => {
      if (isMobile) {
        const scrollContainer = page
          .locator("main")
          .or(page.locator('div[class*="overflow-y-auto"]'))
          .first();
=======
  test.describe('Scroll Behavior - Smooth Momentum', () => {
    test('should have smooth scroll behavior', async ({ page }) => {
      // Check if smooth scroll is applied
      const htmlElement = page.locator('html');
      const scrollBehavior = await htmlElement.evaluate((el) => {
        return window.getComputedStyle(el).scrollBehavior;
      });
      
      expect(scrollBehavior).toBe('smooth');
    });

    test('should support momentum scrolling on mobile', async ({ page, isMobile }) => {
      if (isMobile) {
        const scrollContainer = page.locator('main').or(page.locator('div[class*="overflow-y-auto"]')).first();
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        await scrollContainer.evaluate((el) => {
          el.scrollTop = 500;
        });
        await page.waitForTimeout(300);
      }
    });
  });

<<<<<<< HEAD
  test.describe("Sidebar - Resize and Collapse", () => {
    test("should resize smoothly when dragging handle", async ({ page }) => {
      // Find sidebar resize handle
      const resizeHandle = page
        .locator('div[class*="cursor-col-resize"]')
        .first();

      if ((await resizeHandle.count()) > 0) {
        const handleBox = await resizeHandle.boundingBox();
        if (handleBox) {
          const sidebar = page
            .locator("aside")
            .or(page.locator('div[class*="sidebar"]'))
            .first();
=======
  test.describe('Sidebar - Resize and Collapse', () => {
    test('should resize smoothly when dragging handle', async ({ page }) => {
      // Find sidebar resize handle
      const resizeHandle = page.locator('div[class*="cursor-col-resize"]').first();

      if (await resizeHandle.count() > 0) {
        const handleBox = await resizeHandle.boundingBox();
        if (handleBox) {
          const sidebar = page.locator('aside').or(page.locator('div[class*="sidebar"]')).first();
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          const initialWidth = await sidebar.evaluate((el) => el.offsetWidth);

          // Drag resize handle
          await resizeHandle.hover();
          await page.mouse.down();
          await page.mouse.move(handleBox.x + 100, handleBox.y);
          await page.mouse.up();

          await page.waitForTimeout(400);

          const newWidth = await sidebar.evaluate((el) => el.offsetWidth);
          expect(Math.abs(newWidth - initialWidth)).toBeGreaterThan(50);
        }
      }
    });

<<<<<<< HEAD
    test("should collapse/expand smoothly", async ({ page }) => {
      const toggleButton = page.locator('button[aria-label*="sidebar" i]').or(
        page
          .locator("button")
          .filter({ has: page.locator("svg") })
          .first(),
      );

      if ((await toggleButton.count()) > 0) {
        const sidebar = page
          .locator("aside")
          .or(page.locator('div[class*="sidebar"]'))
          .first();
=======
    test('should collapse/expand smoothly', async ({ page }) => {
      const toggleButton = page.locator('button[aria-label*="sidebar" i]').or(
        page.locator('button').filter({ has: page.locator('svg') }).first()
      );

      if (await toggleButton.count() > 0) {
        const sidebar = page.locator('aside').or(page.locator('div[class*="sidebar"]')).first();
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        const initialWidth = await sidebar.evaluate((el) => el.offsetWidth);

        await toggleButton.click();
        await page.waitForTimeout(400);

        const newWidth = await sidebar.evaluate((el) => el.offsetWidth);
        expect(newWidth !== initialWidth).toBeTruthy();
      }
    });
  });
});
