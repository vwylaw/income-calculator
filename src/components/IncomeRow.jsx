import { NumericFormat } from "react-number-format";

const IncomeRow = ({ frequency, data = {}, isContract, onValueChange }) => {
  const { id: freqId, rowHeader, isYearRow } = frequency;

  const handleInput = (values, sourceInfo, fieldType) => {
    if (sourceInfo.source === "event") {
      onValueChange(values.floatValue || 0, fieldType);
    }
  };

  return (
    <tr>
      <td className="RowHeader">
        {isYearRow && isContract ? (
          <>
            {rowHeader} <br />{" "}
            <span className="SmallerText">
              (Only year row is reduced by # of days off)
            </span>
          </>
        ) : (
          rowHeader
        )}
      </td>
      <td id={`${freqId}AfterTaxIncome`}>
        <NumericFormat
          displayType="text"
          value={data.afterTaxIncome}
          thousandSeparator=","
          prefix={"$"}
        />
      </td>
      <td id={`${freqId}IncomeTax`}>
        <NumericFormat
          displayType="text"
          value={data.incomeTax}
          thousandSeparator=","
          prefix={"$"}
        />
      </td>
      <td id={`${freqId}BaseIncome`}>
        <NumericFormat
          type="text"
          value={data.baseIncome}
          thousandSeparator=","
          prefix={"$"}
          onValueChange={(values, sourceInfo) =>
            handleInput(values, sourceInfo, "baseIncome")
          }
        />
      </td>
      <td id={`${freqId}Super`}>
        <NumericFormat
          displayType="text"
          value={data.super}
          thousandSeparator=","
          prefix={"$"}
        />
      </td>
      <td id={`${freqId}Package`}>
        <NumericFormat
          type="text"
          value={data.package}
          thousandSeparator=","
          prefix={"$"}
          onValueChange={(values, sourceInfo) =>
            handleInput(values, sourceInfo, "package")
          }
        />
      </td>
      {isContract && (
        <td id={`${freqId}GST`}>
          <NumericFormat
            displayType="text"
            value={data.gst}
            thousandSeparator=","
            prefix={"$"}
          />
        </td>
      )}
      {isContract && (
        <td id={`${freqId}Total`}>
          <NumericFormat
            type="text"
            value={data.total}
            thousandSeparator=","
            prefix={"$"}
            onValueChange={(values, sourceInfo) =>
              handleInput(values, sourceInfo, "total")
            }
          />
        </td>
      )}
    </tr>
  );
};

export default IncomeRow;
