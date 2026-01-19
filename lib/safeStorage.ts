// Issue-5: Safe storage wrapper with quota error handling for all stores
// This module provides a safe localStorage wrapper that handles quota exceeded errors
// Also handles SSR/SSG where localStorage is not available

// Mock storage for server-side rendering
const mockStorage: Storage = {
  length: 0,
  clear: () => {},
  getItem: () => null,
  key: () => null,
  removeItem: () => {},
  setItem: () => {},
};

export function createSafeStorage(): Storage {
  // Check if we're in a browser environment
  if (typeof window === "undefined") {
    // Server-side: return mock storage
    return mockStorage;
  }

  try {
    // Test if localStorage is available
    const test = "__localStorage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return localStorage;
  } catch (error) {
    if (error instanceof DOMException && error.name === "QuotaExceededError") {
      console.warn(
        "localStorage quota exceeded, falling back to sessionStorage",
      );
      // Check sessionStorage is available too
      if (typeof sessionStorage !== "undefined") {
        return sessionStorage;
      }
      return mockStorage;
    }
    // If localStorage is not available at all, try sessionStorage
    if (
      error instanceof DOMException &&
      (error.name === "SecurityError" || error.name === "ReferenceError")
    ) {
      console.warn("localStorage not available, using sessionStorage");
      if (typeof sessionStorage !== "undefined") {
        return sessionStorage;
      }
      return mockStorage;
    }
    // Fallback to mock storage for any other error
    return mockStorage;
  }
}
