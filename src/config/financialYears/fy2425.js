const fy2425 = {
  id: "FY2425",
  label: "FY2024-25 (1 July 24 - 30 June 25)",
  shortLabel: "FY2425",
  financialYear: "2024-2025",
  startDate: "2024-07-01",
  endDate: "2025-06-30",
  superRate: 0.115,
  taxBrackets: [
    {
      min: 0,
      max: 18200,
      flat: 0,
      percent: 0,
      over: 0,
    },
    {
      min: 18201,
      max: 45000,
      flat: 0,
      percent: 0.16,
      over: 18200,
    },
    {
      min: 45001,
      max: 135000,
      flat: 4288,
      percent: 0.3,
      over: 45000,
    },
    {
      min: 135001,
      max: 190000,
      flat: 31288,
      percent: 0.37,
      over: 135000,
    },
    {
      min: 190001,
      max: Infinity,
      flat: 51638,
      percent: 0.45,
      over: 190000,
    },
  ],
};

export default fy2425;
