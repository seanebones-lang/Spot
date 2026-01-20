import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSpotifySearch } from "@/hooks/useSpotifySearch";

// Mock fetch
global.fetch = vi.fn();

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useSpotifySearch", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch search results", async () => {
    const mockData = {
      tracks: [
        {
          id: "1",
          name: "Test Track",
          artist: "Test Artist",
          album: "Test Album",
        },
      ],
      total: 1,
      limit: 20,
      offset: 0,
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    } as Response);

    const { result } = renderHook(() => useSpotifySearch("test"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.tracks).toHaveLength(1);
    expect(result.current.data?.tracks[0].name).toBe("Test Track");
  });

  it("should not fetch when query is empty", () => {
    const { result } = renderHook(() => useSpotifySearch(""), {
      wrapper: createWrapper(),
    });

    expect(result.current.isEnabled).toBe(false);
    expect(fetch).not.toHaveBeenCalled();
  });
});
