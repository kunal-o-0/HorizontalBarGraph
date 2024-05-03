import axios from "axios";
const config = require("../config.json");
const machineDataURL = config.server.baseURL + "/machine-data";

/**
 *  Used to get all data items having machine status=1
 *  @returns {object[]} Array of data item
 */
const getOne = async () => {
  try {
    let response = await axios.get(`${machineDataURL}/get-1s`);
    return response.data.payload;
  } catch (e) {
    console.log(e.message);
    return [];
  }
};

/**
 *  Used to get all data items having machine status=0
 *  @returns {object[]} Array of data item
 */
const getZero = async () => {
  try {
    let response = await axios.get(`${machineDataURL}/get-0s`);
    return response.data.payload;
  } catch (e) {
    console.log(e.message);
    return [];
  }
};

/**
 *  Used for getting filtered data by given start time till end time (start time + frequency)
 *  @param {string} startTimeStamp Start timestamp in string format
 *  @param {number} frequency Frequncy which is required
 */
const filterByTime = async (startTimeStamp, frequency) => {
  try {
    let response = await axios.post(`${machineDataURL}/filter-by-time`, {
      startTimeStamp: startTimeStamp,
      frequency: frequency,
    });

    return response.data.payload;
  } catch (e) {
    console.log(e.message);
    return [];
  }
};

export { getOne, getZero, filterByTime };
