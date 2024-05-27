const { validationResult } = require("express-validator");
const Request = require("../models/Request");
const { Hostel, Student } = require("../models");
const { response } = require("express");

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { cms_id } = req.body;
    const request = await Request.findOne({ cms_id });
    if (request) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Request already exists" }] });
    }
    const newRequest = new Request({
      cms_id,
    });
    await newRequest.save();
    res.json(newRequest);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const hostelChangeRequest = async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  try {
    const { request, student } = req.body;
    const previousRequest = await Request.findOne({ student });
    if (previousRequest) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Request already exists" }] });
    }

    const newRequest = new Request({
      hostel: request.hostel,
      reason: request.reason,
      student: student,
    });
    await newRequest.save();

    success = true;
    res.status(200).json({ success, newRequest });
  } catch (error) {
    res.status(500).json({ success, errors: [{ msg: "Server error" }] });
  }
};

const getHostelRequests = async (req, res) => {
  let success = false;
  try {
    const { isSuper } = req.body;

    if (!isSuper) {
      return res
        .status(401)
        .json({ success, errors: [{ msg: "Not Authorized" }] });
    }

    const requests = await Request.find({ status: "pending" });
    const students = await Student.find();
    const hostels = await Hostel.find();

    let result = [];
    requests.forEach(function (req) {
      let obj = {};
      let student = students.filter(function (student) {
        return student._id.toString() === req.student.toString();
      });
      let hostel = hostels.filter(function (hostel) {
        return hostel._id.toString() === req.hostel.toString();
      });
      obj["status"] = req.status;
      obj["student"] = student;
      obj["hostel"] = hostel;
      obj["reason"] = req.reason;
      obj["id"] = req._id;
      obj["date"] = req.date;
      result.push(obj);
    });

    success = true;
    res.status(200).json({ success, result });
  } catch (error) {
    res.status(500).json({ success, errors: [{ msg: "Server error" }] });
  }
};

const updateRequestStatus = async (req, res) => {
  let success = false;
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array(), success });
  // }
  const { details, status } = req.body;
  const id = details.id;
  const room_no = details.room_no;
  try {
    const request = await Request.findByIdAndUpdate(id, { status });
    if (status === "approved") {
      let rq = await Request.findById(id);
      const student = await Student.findById(rq.student);
      await Hostel.findByIdAndUpdate(student.hostel, { $inc: { vacant: 1 } });
      await Student.findByIdAndUpdate(rq.student, {
        hostel: rq.hostel,
        room_no: room_no,
      });
      await Hostel.findByIdAndUpdate(rq.hostel, { $inc: { vacant: -1 } });
    }
    
    success = true;
    return res.status(200).json({ success, request });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ success, errors: [{ msg: "Server Error" }] });
  }
};

const getAll = async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  register,
  hostelChangeRequest,
  getHostelRequests,
  updateRequestStatus,
  getAll,
};
