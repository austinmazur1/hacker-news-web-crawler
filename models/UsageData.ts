import mongoose, { Schema } from "mongoose";

const UsageSchema: Schema = new mongoose.Schema(
  {
    requestTimestamp: {
      type: Number,
      required: true,
    },
    responseTimestamp: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    filterApplied: {
      type: String,
      required: true,
    },
    entryCount: {
      type: Number,
      required: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Usage = mongoose.models.Usage || mongoose.model("Usage", UsageSchema);

export default Usage;
