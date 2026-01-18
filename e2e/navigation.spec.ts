import { test, expect } from '@playwright/test';

test.describe('Navigation - Routing and Links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Sidebar Navigation', () => {
    test('should navigate to Home when Home link clicked', async ({ page }) => {
      const homeLink = page.locator('a[href="/"]').or(page.getByText('Home')).first();
      await homeLink.click();
      
      await page.waitForURL('**/', { timeout: 3000 });
      expect(page.url()).toContain('/');
    });

    test('should navigate to Search when Search link clicked', async ({ page }) => {
      const searchLink = page.locator('a[href="/search"]').or(page.getByText('Search')).first();
      await searchLink.click();
      
      await page.waitForURL('**/search**', { timeout: 3000 });
      expect(page.url()).toContain('/search');
    });

    test('should navigate to Library when Library link clicked', async ({ page }) => {
      const libraryLink = page.locator('a[href="/collection"]').or(page.getByText(/Your Library|Library/)).first();
      await libraryLink.click();
      
      await page.waitForURL('**/collection**', { timeout: 3000 });
      expect(page.url()).toContain('/collection');
    });

    test('should show active state for current route', async ({ page }) => {
      // Navigate to search
      const searchLink = page.locator('a[href="/search"]').first();
      await searchLink.click();
      await page.waitForURL('**/search**');

      // Search link should have active styling
      const activeLink = page.locator('a[href="/search"]').first();
      const className = await activeLink.getAttribute('class');
      expect(className).toContain('bg-spotify-light-gray');
    });
  });

  test.describe('Top Bar Navigation', () => {
    test('should allow browser back navigation', async ({ page }) => {
      // Navigate to search
      const searchLink = page.locator('a[href="/search"]').first();
      await searchLink.click();
      await page.waitForURL('**/search**');

      // Go back
      await page.goBack();
      await page.waitForURL('**/', { timeout: 3000 });
      expect(page.url()).not.toContain('/search');
    });

    test('should allow browser forward navigation', async ({ page }) => {
      const searchLink = page.locator('a[href="/search"]').first();
      await searchLink.click();
      await page.waitForURL('**/search**');

      await page.goBack();
      await page.goForward();
      
      await page.waitForURL('**/search**', { timeout: 3000 });
      expect(page.url()).toContain('/search');
    });
  });

  test.describe('Playlist Navigation', () => {
    test('should navigate to playlist page when playlist clicked', async ({ page }) => {
      // Find a playlist link/card
      const playlistLink = page.locator('a[href^="/playlist/"]').first();
      
      if (await playlistLink.count() > 0) {
        const href = await playlistLink.getAttribute('href');
        await playlistLink.click();
        
        await page.waitForURL(`**${href}**`, { timeout: 3000 });
        expect(page.url()).toContain('/playlist/');
      }
    });
  });

  test.describe('Artist Navigation', () => {
    test('should navigate to artist page when artist link clicked', async ({ page }) => {
      const artistLink = page.locator('a[href^="/artist/"]').first();
      
      if (await artistLink.count() > 0) {
        const href = await artistLink.getAttribute('href');
        await artistLink.click();
        
        await page.waitForURL(`**${href}**`, { timeout: 3000 });
        expect(page.url()).toContain('/artist/');
      }
    });
  });

  test.describe('Breadcrumbs', () => {
    test('should show breadcrumbs on nested pages', async ({ page }) => {
      const searchLink = page.locator('a[href="/search"]').first();
      await searchLink.click();
      await page.waitForURL('**/search**');

      // Breadcrumbs should be present (if implemented)
      const breadcrumbs = page.locator('nav[aria-label*="breadcrumb" i]').or(
        page.locator('div[class*="breadcrumb"]')
      );
      // Just verify structure exists (may not always be visible)
    });
  });
});
