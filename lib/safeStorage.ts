// Issue-5: Safe storage wrapper with quota error handling for all stores
// This module provides a safe localStorage wrapper that handles quota exceeded errors

export function createSafeStorage(): Storage {
  try {
    // Test if localStorage is available
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return localStorage;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.warn('localStorage quota exceeded, falling back to sessionStorage');
      return sessionStorage;
    }
    // If localStorage is not available at all, use sessionStorage
    if (error instanceof DOMException && (error.name === 'SecurityError' || error.name === 'ReferenceError')) {
      console.warn('localStorage not available, using sessionStorage');
      return sessionStorage;
    }
    throw error;
  }
}