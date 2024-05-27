const { validationResult } = require("express-validator");
const { Penalty, MessOff, Student } = require("../models");
const { Mess_bill_per_day } = require("../constants/mess");

// @route   Generate api/penalty/create-penalty
// @desc    Create penalty
// @access  Public
exports.createPenalty = async (req, res) => {
  let success = false;
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array(), success });
  //   }
  try {
    const { penalty, isAdmin, hostel } = req.body;
    if (!isAdmin) {
      return res
        .status(403)
        .json({ success, errors: [{ msg: "Not authorized" }] });
    }
    const student = await Student.find({ email: penalty.email });
    if (!student) {
      return res
        .status(400)
        .json({ success, errors: [{ msg: "Student not found" }] });
    }

    // console.log(student);
    const pen = await Penalty.create({
      student: student[0]._id,
      reason: penalty.reason,
      amount: penalty.amount,
      hostel: hostel,
    });

    success = true;
    res.status(201).json({ success, penalty: pen });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success, errors: [{ msg: "Server error" }] });
  }
};

// @route   GET api/penalty/get
// @desc    Get all penalty
// @access  Public
exports.getAllPenalty = async (req, res) => {
  let success = false;
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array(), success });
  //   }
  try {
    const { isAdmin, hostel } = req.body;
    if (!isAdmin) {
      return res
        .status(403)
        .json({ success, errors: [{ msg: "Not authorized" }] });
    }

    const penalty = await Penalty.find({ hostel, status: "pending" }).populate(
      "student",
      ["name", "_id", "student_id"]
    );

    success = true;
    res.status(200).json({ success, penalty });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success, errors: [{ msg: "Server error" }] });
  }
};

// @route   GET api/penalty/getbystudent
// @desc    Get all penalty for student
// @access  Public
exports.getAllPenaltyStudent = async (req, res) => {
  let success = false;
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array(), success });
  //   }
  try {
    const { student } = req.body;

    const penalty = await Penalty.find({
      student,
      status: "pending",
    }).populate("student", ["name", "_id", "student_id"]);

    success = true;
    res.status(200).json({ success, penalty });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success, errors: [{ msg: "Server error" }] });
  }
};

// @route   GET api/invoice/student
// @desc    Get all invoices
// @access  Public
exports.getInvoices = async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), success });
  }
  const { student } = req.body;
  try {
    let invoices = await Invoice.find({ student: student });
    success = true;
    res.status(200).json({ success, invoices });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @route   GET api/invoice/update
// @desc    Update invoice
// @access  Public
exports.updatePenalty = async (req, res) => {
  let success = false;
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array(), success });
  //   }
  try {
    const { id, status, isAdmin } = req.body;
    if (!isAdmin) {
      return res
        .status(403)
        .json({ success, errors: [{ msg: "Not authorized" }] });
    }

    const penalty = await Penalty.findByIdAndUpdate(id, { status: status });

    success = true;
    res.status(200).json({ success, penalty });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success, errors: [{ msg: "Server error" }] });
  }
};
