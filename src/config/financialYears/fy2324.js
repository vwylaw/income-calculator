const fy2324 = {
  id: "FY2324",
  label: "FY2023-24 (1 July 23 - 30 June 24)",
  shortLabel: "FY2324",
  financialYear: "2023-2024",
  startDate: "2023-07-01",
  endDate: "2024-06-30",
  superRate: 0.11,
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
      percent: 0.19,
      over: 18200,
    },
    {
      min: 45001,
      max: 120000,
      flat: 5092,
      percent: 0.325,
      over: 45000,
    },
    {
      min: 120001,
      max: 180000,
      flat: 29467,
      percent: 0.37,
      over: 120000,
    },
    {
      min: 180001,
      max: Infinity,
      flat: 51667,
      percent: 0.45,
      over: 180000,
    },
  ],
};

export default fy2324;
