import mongoose, { Schema, model } from "mongoose";
const matchedSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const matchSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  matches: {
    type: Array,
    default: [matchedSchema],
  },
});

const Match = model("match", matchSchema, "match");
export default Match;
