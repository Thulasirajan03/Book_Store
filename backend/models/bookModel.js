import { response } from 'express';
import mongoose from 'mongoose';

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    cart :{
      type:Boolean,
      default:'false',
      required:true    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String, // File path of the uploaded image
    },
  },
  {
    timestamps: true,
  },
  
);

export const Book = mongoose.model('Book', bookSchema);
