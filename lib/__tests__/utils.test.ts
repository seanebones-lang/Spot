import { formatDuration, formatNumber, cn } from "../utils";

describe("utils", () => {
  describe("formatDuration", () => {
    it("should format milliseconds to MM:SS", () => {
      expect(formatDuration(0)).toBe("0:00");
      expect(formatDuration(1000)).toBe("0:01");
      expect(formatDuration(30000)).toBe("0:30");
      expect(formatDuration(60000)).toBe("1:00");
      expect(formatDuration(90000)).toBe("1:30");
      expect(formatDuration(125000)).toBe("2:05");
      expect(formatDuration(3661000)).toBe("61:01");
    });

    it("should handle large durations", () => {
      expect(formatDuration(3600000)).toBe("60:00"); // 1 hour
      expect(formatDuration(7200000)).toBe("120:00"); // 2 hours
    });

    it("should round down seconds", () => {
      expect(formatDuration(1599)).toBe("0:01");
      expect(formatDuration(1999)).toBe("0:01");
      expect(formatDuration(2000)).toBe("0:02");
    });

    it("should handle zero and negative values", () => {
      expect(formatDuration(0)).toBe("0:00");
      expect(formatDuration(-1000)).toBe("-1:-1"); // Edge case behavior (padStart doesn't work on negative)
    });
  });

  describe("formatNumber", () => {
    it("should format numbers less than 1000 as-is", () => {
      expect(formatNumber(0)).toBe("0");
      expect(formatNumber(1)).toBe("1");
      expect(formatNumber(100)).toBe("100");
      expect(formatNumber(999)).toBe("999");
    });

    it("should format numbers >= 1000 as K", () => {
      expect(formatNumber(1000)).toBe("1.0K");
      expect(formatNumber(1500)).toBe("1.5K");
      expect(formatNumber(9999)).toBe("10.0K");
      expect(formatNumber(50000)).toBe("50.0K");
      expect(formatNumber(123456)).toBe("123.5K");
      expect(formatNumber(999999)).toBe("1000.0K");
    });

    it("should format numbers >= 1000000 as M", () => {
      expect(formatNumber(1000000)).toBe("1.0M");
      expect(formatNumber(1500000)).toBe("1.5M");
      expect(formatNumber(12345678)).toBe("12.3M");
      expect(formatNumber(999999999)).toBe("1000.0M");
    });

    it("should handle edge cases", () => {
      expect(formatNumber(999)).toBe("999");
      expect(formatNumber(1000)).toBe("1.0K");
      expect(formatNumber(999999)).toBe("1000.0K");
      expect(formatNumber(1000000)).toBe("1.0M");
    });
  });

  describe("cn", () => {
    it("should combine class names", () => {
      expect(cn("foo", "bar")).toBe("foo bar");
      expect(cn("foo", null, "bar")).toBe("foo bar");
      expect(cn("foo", undefined, "bar")).toBe("foo bar");
    });

    it("should handle conditional classes", () => {
      expect(cn("foo", false && "bar", "baz")).toBe("foo baz");
      expect(cn("foo", true && "bar", "baz")).toBe("foo bar baz");
    });

    it("should handle arrays", () => {
      expect(cn(["foo", "bar"])).toBe("foo bar");
      expect(cn("foo", ["bar", "baz"])).toBe("foo bar baz");
    });

    it("should handle objects", () => {
      expect(cn({ foo: true, bar: false })).toBe("foo");
      expect(cn({ foo: true, bar: true })).toBe("foo bar");
    });

    it("should handle mixed inputs", () => {
      expect(cn("foo", ["bar"], { baz: true }, "qux")).toBe("foo bar baz qux");
    });

    it("should return empty string for no inputs", () => {
      expect(cn()).toBe("");
      expect(cn(null, undefined, false)).toBe("");
    });
  });
});
