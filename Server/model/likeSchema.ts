import mongoose, { Schema, model } from "mongoose";
const likedSchema = new Schema(
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

const likeSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  interested: {
    type: Array,
    default: [likedSchema],
  },
});

const Like = model("like", likeSchema, "like");
export default Like;
