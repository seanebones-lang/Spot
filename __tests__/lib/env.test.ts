import { describe, it, expect, beforeEach, afterEach } from "vitest";
const originalEnv = { ...process.env };
beforeEach(() => {
  process.env = { ...originalEnv, DATABASE_URL: "file:./dev.db" };
});
afterEach(() => {
  process.env = originalEnv;
});
describe("env", () => {
  it("loads", () => expect(process.env.DATABASE_URL).toBeDefined());
});
