const fy2627 = {
  id: "FY2627",
  label: "FY2026-27 (1 July 26 - 30 June 27)",
  shortLabel: "FY2627",
  financialYear: "2026-2027",
  startDate: "2026-07-01",
  endDate: "2027-06-30",
  superRate: 0.12,
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
      percent: 0.15,
      over: 18200,
    },
    {
      min: 45001,
      max: 135000,
      flat: 4020,
      percent: 0.3,
      over: 45000,
    },
    {
      min: 135001,
      max: 190000,
      flat: 31020,
      percent: 0.37,
      over: 135000,
    },
    {
      min: 190001,
      max: Infinity,
      flat: 51370,
      percent: 0.45,
      over: 190000,
    },
  ],
};

export default fy2627;
