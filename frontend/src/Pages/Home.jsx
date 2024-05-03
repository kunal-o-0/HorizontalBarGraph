import { useState } from "react";
import NavBar from "../Components/NavBar";
import SummaryTable from "../Components/SummaryTable";
import BarGraph from "../Components/BarGraph";

function Home() {
  //  keeps track of start date&time
  const [startDateTime, setStartDateTime] = useState(new Date(Date.now()));
  //  to store frequency
  const [frequency, setFrequency] = useState(3600000);
  //  stores inputted date
  const [date, setDate] = useState(undefined);
  //  stores inputted time
  const [time, setTime] = useState(undefined);

  /**
   *  function to set start date&time using user's inputted date, time
   */
  const setStart = () => {
    if (!date || !time) alert("Invalid date and time!");
    else setStartDateTime(new Date(Date.parse(date + "T" + time + "Z"))); //  "Z" tells that time is in UTC
  };

  return (
    <div>
      {/* 
          Following div is top bar and it contains heading, navigation bar
      */}
      <div
        style={{
          position: "sticky",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          paddingLeft: "10px",
          paddingRight: "10px",
          width: "100%",
          top: "0px",
          backgroundColor: "#ffdddd",
          boxShadow: "0px 3px 25px gray",
        }}
      >
        <div>
          <h1>Home</h1>
        </div>
        {/* 
            Following div contains only nav links
        */}
        <div style={{ marginLeft: "auto" }}>
          <NavBar frequency={frequency} setFrequency={setFrequency} />
        </div>
      </div>
      {/* 
          Following div is container for input from user (date, time)
      */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: "90px",
          marginTop: "30px",
        }}
      >
        <label
          style={{
            fontFamily: "sans-serif",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          Start date & time:
        </label>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <input
              type="date"
              id="date"
              name="date"
              onChange={(e) => {
                setDate(e.target.value);
              }}
              style={{ margin: "5px" }}
            />
            <input
              type="time"
              id="time"
              name="time"
              onChange={(e) => {
                setTime(e.target.value + ":00");
              }}
              style={{ margin: "5px" }}
            />
          </div>
          <button
            style={{
              width: "50%",
              height: "25px",
              margin: "5px",
              border: "none",
              borderRadius: "5px",
              color: "white",
              fontSize: "14px",
              backgroundColor: "blue",
            }}
            id="submit-date-time"
            onClick={setStart}
          >
            SET
          </button>
        </div>
      </div>
      <div
        style={{
          marginTop: "50px",
          textAlign: "center",
          fontSize: "22px",
          fontWeight: "600",
          letterSpacing: "0.7px",
          paddingTop: "15px",
          borderTop: "5px solid gray",
          borderRadius: "10px",
        }}
      >
        Graph Plot
      </div>
      <div style={{ width: "100%", marginTop: "10px" }}>
        <BarGraph startDateTime={startDateTime} frequency={frequency} />
      </div>
      <div style={{ marginTop: "60px", textAlign: "center", width: "100%" }}>
        <SummaryTable startDateTime={startDateTime} frequency={frequency} />
      </div>
    </div>
  );
}

export default Home;
