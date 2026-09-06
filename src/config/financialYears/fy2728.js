const fy2728 = {
  id: "FY2728",
  label: "FY2027-28 (1 July 27 - 30 June 28)",
  shortLabel: "FY2728",
  financialYear: "2027-2028",
  startDate: "2027-07-01",
  endDate: "2028-06-30",
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
      percent: 0.14,
      over: 18200,
    },
    {
      min: 45001,
      max: 135000,
      flat: 3752,
      percent: 0.3,
      over: 45000,
    },
    {
      min: 135001,
      max: 190000,
      flat: 30752,
      percent: 0.37,
      over: 135000,
    },
    {
      min: 190001,
      max: Infinity,
      flat: 51102,
      percent: 0.45,
      over: 190000,
    },
  ],
};

export default fy2728;
