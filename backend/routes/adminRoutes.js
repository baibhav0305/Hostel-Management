const express = require("express");
const { check } = require("express-validator");
const {
  registerAdmin,
  updateAdmin,
  getAdmin,
  getHostel,
  deleteAdmin,
  createHostel,
  getAllHostels,
  getAllStudents,
} = require("../controllers/adminController");
const router = express.Router();

// @route  POST api/admin/register-admin
// @desc   Register admin
// @access Public
router.post(
  "/register-admin",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    // check("father_name", "Father name is required").not().isEmpty(),
    check("contact", "Enter a valid contact number").isLength(10),
    // check("address", "Address is required").not().isEmpty(),
    check("dob", "Date of birth is required").not().isEmpty(),
    // check("cnic", "CNIC is required").isLength(13),
    check("password", "Password is required").isLength(8),
  ],
  registerAdmin
);

// @route  POST api/admin/update-admin
// @desc   Update admin
// @access Public
router.post(
  "/update-admin",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("contact", "Enter a valid contact number").isLength(11),
    check("address", "Address is required").not().isEmpty(),
    check("dob", "Date of birth is required").not().isEmpty(),
    check("cnic", "CNIC is required").isLength(13),
    check("hostel", "Hostel is required").not().isEmpty(),
    check("password", "Password is required").isLength(8),
  ],
  updateAdmin
);

// @route  POST api/admin/get-admin
// @desc   Get admin by email
// @access Public
router.post(
  "/get-admin",
  [
    check("isAdmin", "isAdmin is required").notEmpty(),
    check("token", "Token is required").notEmpty(),
  ],
  getAdmin
);

// @route  POST api/admin/get-all-students
// @desc   Get all students
// @access Public
router.post(
  "/get-all-students",
  [check("id", "Id is required").notEmpty()],
  getAllStudents
);

// @route  POST api/admin/create-hostel
// @desc   Create hostel
// @access Public
router.post("/create-hostel", createHostel);

// @route  POST api/admin/get-hostel
// @desc   Get hostel by name
// @access Public
router.post(
  "/get-hostel",
  [check("id", "Id is required").notEmpty()],
  getHostel
);

// @route  POST api/admin/get-all-hostels
// @desc   Get all hostel by name
// @access Public
router.post(
  "/get-all-hostels",
  [check("id", "Id is required").notEmpty()],
  getAllHostels
);

// @route  POST api/admin/delete-admin
// @desc   Delete admin
// @access Public
router.post(
  "/delete-admin",
  [check("email", "Please include a valid email").isEmail()],
  deleteAdmin
);

module.exports = router;
