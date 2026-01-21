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
<<<<<<< HEAD
  if (typeof window === "undefined") {
=======
  if (typeof window === 'undefined') {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    // Server-side: return mock storage
    return mockStorage;
  }

  try {
    // Test if localStorage is available
<<<<<<< HEAD
    const test = "__localStorage_test__";
=======
    const test = '__localStorage_test__';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return localStorage;
  } catch (error) {
<<<<<<< HEAD
    if (error instanceof DOMException && error.name === "QuotaExceededError") {
      console.warn(
        "localStorage quota exceeded, falling back to sessionStorage",
      );
      // Check sessionStorage is available too
      if (typeof sessionStorage !== "undefined") {
=======
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.warn('localStorage quota exceeded, falling back to sessionStorage');
      // Check sessionStorage is available too
      if (typeof sessionStorage !== 'undefined') {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        return sessionStorage;
      }
      return mockStorage;
    }
    // If localStorage is not available at all, try sessionStorage
<<<<<<< HEAD
    if (
      error instanceof DOMException &&
      (error.name === "SecurityError" || error.name === "ReferenceError")
    ) {
      console.warn("localStorage not available, using sessionStorage");
      if (typeof sessionStorage !== "undefined") {
=======
    if (error instanceof DOMException && (error.name === 'SecurityError' || error.name === 'ReferenceError')) {
      console.warn('localStorage not available, using sessionStorage');
      if (typeof sessionStorage !== 'undefined') {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        return sessionStorage;
      }
      return mockStorage;
    }
    // Fallback to mock storage for any other error
    return mockStorage;
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
