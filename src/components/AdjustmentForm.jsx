import { financialYears } from "../config/financialYears/index.js";
import { useGlobalContext } from "./GlobalContext.jsx";

const AdjustmentForm = () => {
  const {
    year,
    setYear,
    superRate,
    numDayOff,
    setNumDayOff,
    isContract,
    setIsContract,
  } = useGlobalContext();

  return (
    <form className="AdjustmentForm" onSubmit={(e) => e.preventDefault()}>
      <div className="AdjustmentFormField">
        <label htmlFor="employment-type">Type of Employment</label>
        <select
          id="employment-type"
          value={isContract ? "Contract" : "Permanent, ongoing, full-time"}
          onChange={(e) => setIsContract(e.target.value === "Contract")}
        >
          <option value="Contract">Contract</option>
          <option value="Permanent, ongoing, full-time">Permanent, ongoing, full-time</option>
        </select>
      </div>

      {isContract && (
        <div className="AdjustmentFormField">
          <label htmlFor="num-days-off">
            Number of days off in the year (include public holidays)
          </label>
          <input
            id="num-days-off"
            type="number"
            value={numDayOff}
            onChange={(e) => setNumDayOff(parseFloat(e.target.value) || 0)}
          />
        </div>
      )}

      <div className="AdjustmentFormField">
        <label>Superannuation rate (%)</label>
        <p>{(superRate * 100).toFixed(1).replace(/\.0$/, "")}%</p>
      </div>

      <div className="AdjustmentFormField">
        <label htmlFor="financial-year">Financial year (for income tax purpose)</label>
        <select
          id="financial-year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          {financialYears.map((fy) => (
            <option key={fy.id} value={fy.id}>
              {fy.label}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default AdjustmentForm;
