import { getFinancialYear } from "../config/financialYears/index.js";
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
} from "../constants/workSchedule.js";

export const FREQUENCIES = [
  { id: "hourly", label: "Hour", rowHeader: "Hour", hoursMultiplier: 1, isYearRow: false },
  { id: "daily", label: "Day", rowHeader: "Day", hoursMultiplier: WORK_HOURS_PER_DAY, isYearRow: false },
  { id: "weekly", label: "Week", rowHeader: "Week", hoursMultiplier: WORK_HOURS_PER_WEEK, isYearRow: false },
  { id: "fortnightly", label: "Fortnight", rowHeader: "Fortnight", hoursMultiplier: WORK_HOURS_PER_FORTNIGHT, isYearRow: false },
  { id: "monthly", label: "Month", rowHeader: "Month", hoursMultiplier: WORK_HOURS_PER_MONTH, isYearRow: false },
  { id: "yearly", label: "Year", rowHeader: "Year", hoursMultiplier: WORK_HOURS_PER_YEAR, isYearRow: true },
];

/**
 * Calculates annual income tax for a given taxable income and financial year.
 */
export const calculateAnnualTax = (yearlyTaxableIncome, yearId) => {
  const fyConfig = getFinancialYear(yearId);
  const taxBrackets = fyConfig ? fyConfig.taxBrackets : [];

  for (let i = 0; i < taxBrackets.length; i++) {
    const bracket = taxBrackets[i];
    const isLastBracket = i === taxBrackets.length - 1;
    const isOverMin =
      yearlyTaxableIncome >= bracket.min ||
      (bracket.min === 0 && yearlyTaxableIncome >= 0);
    const isUnderMax =
      bracket.max === 0 ||
      bracket.max === Infinity ||
      bracket.max === undefined ||
      yearlyTaxableIncome <= bracket.max;

    if ((isOverMin && isUnderMax) || (isLastBracket && yearlyTaxableIncome >= bracket.min)) {
      const rawTax =
        bracket.flat +
        bracket.percent * Math.max(0, yearlyTaxableIncome - bracket.over);
      return Math.round(rawTax * 100) / 100;
    }
  }

  return 0;
};

/**
 * Converts any user input (base, package, or total at any frequency) to hourly base income.
 */
export const convertToHourlyBase = (value, frequency, fieldType, { superRate = 0.115, GST = 0.1 } = {}) => {
  const numericValue = parseFloat(value) || 0;
  if (numericValue <= 0) return 0;

  // 1. Remove GST and Super to get the base income for that period
  let periodBase = numericValue;
  if (fieldType === "total") {
    periodBase = numericValue / (1 + GST) / (1 + superRate);
  } else if (fieldType === "package") {
    periodBase = numericValue / (1 + superRate);
  }

  // 2. Convert period base to hourly base
  switch (frequency) {
    case "hourly":
      return periodBase;
    case "daily":
      return periodBase / WORK_HOURS_PER_DAY;
    case "weekly":
      return periodBase / WORK_HOURS_PER_WEEK;
    case "fortnightly":
      return periodBase / WORK_HOURS_PER_FORTNIGHT;
    case "monthly":
      return (periodBase * MONTHS_PER_YEAR) / WORK_HOURS_PER_YEAR;
    case "yearly":
      return periodBase / WORK_HOURS_PER_YEAR;
    default:
      return periodBase;
  }
};

/**
 * Pure calculation function that produces formatted output objects for all frequencies.
 */
export const calculateAllPeriods = (
  hourlyBaseInput,
  {
    superRate = 0.115,
    numDayOff = 9,
    yearId,
    GST = 0.1,
    isContract = true,
  } = {}
) => {
  const hourlyBase = parseFloat(hourlyBaseInput) || 0;

  const factorOfReductionByDaysOff =
    isContract && hourlyBase > 0
      ? 1 - numDayOff / WORK_DAYS_PER_YEAR
      : 1;

  const result = {
    hourly: {},
    daily: {},
    weekly: {},
    fortnightly: {},
    monthly: {},
    yearly: {},
  };

  // Base income per frequency
  result.hourly.baseIncome = hourlyBase;
  result.daily.baseIncome = hourlyBase * WORK_HOURS_PER_DAY;
  result.weekly.baseIncome = hourlyBase * WORK_HOURS_PER_WEEK;
  result.fortnightly.baseIncome = hourlyBase * WORK_HOURS_PER_FORTNIGHT;
  result.monthly.baseIncome = (hourlyBase * WORK_HOURS_PER_YEAR) / MONTHS_PER_YEAR;
  result.yearly.baseIncome = hourlyBase * WORK_HOURS_PER_YEAR * factorOfReductionByDaysOff;

  // Super, package, GST, total
  for (const freq of Object.keys(result)) {
    const base = result[freq].baseIncome;
    const sup = base * superRate;
    const pkg = base + sup;
    const gstVal = pkg * GST;
    const tot = pkg + gstVal;

    result[freq].super = sup;
    result[freq].package = pkg;
    result[freq].gst = gstVal;
    result[freq].total = tot;
  }

  // Calculate taxes
  const standardAnnualBase = result.monthly.baseIncome * MONTHS_PER_YEAR;
  const annualTax = calculateAnnualTax(standardAnnualBase, yearId);
  const monthlyTax = annualTax / MONTHS_PER_YEAR;

  result.monthly.incomeTax = monthlyTax;
  result.hourly.incomeTax = (monthlyTax * MONTHS_PER_YEAR) / WORK_HOURS_PER_YEAR;
  result.daily.incomeTax = result.hourly.incomeTax * WORK_HOURS_PER_DAY;
  result.weekly.incomeTax = result.hourly.incomeTax * WORK_HOURS_PER_WEEK;
  result.fortnightly.incomeTax = result.hourly.incomeTax * WORK_HOURS_PER_FORTNIGHT;
  result.yearly.incomeTax = result.daily.incomeTax * WORK_DAYS_PER_WEEK * WEEKS_PER_YEAR * factorOfReductionByDaysOff;

  // After-tax income & string formatting
  const formattedResult = {};
  for (const freq of Object.keys(result)) {
    formattedResult[freq] = {};
    result[freq].afterTaxIncome = result[freq].baseIncome - result[freq].incomeTax;

    for (const key of Object.keys(result[freq])) {
      formattedResult[freq][key] = parseFloat(result[freq][key] || 0).toFixed();
    }
  }

  return formattedResult;
};
