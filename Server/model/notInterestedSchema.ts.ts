import mongoose, { Schema, model } from "mongoose";
const notInterestedSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const notInterestSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  NotInterst: {
    type: Array,
    default: [notInterestedSchema],
  },
});

const NotInterst = model("notinterested", notInterestSchema, "notInterested");
export default NotInterst;
