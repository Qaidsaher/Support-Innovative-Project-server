const mongoose = require("mongoose");

const ProcessSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Custom ID
  hostname: { type: String, required: true }, // Machine name
  startTime: { type: Date, required: true }, // UTC Time
  startTimeLocal: { type: String, required: true }, // Local Time String
  cmdLine: { type: Object, required: true }, // Command line details
  pid: { type: Number, required: true }, // Process ID
  buildinfo: { type: Object, required: true } // Additional information
});

// Create the model
const Process = mongoose.model("Process", ProcessSchema);

module.exports = Process;
