const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  createPenalty,
  getAllPenalty,
  getInvoices,
  updatePenalty,
  getAllPenaltyStudent,
} = require("../controllers/penaltyController");

// @route   Generate api/penalty/create-penalty
// @desc    create penalty
// @access  Public
router.post("/create-penalty", createPenalty);

// @route   GET api/penalty/get
// @desc    Get all penalty
// @access  Public
router.post("/get", getAllPenalty);

// @route   GET api/penalty/getbystudent
// @desc    Get all penalty for student
// @access  Public
router.post("/getbystudent", getAllPenaltyStudent);

// @route   GET api/invoice/student
// @desc    Get all invoices
// @access  Public
router.post(
  "/student",
  [check("student", "Student is required").not().isEmpty()],
  getInvoices
);

// @route   GET api/penalty/update
// @desc    Update penalty
// @access  Public
router.post(
  "/update",
  [check("status", "Status is required").not().isEmpty()],
  updatePenalty
);

module.exports = router;
