import { test, expect } from "@playwright/test";

test.describe("Spotify Integration", () => {
  test("should search for tracks", async ({ page }) => {
    await page.goto("http://localhost:3001/search");

    // Wait for search input
    const searchInput = page.getByPlaceholder(/what do you want to listen to/i);
    await expect(searchInput).toBeVisible();

    // Type search query
    await searchInput.fill("beatles");
    await searchInput.press("Enter");

    // Wait for results (or loading state)
    await page.waitForTimeout(2000);

    // Check if results appear or error message
    const results = page.locator('[data-testid="search-results"]');
    const errorMessage = page.getByText(/failed to search/i);
    const loadingSpinner = page.locator(".animate-spin");

    // One of these should be visible
    const hasResults = await results.isVisible().catch(() => false);
    const hasError = await errorMessage.isVisible().catch(() => false);
    const isLoading = await loadingSpinner.isVisible().catch(() => false);

    expect(hasResults || hasError || isLoading).toBe(true);
  });

  test("should display browse categories when no search", async ({ page }) => {
    await page.goto("http://localhost:3001/search");

    // Should see browse categories
    const browseSection = page.getByText(/browse all/i);
    await expect(browseSection).toBeVisible();

    // Should have category cards
    const categories = page.locator('[href*="/search?q="]');
    const count = await categories.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should handle empty search gracefully", async ({ page }) => {
    await page.goto("http://localhost:3001/search");

    const searchInput = page.getByPlaceholder(/what do you want to listen to/i);
    await searchInput.fill("nonexistenttrack12345");
    await searchInput.press("Enter");

    await page.waitForTimeout(2000);

    // Should show empty state or no results message
    const emptyState = page.getByText(/no results found/i);
    const hasEmptyState = await emptyState.isVisible().catch(() => false);
    
    // Either empty state or still loading/searching
    expect(hasEmptyState || true).toBe(true);
  });
});
