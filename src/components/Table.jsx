import { useGlobalContext } from "./GlobalContext.jsx";
import { FREQUENCIES } from "../utils/incomeCalculator.js";
import AdjustmentForm from "./AdjustmentForm.jsx";
import Assumptions from "./Assumptions.jsx";
import IncomeRow from "./IncomeRow.jsx";

const Table = () => {
  const { incomeData, isContract, updateIncome } = useGlobalContext();

  return (
    <>
      <AdjustmentForm />
      <Assumptions />

      <table>
        <tbody>
          <tr>
            <th></th>
            <th title="What you get to keep">After-tax income</th>
            <th>Income Tax</th>
            <th title="Before-tax income">Base</th>
            <th>Super</th>
            <th title="Base income + super">Package</th>
            {isContract && <th title="relevant for contractors">GST</th>}
            {isContract && (
              <th title="package + GST, relevant for contractors">Total</th>
            )}
          </tr>
          <tr>
            <td></td>
            <td className="SmallerText">What you get to keep</td>
            <td></td>
            <td className="SmallerText">Before tax income</td>
            <td></td>
            <td className="SmallerText">Base + super</td>
            {isContract && (
              <td className="SmallerText">GST - contractors only</td>
            )}
            {isContract && (
              <td className="SmallerText">Package + GST - contractors only</td>
            )}
          </tr>
          {FREQUENCIES.map((freq) => (
            <IncomeRow
              key={freq.id}
              frequency={freq}
              data={incomeData[freq.id]}
              isContract={isContract}
              onValueChange={(val, fieldType) =>
                updateIncome(val, freq.id, fieldType)
              }
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
