import { describe, it, expect } from "vitest";
import {
  WORK_HOURS_PER_DAY,
  WORK_DAYS_PER_WEEK,
  WEEKS_PER_YEAR,
  MONTHS_PER_YEAR,
  WORK_HOURS_PER_WEEK,
  WORK_HOURS_PER_FORTNIGHT,
  WORK_HOURS_PER_YEAR,
  WORK_HOURS_PER_MONTH,
  WORK_DAYS_PER_YEAR,
} from "../workSchedule.js";

describe("workSchedule constants", () => {
  it("should have correct base constants", () => {
    expect(WORK_HOURS_PER_DAY).toBe(8);
    expect(WORK_DAYS_PER_WEEK).toBe(5);
    expect(WEEKS_PER_YEAR).toBe(52);
    expect(MONTHS_PER_YEAR).toBe(12);
  });

  it("should have correct derived constants", () => {
    expect(WORK_HOURS_PER_WEEK).toBe(40);
    expect(WORK_HOURS_PER_FORTNIGHT).toBe(80);
    expect(WORK_HOURS_PER_YEAR).toBe(2080);
    expect(WORK_DAYS_PER_YEAR).toBe(260);
    expect(WORK_HOURS_PER_MONTH).toBeCloseTo(173.333, 2);
  });

  it("should maintain consistent mathematical relationships", () => {
    expect(WORK_HOURS_PER_DAY * WORK_DAYS_PER_WEEK).toBe(WORK_HOURS_PER_WEEK);
    expect(WORK_HOURS_PER_WEEK * 2).toBe(WORK_HOURS_PER_FORTNIGHT);
    expect(WORK_HOURS_PER_WEEK * WEEKS_PER_YEAR).toBe(WORK_HOURS_PER_YEAR);
    expect(WORK_DAYS_PER_WEEK * WEEKS_PER_YEAR).toBe(WORK_DAYS_PER_YEAR);
  });
});
