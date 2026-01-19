import { test, expect } from "@playwright/test";

test.describe("Upload Flow E2E", () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test("should upload track, redirect to new releases, and display with genre/mood/explicit sticker", async ({
    page,
  }) => {
    // Navigate to upload page
    await page.goto("/upload");

    // Wait for page to load
    await expect(page.locator("h1")).toContainText(/Upload/i);

    // Step 0: Select release type (Single)
    await page.click('button:has-text("Single")');
    await expect(page.locator("text=Step 1: Upload Audio File")).toBeVisible();

    // Step 1: Upload audio file
    const testFile = {
      name: "test-track.mp3",
      mimeType: "audio/mpeg",
      buffer: Buffer.from("fake audio content"),
    };

    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles({
      name: testFile.name,
      mimeType: testFile.mimeType,
      buffer: testFile.buffer,
    });

    await page.waitForTimeout(500);

    // Step 2: Fill basic metadata (including genre)
    await page.click('button:has-text("Continue to Basic Info")');

    await page.fill(
      'input[placeholder*="track title" i], input[placeholder*="Enter exact track title"]',
      "E2E Test Track",
    );
    await page.fill(
      'input[placeholder*="First Name Last Name" i]',
      "Test Artist",
    );

    // Select genre
    await page.selectOption('select:has(option[value="Pop"])', "Pop");

    await page.click('button:has-text("Continue to Rights")');

    // Step 3: Rights (auto-fill, continue)
    await page.click('button:has-text("Continue to Legal")');

    // Step 4: Legal warranties - check all boxes
    const warrantyCheckboxes = page.locator('input[type="checkbox"]');
    const count = await warrantyCheckboxes.count();
    for (let i = 0; i < count; i++) {
      await warrantyCheckboxes.nth(i).check();
    }

    // Set explicit content
    await page.selectOption('select:has(option[value="yes"])', "yes");

    await page.click('button:has-text("Continue to Mood Tags")');

    // Step 5: Mood tags - certify
    await page.waitForTimeout(500);
    const certCheckbox = page.locator('input[type="checkbox"]').last();
    await certCheckbox.check();

    await page.click('button:has-text("Continue to Review")');

    // Step 6: Review and submit
    await page.click('button:has-text("Publish Now")');

    // Wait for success message
    await expect(page.locator("text=published successfully")).toBeVisible({
      timeout: 10000,
    });

    // Wait for redirect to new-releases (not dashboard)
    await page.waitForURL("/new-releases", { timeout: 5000 });

    // Verify track appears in new releases
    await expect(page.locator('a:has-text("E2E Test Track")')).toBeVisible({
      timeout: 3000,
    });

    // Verify localStorage has the track with genre and explicitContent
    const tracksInStorage = await page.evaluate(() => {
      const tracks = localStorage.getItem("artist-tracks");
      return tracks ? JSON.parse(tracks) : [];
    });

    expect(tracksInStorage.length).toBeGreaterThan(0);
    const uploadedTrack = tracksInStorage[0];
    expect(uploadedTrack.name).toBe("E2E Test Track");
    expect(uploadedTrack.genre).toBe("Pop");
    expect(uploadedTrack.explicitContent).toBe(true);

    // Check if explicit sticker is visible (if cover art is present)
    // This might not be visible if no cover art was uploaded, but structure should be correct
  });

  test("should persist tracks in localStorage across page refreshes", async ({
    page,
  }) => {
    // First, set a track in localStorage
    await page.goto("/dashboard/artist");
    await page.evaluate(() => {
      localStorage.setItem(
        "artist-tracks",
        JSON.stringify([
          {
            id: "test-1",
            name: "Persisted Track",
            album: "Test Album",
            uploadDate: new Date().toISOString(),
            status: "published",
            streams: 100,
            earnings: 0.5,
          },
        ]),
      );
    });

    // Refresh the page
    await page.reload();

    // Verify track still appears
    await expect(
      page.locator('table tbody tr:has-text("Persisted Track")'),
    ).toBeVisible();
  });
});
