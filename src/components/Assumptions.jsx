import { financialYears } from "../config/financialYears/index.js";
import { useGlobalContext } from "./GlobalContext.jsx";
import {
  WORK_HOURS_PER_DAY,
  WORK_DAYS_PER_WEEK,
  WEEKS_PER_YEAR,
  WORK_DAYS_PER_YEAR,
} from "../constants/workSchedule.js";

const Assumptions = () => {
  const { year, GST } = useGlobalContext();

  return (
    <div className="Assumptions">
      <h5>Assumptions & Rates applied:</h5>
      <p className="SmallText">
        {WEEKS_PER_YEAR} weeks in a year, {WORK_DAYS_PER_WEEK} work days in a week,{" "}
        {WORK_HOURS_PER_DAY} work hours in a day, total {WORK_DAYS_PER_YEAR} work days in a year
      </p>
      <p className="SmallText">
        Only Year row is adjusted by number of days off for contractors
      </p>
      <p className="SmallText">Country: Australia</p>
      <p className="SmallText">
        Financial Year for income tax calculation purpose: {year}
      </p>
      <p className="SmallText">GST: {GST * 100}%</p>
      <p className="SmallText">Super guarantee:</p>
      {financialYears.map((fy) => (
        <p key={fy.id} className="SmallText">
          {" "}
          - {fy.shortLabel}: {(fy.superRate * 100).toFixed(1).replace(/\.0$/, "")}%
        </p>
      ))}
    </div>
  );
};

export default Assumptions;
