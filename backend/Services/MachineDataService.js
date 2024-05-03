/**
 *  MACHINE's DATA SERVICE
 *  Contains methods to get calculated data from machine data as per requirement
 */

const data = require("../Data/sample-data.json");
const machineDataUtil = require("../Util/MachineDataUtil");

machineDataUtil.sortMachineData();

/**
 *  Prototype for sending data/payload inside body of response for /filter-by-time
 *  @param {number} type used to represent if value is present in data or not (if not then pass -1)
 *  @param {string} start stores start time-stamp in string format
 *  @param {string} end stores end time-stamp in string format
 *  @param {number} countMilliSec for count of milliseconds present in "start" to "end"
 *  @returns {object} created object of filter item prototype
 */
const protoFilterItem = (type, start, end, countMilliSec) => {
  return { type: type, start: start, end: end, countMilliSec: countMilliSec };
};

/**
 *  for getting all the data
 *  @returns {object[]} our data from json file
 */
const getData = () => {
  return data;
};

/**
 * for filtering by start time and end time(=start_time+frequency)
 * @param {number} startTime represents start time in integer format
 * @param {number} frequency represents frequency/scale of time in integer format
 * @returns {object[]}
 */
const filterByTime = (startTime, frequency) => {
  //   filtering data according to start date-time and frequency
  console.log("Calculating, please wait...");
  let result = [];
  let endTime = startTime + frequency;

  //   start time(min timestamp) in machine data
  let machineDataStart = Date.parse(data[0].ts);

  //   end time(max timestamp) in machine data
  let machineDataEnd = Date.parse(data[data.length - 1].ts);

  let count = 0;
  //   index(or initial index) will be calculated from which checking of data item's "ts or timestamp" will start initially
  //  if start time < start time of data or > end time of data then simply assign 0
  //  else iterate till we don't get index at which start time = that of time of data item, then assign index of that item
  let index =
    startTime < Date.parse(data[0].ts) ||
    startTime > Date.parse(data[data.length - 1].ts)
      ? 0
      : (function () {
          //  this function iterates till equality of given start time and that of data item and returns index of that item
          let temp = 0;
          while (Date.parse(data[temp].ts) < startTime) {
            temp++;
          }
          return temp;
        })();

  for (let start = startTime; start <= endTime; ) {
    //  this will check if given start time is less than machine's data start timestamp
    //  if end time is < machine data's start time then break this loop
    if (start < machineDataStart) {
      let end = endTime < machineDataStart ? endTime : machineDataStart;
      result.push(
        protoFilterItem(
          -1,
          new Date(start).toISOString(),
          new Date(end).toISOString(),
          end - start
        )
      );
      start = end;
      if (start == endTime) break;
    }
    //   to check if start is greater than machine's data end timestamp (if so then skip to end time)
    else if (start > machineDataEnd) {
      result.push(
        protoFilterItem(
          -1,
          new Date(machineDataEnd + 1000).toISOString(),
          new Date(endTime).toISOString(),
          endTime - machineDataEnd
        )
      );
      start = endTime + 1000;
    }
    //  if current time is in the range of machine's data time
    else {
      //  store timestamp from data (if absent then undefined)
      let dataTimestamp = machineDataUtil.getItemWithTimestamp(start, index);

      //      1 or 0 CATEGORY
      //  this condition for timestamp is present
      if (dataTimestamp) {
        //  extract machine_sattus as type of data part
        let type = dataTimestamp.machine_status;
        //  maintain start time for sending while creating object of filter item
        let startTime = start;
        //   we have to check for machine status also for grouping related machine data together (i.e. data part)
        while (
          dataTimestamp &&
          dataTimestamp.machine_status == type &&
          start <= endTime
        ) {
          count += 1000;
          start += 1000;
          dataTimestamp = machineDataUtil.getItemWithTimestamp(start, ++index);
        }
        result.push(
          protoFilterItem(
            type,
            new Date(startTime).toISOString(),
            new Date(start).toISOString(),
            count
          )
        );
      }

      //   -1 CATEGORY
      //  when timestamp is not present in data
      else {
        //   consider type of data part as -1 (defines that DATA DOES NOT EXISTS FOR GIVEN TIMESTAMP)
        let type = -1;
        //    maintain start time
        let startTime = start;
        while (start < Date.parse(data[index].ts)) {
          count += 1000;
          start += 1000;
          //   dataTimestamp = machineDataUtil.getItemWithTimestamp(start, index);
        }
        //  pushing filter item object into result array
        result.push(
          protoFilterItem(
            type,
            new Date(startTime).toISOString(),
            new Date(start).toISOString(),
            count
          )
        );
      }
      //  reset count to 0 for next cycle
      count = 0;
    }
  }
  console.log("Data is ready to serve!");
  return result;
};

/**
 *  for getting all machine data while machine_status =1
 *  @returns {object[]} all data having machine status=1
 */
const getAllOne = () => {
  return data.filter((value) => value.machine_status == 1);
};

/**
 *  for getting all machine data while machine_status =0
 *  @returns {object[]} all data having machine status=0
 */
const getAllZero = () => {
  return data.filter((value) => value.machine_status == 0);
};

module.exports = { getData, filterByTime, getAllOne, getAllZero };
