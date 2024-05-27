const { generateToken, verifyToken } = require("../utils/auth");
const { validationResult } = require("express-validator");
const { Student, Hostel, User } = require("../models");
const bcrypt = require("bcryptjs");
const Parser = require("json2csv").Parser;

const registerStudent = async (req, res) => {
  // console.log(req.body);
  let success = false;
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   // console.log(errors);
  //   return res.status(400).json({ success, errors: errors.array() });
  // }

  try {
    const { student, isSuper } = req.body;

    if (!isSuper) {
      return res
        .status(401)
        .json({ success, errors: [{ msg: "Not Authorized" }] });
    }

    // let isStudent = await Student.findOne({ student_id: student.student_id });

    // if (isStudent) {
    //   return res
    //     .status(400)
    //     .json({ success, errors: [{ msg: "Student already exists" }] });
    // }
    // let shostel = await Hostel.findOne({ name: hostel });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(student.password, salt);

    let user = new User({
      email: student.email,
      password: hashedPassword,
      isAdmin: false,
      isSuper: false,
    });

    await user.save();

    let isStudent = new Student({
      name: student.name,
      student_id: student.student_id,
      room_no: student.room_no,
      batch: student.batch,
      branch: student.branch,
      email: student.email,
      parent_email: student.parent_email,
      father_name: student.father_name,
      parent_contact: student.parent_contact,
      contact: student.contact,
      address: student.address,
      dob: student.dob,
      user: user.id,
      hostel: student.hostel,
    });

    await isStudent.save();

    await Hostel.findByIdAndUpdate(
      { _id: student.hostel },
      { $inc: { vacant: -1 } }
    );

    success = true;
    res.json({ success, student: isStudent });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success, errors: "Server error" });
  }
};

const getStudent = async (req, res) => {
  let success = false;
  try {
    // console.log(req.body);
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   // console.log(errors);
    //   return res.status(400).json({ success, errors: errors.array() });
    // }

    const { isAdmin } = req.body;

    let student;

    if (isAdmin) {
      const { id } = req.body;

      student = await Student.findById(id);
      // console.log(student);
    } else {
      const { token } = req.body;
      // console.log(token);

      const decoded = verifyToken(token);

      student = await Student.findOne({
        user: decoded.userId,
      }).select("-password");
    }

    if (!student) {
      return res
        .status(400)
        .json({ success, errors: "Student does not exist" });
    }

    const shostel = await Hostel.findById(student.hostel);

    success = true;
    res.json({ success, student, shostel });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success, errors: "Server error" });
  }
};

const getAllStudents = async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log(errors);
    return res.status(400).json({ success, errors: errors.array() });
  }

  let { hostel } = req.body;

  try {
    const shostel = await Hostel.findById(hostel);

    const students = await Student.find({ hostel: shostel.id }).select(
      "-password"
    );

    success = true;
    res.json({ success, students });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success, errors: [{ msg: "Server error" }] });
  }
};

const updateStudent = async (req, res) => {
  let success = false;
  try {
    // const student = await Student.findById(req.student.id).select("-password");

    const { details, student } = req.body;
    const user = await Student.findByIdAndUpdate(
      { _id: student },
      {
        contact: details.contact,
        parent_contact: details.parent_contact,
        address: details.address,
      }
    );

    success = true;
    res.json({ success, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success, errors: [{ msg: "Server error" }] });
  }
};

const deleteStudent = async (req, res) => {
  try {
    // console.log(req.body);
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // console.log(errors);
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { id } = req.body;

    const student = await Student.findById(id).select("-password");

    if (!student) {
      return res
        .status(400)
        .json({ success, errors: [{ msg: "Student does not exist" }] });
    }

    const user = await User.findByIdAndDelete(student.user);

    await Student.deleteOne(student);

    success = true;
    res.json({ success, msg: "Student deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success, errors: [{ msg: "Server error" }] });
  }
};

const csvStudent = async (req, res) => {
  let success = false;
  try {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // console.log(errors);
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { hostel } = req.body;

    const shostel = await Hostel.findById(hostel);

    const students = await Student.find({ hostel: shostel.id }).select(
      "-password"
    );

    students.forEach((student) => {
      student.hostel_name = shostel.name;
      student.d_o_b = new Date(student.dob).toDateString().slice(4);
      student.cnic_no =
        student.cnic.slice(0, 5) +
        "-" +
        student.cnic.slice(5, 12) +
        "-" +
        student.cnic.slice(12);
      student.contact_no = "+92 " + student.contact.slice(1);
    });

    const fields = [
      "name",
      "cms_id",
      "room_no",
      "batch",
      "dept",
      "course",
      "email",
      "father_name",
      "contact_no",
      "address",
      "d_o_b",
      "cnic_no",
      "hostel_name",
    ];

    const opts = { fields };

    const parser = new Parser(opts);

    const csv = parser.parse(students);

    success = true;
    res.json({ success, csv });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success, errors: [{ msg: "Server error" }] });
  }
};

const getAllHostels = async (req, res) => {
  try {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    let hostels = await Hostel.find();
    success = true;
    res.json({ success, hostels });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

module.exports = {
  registerStudent,
  getStudent,
  updateStudent,
  deleteStudent,
  getAllStudents,
  csvStudent,
  getAllHostels,
};
