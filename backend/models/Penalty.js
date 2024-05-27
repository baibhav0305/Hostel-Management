const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PenaltySchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "student",
  },
  hostel: {
    type: Schema.Types.ObjectId,
    ref: "hostel",
  },
  reason: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
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

module.exports = Penalty = mongoose.model("penalty", PenaltySchema);
