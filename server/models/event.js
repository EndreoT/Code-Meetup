const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    attendes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      }
    ],
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 0,
      maxlength: 10000,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    }
    // location: { // TODO
    //   type: pointSchema,
    //   required: true
    // }
  },
  {
    timestamps: true // Assigns createdAt and updatedAt fields
  }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
