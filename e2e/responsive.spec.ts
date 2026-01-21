<<<<<<< HEAD
import { test, expect } from "@playwright/test";

test.describe("Responsive Design - Breakpoints and Mobile", () => {
  test.describe("Desktop View (>1024px)", () => {
    test.use({ viewport: { width: 1280, height: 720 } });

    test("should show full sidebar on desktop", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      const sidebar = page
        .locator("aside")
        .or(page.locator('div[class*="sidebar"]'))
        .first();
      if ((await sidebar.count()) > 0) {
=======
import { test, expect } from '@playwright/test';

test.describe('Responsive Design - Breakpoints and Mobile', () => {
  test.describe('Desktop View (>1024px)', () => {
    test.use({ viewport: { width: 1280, height: 720 } });

    test('should show full sidebar on desktop', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const sidebar = page.locator('aside').or(page.locator('div[class*="sidebar"]')).first();
      if (await sidebar.count() > 0) {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        const width = await sidebar.evaluate((el) => el.offsetWidth);
        expect(width).toBeGreaterThan(200); // Should be expanded on desktop
      }
    });

<<<<<<< HEAD
    test("should show player at bottom on desktop", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");
=======
    test('should show player at bottom on desktop', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

      const player = page.locator('div[class*="fixed"][class*="bottom-0"]');
      await expect(player).toBeVisible();

      const box = await player.boundingBox();
      if (box) {
        // Player should be at bottom of viewport
        expect(box.y + box.height).toBeGreaterThan(600);
      }
    });

<<<<<<< HEAD
    test("should show horizontal scroll lists properly", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      const horizontalScroll = page
        .locator('div[class*="horizontal-scroll"]')
        .or(page.locator('div[class*="overflow-x-auto"]'))
        .first();

      if ((await horizontalScroll.count()) > 0) {
=======
    test('should show horizontal scroll lists properly', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const horizontalScroll = page.locator('div[class*="horizontal-scroll"]').or(
        page.locator('div[class*="overflow-x-auto"]')
      ).first();

      if (await horizontalScroll.count() > 0) {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        await expect(horizontalScroll).toBeVisible();
      }
    });
  });

<<<<<<< HEAD
  test.describe("Tablet View (768px-1024px)", () => {
    test.use({ viewport: { width: 768, height: 1024 } });

    test("should adapt layout for tablet", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      // Sidebar might be collapsible on tablet
      const sidebar = page
        .locator("aside")
        .or(page.locator('div[class*="sidebar"]'))
        .first();
      await expect(sidebar.or(page.locator("body"))).toBeVisible();
    });

    test("should show player controls on tablet", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");
=======
  test.describe('Tablet View (768px-1024px)', () => {
    test.use({ viewport: { width: 768, height: 1024 } });

    test('should adapt layout for tablet', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Sidebar might be collapsible on tablet
      const sidebar = page.locator('aside').or(page.locator('div[class*="sidebar"]')).first();
      await expect(sidebar.or(page.locator('body'))).toBeVisible();
    });

    test('should show player controls on tablet', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

      const player = page.locator('div[class*="fixed"][class*="bottom-0"]');
      const playButton = player.locator('button[aria-label*="play" i]').first();

      // Player should be visible
      await expect(player).toBeVisible();
      // Controls should be accessible
      await expect(playButton).toBeVisible();
    });
  });

<<<<<<< HEAD
  test.describe("Mobile View (<768px)", () => {
    test.use({ viewport: { width: 375, height: 667 } }); // iPhone size

    test("should show collapsed sidebar on mobile", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      const sidebar = page
        .locator("aside")
        .or(page.locator('div[class*="sidebar"]'))
        .first();

      if ((await sidebar.count()) > 0) {
=======
  test.describe('Mobile View (<768px)', () => {
    test.use({ viewport: { width: 375, height: 667 } }); // iPhone size

    test('should show collapsed sidebar on mobile', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const sidebar = page.locator('aside').or(page.locator('div[class*="sidebar"]')).first();
      
      if (await sidebar.count() > 0) {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        const width = await sidebar.evaluate((el) => el.offsetWidth);
        // On mobile, sidebar should be narrow or hidden
        expect(width).toBeLessThanOrEqual(100);
      }
    });

<<<<<<< HEAD
    test("should show player at bottom on mobile", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");
=======
    test('should show player at bottom on mobile', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

      const player = page.locator('div[class*="fixed"][class*="bottom-0"]');
      await expect(player).toBeVisible();

      const box = await player.boundingBox();
      if (box) {
        // Player should be at bottom
        expect(box.y + box.height).toBeGreaterThan(600);
      }
    });

<<<<<<< HEAD
    test("should support touch interactions", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      // Test touch on play button
      const playButton = page.locator('button[aria-label*="play" i]').first();
      if ((await playButton.count()) > 0) {
=======
    test('should support touch interactions', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Test touch on play button
      const playButton = page.locator('button[aria-label*="play" i]').first();
      if (await playButton.count() > 0) {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        await playButton.tap();
        await page.waitForTimeout(500);
        // Button should respond to touch
      }
    });

<<<<<<< HEAD
    test("should allow scrolling on mobile", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      // Test smooth scrolling
      const mainContent = page
        .locator("main")
        .or(page.locator('div[class*="overflow-y-auto"]'))
        .first();

      if ((await mainContent.count()) > 0) {
=======
    test('should allow scrolling on mobile', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Test smooth scrolling
      const mainContent = page.locator('main').or(page.locator('div[class*="overflow-y-auto"]')).first();
      
      if (await mainContent.count() > 0) {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        await mainContent.evaluate((el) => {
          el.scrollTop = 500;
        });
        await page.waitForTimeout(300);

        const scrollTop = await mainContent.evaluate((el) => el.scrollTop);
        expect(scrollTop).toBeGreaterThan(0);
      }
    });

<<<<<<< HEAD
    test("should show horizontal scroll lists on mobile", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      const horizontalScroll = page
        .locator('div[class*="horizontal-scroll"]')
        .or(page.locator('div[class*="overflow-x-auto"]'))
        .first();

      if ((await horizontalScroll.count()) > 0) {
=======
    test('should show horizontal scroll lists on mobile', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const horizontalScroll = page.locator('div[class*="horizontal-scroll"]').or(
        page.locator('div[class*="overflow-x-auto"]')
      ).first();

      if (await horizontalScroll.count() > 0) {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        // Should allow horizontal scrolling on mobile
        await horizontalScroll.evaluate((el) => {
          el.scrollLeft = 200;
        });
        await page.waitForTimeout(200);

<<<<<<< HEAD
        const scrollLeft = await horizontalScroll.evaluate(
          (el) => el.scrollLeft,
        );
=======
        const scrollLeft = await horizontalScroll.evaluate((el) => el.scrollLeft);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        expect(scrollLeft).toBeGreaterThan(0);
      }
    });
  });

<<<<<<< HEAD
  test.describe("Viewport Resize", () => {
    test("should adapt when viewport resized", async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto("/");
      await page.waitForLoadState("networkidle");
=======
  test.describe('Viewport Resize', () => {
    test('should adapt when viewport resized', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

      const initialWidth = await page.evaluate(() => window.innerWidth);
      expect(initialWidth).toBe(1920);

      // Resize to mobile
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(300);

      const newWidth = await page.evaluate(() => window.innerWidth);
      expect(newWidth).toBe(375);

      // Resize back to desktop
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.waitForTimeout(300);

      const finalWidth = await page.evaluate(() => window.innerWidth);
      expect(finalWidth).toBe(1280);
    });
  });

<<<<<<< HEAD
  test.describe("Dark Mode (if implemented)", () => {
    test("should maintain dark theme across breakpoints", async ({
      page,
      viewport,
    }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      // Check background color is dark
      const body = page.locator("body");
=======
  test.describe('Dark Mode (if implemented)', () => {
    test('should maintain dark theme across breakpoints', async ({ page, viewport }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Check background color is dark
      const body = page.locator('body');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      const bgColor = await body.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
      });

      // Should be dark background (rgb values should be low)
<<<<<<< HEAD
      expect(bgColor).toContain("rgb");
=======
      expect(bgColor).toContain('rgb');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      const rgbMatch = bgColor.match(/\d+/g);
      if (rgbMatch && rgbMatch.length >= 3) {
        const [r, g, b] = rgbMatch.map(Number);
        // Dark theme has low RGB values
        expect(r + g + b).toBeLessThan(50);
      }
    });
  });
});
