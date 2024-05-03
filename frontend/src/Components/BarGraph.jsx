import { useEffect, useState } from "react";
import { filterByTime } from "../Services/MachineDataService";

/**
 *  Will be used to create object of data for plotting graph
 * @param {*} type integer(machine status and -1 for empty)
 * @param {*} value integer(in percentage)
 * @returns Object
 */
const protoGraphItem = (type, value) => {
  return { type: type, value: value };
};

function BarGraph({ startDateTime, frequency }) {
  //  this state contains filtered data
  const [filteredData, setFilteredData] = useState([]);
  //   this state represents the data which needs to be plotted in graph
  const [graphData, setGraphData] = useState([]);

  /**
   *    this hook is used to update filtered data according to changes in frequency and start date&time
   *    filteredData state is set
   */
  useEffect(() => {
    if (!startDateTime) alert("Please enter date and time");
    else {
      filterByTime(startDateTime.toISOString(), frequency).then((data) =>
        setFilteredData(data)
      );
    }
  }, [frequency, startDateTime]);

  /**
   *    this useEffect will be used to set only "GRAPH DATA"
   *    graphData state is set inside this hook
   */
  useEffect(() => {
    setGraphData(
      filteredData.map((item) => {
        return protoGraphItem(
          item.type,
          (item.countMilliSec / frequency) * 100
        );
      })
    );
  }, [filteredData, frequency]);

  return (
    // (container 3) Following div outermost container for all the data of bar graph component
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "10px",
      }}
    >
      {/* 
            (container 2) Following div is container for container 1 
        */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        {/* 
            (container 1) Following div contains all three containers for coloured boxes and text  
        */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          {/* 
                Following div contains coloured box and its text
            */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: "#b82121",
                border: "1px solid gray",
              }}
            ></div>
            <span style={{ marginLeft: "5px" }}>- Data does not exits</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: "yellow",
                border: "1px solid gray",
              }}
            ></div>
            <span style={{ marginLeft: "5px" }}>- Machine status=0</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: "green",
                border: "1px solid gray",
              }}
            ></div>
            <span style={{ marginLeft: "5px" }}>- Machine status=1</span>
          </div>
        </div>
      </div>
      {/* 
            Following div for DISPLAYING GRAPH 
        */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        {/* 
            conditional rendering
            if graph data array is empty then display message that data is unavailable
            else map data from "graphData"
        */}
        {graphData.length === 0 ? (
          <div style={{ fontWeight: "bold", color: "#b82121" }}>
            No data to show
          </div>
        ) : (
          graphData.map((item) => {
            return (
              <div
                style={{
                  width: `${item.value}%`,
                  height: "20px",
                  backgroundColor:
                    item.type === -1
                      ? "red"
                      : item.type === 0
                      ? "yellow"
                      : "green",
                }}
              ></div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default BarGraph;
