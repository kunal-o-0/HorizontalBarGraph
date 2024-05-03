const express = require("express");
const router = express.Router();
const MachineDataService = require("../Services/MachineDataService");

/**
 *  This will set content-type as "JSON" for all responses
 */
router.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

/**
 *  this will give all the data which is present
 */
router.get("/", (req, res, next) => {
  res.write(JSON.stringify({ payload: MachineDataService.getData() }));
  res.end();
});

/**
 * Prototype for body of request:
 * {
 *      startTimeStamp:"start timestamp <string>",
 *      frequency:"frequency in milliseconds <integer>"
 * }
 */
router.post("/filter-by-time", (req, res, next) => {
  //    collecting start timestamp and frequency desired
  /**
   * @type {{startTimeStamp:string,frequency:number}}
   */
  const body = req.body;
  let startTime = Date.parse(body.startTimeStamp);
  let frequency = body.frequency;

  res.write(
    JSON.stringify({
      payload: MachineDataService.filterByTime(startTime, frequency),
    })
  );
  res.end();
});

/**
 *  to get all machine data having machine status =1
 */
router.get("/get-1s", (req, res, next) => {
  res.write(JSON.stringify({ payload: MachineDataService.getAllOne() }));
  res.end();
});

/**
 *  to get all machine data having machine status =0
 */
router.get("/get-0s", (req, res, next) => {
  res.write(JSON.stringify({ payload: MachineDataService.getAllZero() }));
  res.end();
});

module.exports = router;
