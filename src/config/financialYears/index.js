import fy2324 from "./fy2324.js";
import fy2425 from "./fy2425.js";
import fy2526 from "./fy2526.js";
import fy2627 from "./fy2627.js";
import fy2728 from "./fy2728.js";

export const financialYears = [fy2728, fy2627, fy2526, fy2425, fy2324];

export const financialYearsMap = {
  [fy2728.id]: fy2728,
  [fy2627.id]: fy2627,
  [fy2526.id]: fy2526,
  [fy2425.id]: fy2425,
  [fy2324.id]: fy2324,
};

export const getCurrentFinancialYearId = (date = new Date()) => {
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth(); // 0 = Jan, 6 = Jul
  const startYear = currentMonth >= 6 ? currentYear : currentYear - 1;
  const endYear = startYear + 1;
  const startYearShort = String(startYear).slice(-2);
  const endYearShort = String(endYear).slice(-2);
  return `FY${startYearShort}${endYearShort}`;
};

export const getCurrentFinancialYear = (date = new Date()) => {
  const currentFyId = getCurrentFinancialYearId(date);
  return financialYearsMap[currentFyId] || financialYears[0] || fy2425;
};

export const defaultFinancialYear = getCurrentFinancialYear();

export const getFinancialYear = (id) => {
  return financialYearsMap[id] || defaultFinancialYear;
};

export { fy2324, fy2425, fy2526, fy2627, fy2728 };
export default financialYearsMap;
