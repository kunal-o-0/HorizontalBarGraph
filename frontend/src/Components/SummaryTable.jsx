import { useEffect, useState } from "react";
import "../Styles/summary-table.css";
const MachineDataService = require("../Services/MachineDataService");

function SummaryTable({ startDateTime, frequency }) {
  //  stores no of machine with status=1
  const [noOfOne, setNoOfOne] = useState(0);
  //  stores no of machine with status=0
  const [noOfZero, setNoOfZero] = useState(0);

  /**
   *  This useEffect will be used to set "noOfOne" and "noOfZero" states
   */
  useEffect(() => {
    MachineDataService.getOne().then((data) => {
      setNoOfOne(data.length);
    });
    MachineDataService.getZero().then((data) => {
      setNoOfZero(data.length);
    });
  }, [noOfOne, noOfZero]);

  return (
    <div>
      <h2>Summary</h2>
      <div style={{ margin: "10px", overflowX: "scroll" }}>
        <table>
          <thead>
            <tr>
              <th>Number of 0's</th>
              <th>Number of 1's</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{noOfOne}</td>
              <td>{noOfZero} </td>
              <td>{noOfOne + noOfZero} </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SummaryTable;
