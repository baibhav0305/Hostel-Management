const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: "student" },
  hostel: { type: Schema.Types.ObjectId, ref: "hostel" },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Request = mongoose.model("request", RequestSchema);
