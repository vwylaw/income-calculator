import { describe, it, expect } from "vitest";
import {
  calculateAnnualTax,
  convertToHourlyBase,
  calculateAllPeriods,
  FREQUENCIES,
} from "../incomeCalculator.js";

describe("incomeCalculator", () => {
  describe("FREQUENCIES definition", () => {
    it("should define all 6 required frequencies", () => {
      expect(FREQUENCIES.length).toBe(6);
      const ids = FREQUENCIES.map((f) => f.id);
      expect(ids).toEqual(["hourly", "daily", "weekly", "fortnightly", "monthly", "yearly"]);
    });
  });

  describe("calculateAnnualTax", () => {
    describe("FY2023-24", () => {
      it("should calculate correct tax across all brackets", () => {
        expect(calculateAnnualTax(0, "FY2324")).toBe(0);
        expect(calculateAnnualTax(18200, "FY2324")).toBe(0);
        expect(calculateAnnualTax(45000, "FY2324")).toBe(5092);
        expect(calculateAnnualTax(120000, "FY2324")).toBe(29467);
        expect(calculateAnnualTax(180000, "FY2324")).toBe(51667);
        expect(calculateAnnualTax(200000, "FY2324")).toBe(60667);
      });
    });

    describe("FY2024-25 (Stage 3 Tax Cuts)", () => {
      it("should calculate correct tax across all brackets", () => {
        expect(calculateAnnualTax(0, "FY2425")).toBe(0);
        expect(calculateAnnualTax(18200, "FY2425")).toBe(0);
        expect(calculateAnnualTax(45000, "FY2425")).toBe(4288);
        expect(calculateAnnualTax(135000, "FY2425")).toBe(31288);
        expect(calculateAnnualTax(190000, "FY2425")).toBe(51638);
        expect(calculateAnnualTax(200000, "FY2425")).toBe(56138);
      });
    });

    describe("FY2026-27 (15% rate on $18.2k-$45k)", () => {
      it("should calculate correct tax across all brackets", () => {
        expect(calculateAnnualTax(45000, "FY2627")).toBe(4020);
        expect(calculateAnnualTax(135000, "FY2627")).toBe(31020);
        expect(calculateAnnualTax(190000, "FY2627")).toBe(51370);
        expect(calculateAnnualTax(200000, "FY2627")).toBe(55870);
      });
    });

    describe("FY2027-28 (14% rate on $18.2k-$45k)", () => {
      it("should calculate correct tax across all brackets", () => {
        expect(calculateAnnualTax(45000, "FY2728")).toBe(3752);
        expect(calculateAnnualTax(135000, "FY2728")).toBe(30752);
        expect(calculateAnnualTax(190000, "FY2728")).toBe(51102);
        expect(calculateAnnualTax(200000, "FY2728")).toBe(55602);
      });
    });

    it("should return 0 for non-positive income", () => {
      expect(calculateAnnualTax(0, "FY2425")).toBe(0);
      expect(calculateAnnualTax(-5000, "FY2425")).toBe(0);
    });
  });

  describe("convertToHourlyBase", () => {
    const options = { superRate: 0.115, GST: 0.1 };

    it("should return 0 for 0, negative, or invalid input", () => {
      expect(convertToHourlyBase(0, "hourly", "baseIncome", options)).toBe(0);
      expect(convertToHourlyBase(-50, "hourly", "baseIncome", options)).toBe(0);
      expect(convertToHourlyBase(null, "hourly", "baseIncome", options)).toBe(0);
    });

    it("should convert base income correctly for all frequencies", () => {
      expect(convertToHourlyBase(100, "hourly", "baseIncome", options)).toBe(100);
      expect(convertToHourlyBase(800, "daily", "baseIncome", options)).toBe(100);
      expect(convertToHourlyBase(4000, "weekly", "baseIncome", options)).toBe(100);
      expect(convertToHourlyBase(8000, "fortnightly", "baseIncome", options)).toBe(100);
      expect(convertToHourlyBase(17333.333333333332, "monthly", "baseIncome", options)).toBeCloseTo(100, 2);
      expect(convertToHourlyBase(208000, "yearly", "baseIncome", options)).toBe(100);
    });

    it("should convert package income correctly", () => {
      // $100/hr base + 11.5% super = $111.50/hr package
      expect(convertToHourlyBase(111.5, "hourly", "package", options)).toBeCloseTo(100, 2);
      expect(convertToHourlyBase(111.5 * 8, "daily", "package", options)).toBeCloseTo(100, 2);
    });

    it("should convert total income (including GST & Super) correctly", () => {
      // $100/hr base * 1.115 * 1.10 = $122.65/hr total
      const totalHourly = 100 * 1.115 * 1.10;
      expect(convertToHourlyBase(totalHourly, "hourly", "total", options)).toBeCloseTo(100, 2);
      expect(convertToHourlyBase(totalHourly * 8, "daily", "total", options)).toBeCloseTo(100, 2);
    });
  });

  describe("calculateAllPeriods", () => {
    it("should calculate complete matrix for contractor with days off", () => {
      const result = calculateAllPeriods(100, {
        superRate: 0.115,
        numDayOff: 9,
        yearId: "FY2425",
        GST: 0.1,
        isContract: true,
      });

      expect(result.hourly.baseIncome).toBe("100");
      expect(result.hourly.super).toBe("12"); // 11.5 rounded
      expect(result.hourly.package).toBe("112"); // 111.5 rounded
      expect(result.hourly.gst).toBe("11"); // 11.15 rounded
      expect(result.hourly.total).toBe("123"); // 122.65 rounded

      expect(result.daily.baseIncome).toBe("800");
      expect(result.weekly.baseIncome).toBe("4000");
      expect(result.fortnightly.baseIncome).toBe("8000");
      expect(result.monthly.baseIncome).toBe("17333");

      // Yearly base adjusted for 9 days off: 208,000 * (1 - 9/260) = 200,800
      expect(result.yearly.baseIncome).toBe("200800");
    });

    it("should calculate full yearly base for permanent employee without days off reduction", () => {
      const result = calculateAllPeriods(100, {
        superRate: 0.115,
        numDayOff: 9,
        yearId: "FY2425",
        GST: 0.1,
        isContract: false,
      });

      expect(result.yearly.baseIncome).toBe("208000");
    });

    it("should gracefully handle 0 hourly base input", () => {
      const result = calculateAllPeriods(0, {
        superRate: 0.115,
        numDayOff: 9,
        yearId: "FY2425",
        GST: 0.1,
        isContract: true,
      });

      for (const freq of Object.keys(result)) {
        expect(result[freq].baseIncome).toBe("0");
        expect(result[freq].incomeTax).toBe("0");
        expect(result[freq].afterTaxIncome).toBe("0");
      }
    });
  });
});
