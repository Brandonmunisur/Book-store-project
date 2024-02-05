import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String, // Corrected from 'string' to 'String'
      required: true,
    },
    author: {
      type: String, // Corrected from 'string' to 'String'
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const Book = mongoose.model("Book", bookSchema);
