const express = require("express");
const router = express.Router();
const Process = require("../models/ProcessModel");

// @desc    Get all processes
// @route   GET /api/processes
router.get("/", async (req, res) => {
  try {
    const processes = await Process.find();
    res.status(200).json(processes);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// @desc    Add a new process
// @route   POST /api/processes
router.post("/", async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Debugging line
    const { _id, hostname, startTime, startTimeLocal, cmdLine, pid, buildinfo } = req.body;

    if (!_id || !hostname || !startTime) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newProcess = new Process({
      _id,
      hostname,
      startTime,
      startTimeLocal,
      cmdLine,
      pid,
      buildinfo,
    });

    await newProcess.save();
    res.status(201).json({ message: "Process saved successfully", newProcess });
  } catch (error) {
    res.status(400).json({ message: "Error saving process", error });
  }
});

module.exports = router;
