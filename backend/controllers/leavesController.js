const { validationResult } = require("express-validator");
const { Leave, Student } = require("../models");
const { verifyToken } = require("../utils/auth");

// @route   request api/leave/request
// @desc    Request for leave
// @access  Public
exports.requestLeave = async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array(), success });
  }
  const { student, leaving_date, return_date, reason } = req.body;
  const today = new Date();
  // console.log(leaving_date);
  if (new Date(leaving_date) > new Date(return_date)) {
    return res.status(400).json({
      success,
      message: "Leaving date cannot be greater than return date",
    });
  } else if (new Date(leaving_date) < today) {
    return res
      .status(400)
      .json({ success, message: "Request cannot be made for past days" });
  }
  try {
    const leave = new Leave({
      student,
      leaving_date,
      return_date,
      reason,
    });
    await leave.save();
    success = true;
    return res
      .status(200)
      .json({ success, message: "Leave request sent successfully" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ success, message: "Server Error" });
  }
};

// @route   GET count of request api/leave/count
// @desc    Get all leave requests
// @access  Private
exports.countLeave = async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), success });
  }
  const { student } = req.body;
  try {
    let date = new Date();
    const list = await Leave.find({
      student,
      leaving_date: {
        $gte: new Date(date.getFullYear(), date.getMonth(), 1),
        $lte: new Date(date.getFullYear(), date.getMonth() + 1, 0),
      },
    });

    let approved = await Leave.find({
      student,
      status: "approved",
      leaving_date: {
        $gte: new Date(date.getFullYear(), date.getMonth(), 1),
        $lte: new Date(date.getFullYear(), date.getMonth() + 1, 0),
      },
    });

    let pending = await Leave.find({
      student,
      status: "pending",
      leaving_date: {
        $gte: new Date(date.getFullYear(), date.getMonth(), 1),
        $lte: new Date(date.getFullYear(), date.getMonth() + 1, 0),
      },
    });

    let days = 0;
    for (let i = 0; i < approved.length; i++) {
      days +=
        (new Date(approved[i].return_date) -
          new Date(approved[i].leaving_date)) /
        (1000 * 60 * 60 * 24);
    }

    let daysp = 0;
    for (let i = 0; i < pending.length; i++) {
      daysp +=
        (new Date(pending[i].return_date) - new Date(pending[i].leaving_date)) /
        (1000 * 60 * 60 * 24);
    }

    approved = days;
    pending = daysp;

    success = true;
    return res.status(200).json({ success, list, approved, pending });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ success, message: "Server Error" });
  }
};

// @route   GET api/leave/list
// @desc    Get all leave requests
// @access  Public
exports.listLeave = async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), success });
  }
  const { hostel } = req.body;
  try {
    const students = await Student.find({ hostel }).select("_id");
    const list = await Leave.find({
      student: { $in: students },
      status: "pending",
    }).populate("student", ["name", "room_no"]);
    const approved = await Leave.countDocuments({
      student: { $in: students },
      status: "approved",
      leaving_date: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        $lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
      },
    });
    const rejected = await Leave.countDocuments({
      student: { $in: students },
      status: "rejected",
      leaving_date: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        $lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
      },
    });
    success = true;
    return res.status(200).json({ success, list, approved, rejected });
  } catch (err) {
    // console.error(err.message);
    return res.status(500).json({ success, errors: [{ msg: "Server Error" }] });
  }
};

// @route   GET api/leave/update
// @desc    Update leave request
// @access  Public
exports.updateLeave = async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), success });
  }
  const { id, status } = req.body;
  try {
    const leave = await Leave.findByIdAndUpdate(id, { status });
    success = true;
    return res.status(200).json({ success, leave });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ success, errors: [{ msg: "Server Error" }] });
  }
};
