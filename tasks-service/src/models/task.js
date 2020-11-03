const mongoose = require('mongoose');

const { Schema } = mongoose;

const { ObjectId } = Schema.Types;

const taskSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      enum: ['todo', 'done'],
      required: true,
    },
    userId: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = taskSchema;
