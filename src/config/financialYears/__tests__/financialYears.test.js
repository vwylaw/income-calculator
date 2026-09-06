import { describe, it, expect } from "vitest";
import {
  financialYears,
  financialYearsMap,
  defaultFinancialYear,
  getFinancialYear,
  getCurrentFinancialYearId,
  getCurrentFinancialYear,
} from "../index.js";

describe("Financial Year Configurations & Registry", () => {
  it("should contain all 5 registered financial years", () => {
    expect(financialYears.length).toBe(5);
    const ids = financialYears.map((fy) => fy.id);
    expect(ids).toContain("FY2324");
    expect(ids).toContain("FY2425");
    expect(ids).toContain("FY2526");
    expect(ids).toContain("FY2627");
    expect(ids).toContain("FY2728");
  });

  it("should have correct schema and valid properties for every financial year", () => {
    for (const fy of financialYears) {
      expect(fy.id).toMatch(/^FY\d{4}$/);
      expect(typeof fy.label).toBe("string");
      expect(typeof fy.shortLabel).toBe("string");
      expect(typeof fy.superRate).toBe("number");
      expect(fy.superRate).toBeGreaterThan(0);
      expect(Array.isArray(fy.taxBrackets)).toBe(true);
      expect(fy.taxBrackets.length).toBeGreaterThanOrEqual(4);

      // Verify brackets integrity
      expect(fy.taxBrackets[0].min).toBe(0);
      expect(fy.taxBrackets[0].flat).toBe(0);
      expect(fy.taxBrackets[0].percent).toBe(0);

      for (let i = 0; i < fy.taxBrackets.length; i++) {
        const bracket = fy.taxBrackets[i];
        expect(bracket.min).toBeGreaterThanOrEqual(0);
        expect(bracket.percent).toBeGreaterThanOrEqual(0);
        expect(bracket.flat).toBeGreaterThanOrEqual(0);
        expect(bracket.over).toBeGreaterThanOrEqual(0);

        if (i < fy.taxBrackets.length - 1) {
          expect(bracket.max).toBeGreaterThan(bracket.min);
          // Next bracket min should connect with current max
          expect(fy.taxBrackets[i + 1].min).toBe(bracket.max + 1);
        }
      }
    }
  });

  it("should verify accurate superannuation rates", () => {
    expect(financialYearsMap["FY2324"].superRate).toBe(0.11);
    expect(financialYearsMap["FY2425"].superRate).toBe(0.115);
    expect(financialYearsMap["FY2526"].superRate).toBe(0.12);
    expect(financialYearsMap["FY2627"].superRate).toBe(0.12);
    expect(financialYearsMap["FY2728"].superRate).toBe(0.12);
  });

  describe("getCurrentFinancialYearId", () => {
    it("should resolve FY2324 before 1 July 2024", () => {
      expect(getCurrentFinancialYearId(new Date(2024, 5, 30, 23, 59, 59))).toBe("FY2324");
    });

    it("should resolve FY2425 on 1 July 2024", () => {
      expect(getCurrentFinancialYearId(new Date(2024, 6, 1, 0, 0, 0))).toBe("FY2425");
    });

    it("should resolve FY2425 in mid financial year (Dec 2024 / Jan 2025)", () => {
      expect(getCurrentFinancialYearId(new Date(2024, 11, 25, 12, 0, 0))).toBe("FY2425");
      expect(getCurrentFinancialYearId(new Date(2025, 0, 15, 12, 0, 0))).toBe("FY2425");
    });

    it("should resolve FY2526 starting 1 July 2025", () => {
      expect(getCurrentFinancialYearId(new Date(2025, 6, 1))).toBe("FY2526");
    });

    it("should resolve FY2627 starting 1 July 2026", () => {
      expect(getCurrentFinancialYearId(new Date(2026, 6, 1))).toBe("FY2627");
    });

    it("should resolve FY2728 starting 1 July 2027", () => {
      expect(getCurrentFinancialYearId(new Date(2027, 6, 1))).toBe("FY2728");
    });
  });

  describe("getCurrentFinancialYear", () => {
    it("should return the financial year object matching the current date", () => {
      const fy = getCurrentFinancialYear(new Date(2024, 6, 1));
      expect(fy.id).toBe("FY2425");
      expect(fy.superRate).toBe(0.115);
    });

    it("should fallback gracefully if date resolves to unconfigured year", () => {
      const fy = getCurrentFinancialYear(new Date(2099, 6, 1));
      expect(fy).toBeDefined();
      expect(fy.id).toBeDefined();
    });
  });

  describe("getFinancialYear", () => {
    it("should return the correct config for a valid ID", () => {
      const fy = getFinancialYear("FY2324");
      expect(fy.id).toBe("FY2324");
      expect(fy.superRate).toBe(0.11);
    });

    it("should fallback to defaultFinancialYear when given an unknown ID", () => {
      const fy = getFinancialYear("UNKNOWN_YEAR");
      expect(fy).toBe(defaultFinancialYear);
    });
  });
});
