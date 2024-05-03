import { useEffect, useState } from "react";
import "../Styles/freq-button.css";
const config = require("../config.json");
const MenuIcon = require("../Assets/menu-icon.png");

function NavBar({ frequency, setFrequency }) {
  //  keeps track of which button is active for frequency
  const [active, setActive] = useState("btn-1hrs");

  //  (boolean) stores if media query is matched or not (max-width:576px)
  const [ismatchesQuery, setIsMatchesQuery] = useState(
    window.matchMedia(`(max-width:${config.screen.small})`).matches
  );

  //  This useEffect will be used to set media-query and add event listener to it so that
  //  we can track if media-query is matched or not
  useEffect(() => {
    window
      .matchMedia(`(max-width:${config.screen.small})`)
      .addEventListener("change", (e) => setIsMatchesQuery(e.matches));
  }, [ismatchesQuery]);

  /**
   *  To get custom style according to active status of button
   *  @param {boolean} isSelected this boolean value is used to check whether button is active or not
   *  @returns {object} Custom style according to selected button
   */
  const getStyleforButton = (isSelected) => {
    if (!isSelected) return { backgroundColor: "#585858", color: "white" };
    else return { backgroundColor: "#2f2fff", color: "white" };
  };

  /**
   *  Handles click for frequency button and sets current active button(of frequency) accordingly
   *  @param {Event} e event object that is generted for some event
   */
  const handleClick = (e) => {
    setActive(e.target.id);
    switch (e.target.id) {
      //  1 Month
      case "btn-1month": {
        setFrequency(
          Date.parse("2024-02-01T00:00:00") - Date.parse("2024-01-01T00:00:00")
        );
        break;
      }
      //  1 Week
      case "btn-1week": {
        setFrequency(
          Date.parse("2024-01-08T00:00:00") - Date.parse("2024-01-01T00:00:00")
        );
        break;
      }
      //  24 hrs
      case "btn-24hrs": {
        setFrequency(
          Date.parse("2024-01-02T00:00:00") - Date.parse("2024-01-01T00:00:00")
        );
        break;
      }
      //  8 hrs
      case "btn-8hrs": {
        setFrequency(
          Date.parse("2024-01-01T08:00:00") - Date.parse("2024-01-01T00:00:00")
        );
        break;
      }
      //  1 hr
      case "btn-1hrs": {
        setFrequency(
          Date.parse("2024-01-01T01:00:00") - Date.parse("2024-01-01T00:00:00")
        );
        break;
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: ismatchesQuery ? "column" : "row-reverse",
        flexWrap: "wrap",
        alignItems: "center",
        padding: "10px",
      }}
    >
      {/* 
          Following div is for displaying menu icon image (i.e it's image container)
      */}
      <div style={{ width: "20px", height: "20px", margin: "5px" }}>
        <img src={MenuIcon} style={{ width: "100%", height: "100%" }} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: ismatchesQuery ? "column-reverse" : "row-reverse",
        }}
      >
        <button
          className="freq-button"
          id="btn-1month"
          onClick={(e) => handleClick(e)}
          style={getStyleforButton(active === "btn-1month" ? true : false)}
        >
          1 month
        </button>

        <button
          className="freq-button"
          id="btn-1week"
          onClick={(e) => handleClick(e)}
          style={getStyleforButton(active === "btn-1week" ? true : false)}
        >
          1 week
        </button>

        <button
          className="freq-button"
          id="btn-24hrs"
          onClick={(e) => handleClick(e)}
          style={getStyleforButton(active === "btn-24hrs" ? true : false)}
        >
          24 hrs
        </button>

        <button
          className="freq-button"
          id="btn-8hrs"
          onClick={(e) => handleClick(e)}
          style={getStyleforButton(active === "btn-8hrs" ? true : false)}
        >
          8 hrs
        </button>

        <button
          className="freq-button"
          id="btn-1hrs"
          onClick={(e) => handleClick(e)}
          style={getStyleforButton(active === "btn-1hrs" ? true : false)}
        >
          1 hrs
        </button>
      </div>
    </div>
  );
}

export default NavBar;
