const data = require("../Data/sample-data.json");

/**
 * This function will be used for finding list of data having desired timestamp
 * @param {string} timestamp represents timestamp in string format
 * @returns {(object[]|null)}
 */
const getListForTimestamp = (timestamp) => {
  let list = data.filter((value) => {
    let requiredTimestamp = new Date(Date.parse(timestamp));
    let dataTimespamp = new Date(Date.parse(value.ts));
    return dataTimespamp.getTime() == requiredTimestamp.getTime();
  });
  return list.length != 0 ? list : null;
};

/**
 * check for presence of passed timestamp
 * @param {number} time
 * @returns {(undefined|object)}
 */
const isTimeStampPresent = (time) => {
  return data.find((value) => Date.parse(value.ts) == time);
};

/**
 * Use to get data item if given timestamp is present or else undefined
 * @param {number} time Timestamp that we want to check
 * @param {number} index index in data array at which comparison is to be performed
 * @returns {(object|undefined)}
 */
const getItemWithTimestamp = (time, index) => {
  return index >= data.length
    ? undefined
    : Date.parse(data[index].ts) == time
    ? data[index]
    : undefined;
};

/**
 *  This function will sort the machine data according to timestamp(ts) in ascending order
 */
const sortMachineData = () => {
  data.sort((a, b) => Date.parse(a.ts) - Date.parse(b.ts));
};

module.exports = {
  getListForTimestamp,
  isTimeStampPresent,
  sortMachineData,
  getItemWithTimestamp,
};
