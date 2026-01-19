/**
 * Jest Setup File
 * Global test configuration and mocks
 */

// Mock environment variables for tests
process.env.JWT_SECRET = 'test-jwt-secret-key-for-testing-minimum-32-characters-long';
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db';

// Suppress console logs during tests (optional)
// global.console = {
//   ...console,
//   log: jest.fn(),
//   debug: jest.fn(),
//   info: jest.fn(),
//   warn: jest.fn(),
//   error: jest.fn(),
// };
