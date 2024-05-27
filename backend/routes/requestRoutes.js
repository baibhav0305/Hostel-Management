const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  register,
  hostelChangeRequest,
  getHostelRequests,
  updateRequestStatus,
  getAll,
} = require("../controllers/requestController");

// @route   POST api/request/register
// @desc    Register request
// @access  Public
router.post(
  "/register",
  [check("cms_id", "CMS ID is required").not().isEmpty()],
  register
);

// @route   POST api/request/hostel-change
// @desc    Register request
// @access  Public
router.post(
  "/hostel-change",
  [check("student", "Id is required").not().isEmpty()],
  hostelChangeRequest
);

// @route   POST api/request/get-requests
// @desc    Get request
// @access  Public
router.post("/get-requests", [], getHostelRequests);

// @route   POST api/request/update
// @desc    update status of request
// @access  Public
router.post("/update", updateRequestStatus);

// @route   GET api/request/getall
// @desc    Get all requests
// @access  Public
router.get("/getall", getAll);

module.exports = router;
