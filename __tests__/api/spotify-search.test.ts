import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET } from "@/app/api/spotify/search/route";
import { NextRequest } from "next/server";
import { searchTracks } from "@/lib/spotify";

// Mock the Spotify library
vi.mock("@/lib/spotify", () => ({
  searchTracks: vi.fn(),
}));

describe("Spotify Search API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return search results for valid query", async () => {
    const mockTracks = {
      tracks: {
        items: [
          {
            id: "1",
            name: "Test Track",
            artists: [{ name: "Test Artist", id: "artist1" }],
            album: {
              name: "Test Album",
              id: "album1",
              images: [{ url: "image.jpg" }],
            },
            duration_ms: 180000,
            uri: "spotify:track:1",
            explicit: false,
            popularity: 50,
          },
        ],
        total: 1,
        offset: 0,
      },
    };

    vi.mocked(searchTracks).mockResolvedValue(mockTracks as any);

    const request = new NextRequest(
      new URL("http://localhost:3001/api/spotify/search?q=test&limit=20"),
    );

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.tracks).toHaveLength(1);
    expect(data.tracks[0].name).toBe("Test Track");
    expect(data.total).toBe(1);
  });

  it("should return 400 for invalid query", async () => {
    const request = new NextRequest(
      new URL("http://localhost:3001/api/spotify/search?q="),
    );

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBeDefined();
  });

  it("should handle API errors gracefully", async () => {
    vi.mocked(searchTracks).mockRejectedValue(new Error("API Error"));

    const request = new NextRequest(
      new URL("http://localhost:3001/api/spotify/search?q=test"),
    );

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBeDefined();
  });
});
