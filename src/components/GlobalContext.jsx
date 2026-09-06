import { createContext, useContext, useState, useMemo, useCallback } from "react";
import { defaultFinancialYear, getFinancialYear } from "../config/financialYears/index.js";
import { calculateAllPeriods, convertToHourlyBase } from "../utils/incomeCalculator.js";

const GlobalContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => useContext(GlobalContext);

const AppContext = ({ children }) => {
  const [hourlyBase, setHourlyBase] = useState(0);
  const [year, setYear] = useState(defaultFinancialYear.id);
  const [GST, setGST] = useState(0.1);
  const [numDayOff, setNumDayOff] = useState(9);
  const [isContract, setIsContract] = useState(true);

  const selectedYearConfig = useMemo(() => getFinancialYear(year), [year]);
  const superRate = selectedYearConfig.superRate;

  const incomeData = useMemo(() => {
    return calculateAllPeriods(hourlyBase, {
      superRate,
      numDayOff,
      yearId: year,
      GST,
      isContract,
    });
  }, [hourlyBase, superRate, numDayOff, year, GST, isContract]);

  const updateIncome = useCallback(
    (enteredValue, frequency, fieldType) => {
      const newHourlyBase = convertToHourlyBase(enteredValue, frequency, fieldType, {
        superRate,
        GST,
      });
      setHourlyBase(newHourlyBase);
    },
    [superRate, GST]
  );

  const value = {
    hourlyBase,
    setHourlyBase,
    year,
    setYear,
    superRate,
    GST,
    setGST,
    numDayOff,
    setNumDayOff,
    isContract,
    setIsContract,
    incomeData,
    hourly: incomeData.hourly,
    daily: incomeData.daily,
    weekly: incomeData.weekly,
    fortnightly: incomeData.fortnightly,
    monthly: incomeData.monthly,
    yearly: incomeData.yearly,
    updateIncome,
    selectedYearConfig,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
