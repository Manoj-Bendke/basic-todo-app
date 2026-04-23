import mongoose from "mongoose"
import { maxLength } from "zod"

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 300,
    },
    description: {
      type: String,
      required: true,
      maxLength: 400,
    },
    status: {
      type: String,
      enum: ["Inprogress", "completed"],
      default: "active",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true },
)

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "suspended"],
      default: "active",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true },
)
const Todo = mongoose.model("Todo", todoSchema)
const User = mongoose.model("User", userSchema)

export { Todo, User }
