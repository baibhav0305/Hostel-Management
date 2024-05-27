const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LeaveSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: "student" },
  leaving_date: { type: Date, required: true },
  return_date: { type: Date, required: true },
  reason: { type: String, required: true },
  status: { type: String, default: "pending" },
  request_date: { type: Date, default: Date.now },
});

module.exports = Leave = mongoose.model("leave", LeaveSchema);
