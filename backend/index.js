const express = require("express");
const config = require("./config.json");
const app = express();
const cors = require("cors");
const MachineDataRouter = require("./Controllers/MachineDataController");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.write("Hello");
  res.end();
});

app.use("/machine-data", MachineDataRouter);

app.listen(config.server.PORT, () => {
  console.log(
    `Server started listening on PORT ${config.server.PORT}, to access use http://localhost:${config.server.PORT}/`
  );
});
