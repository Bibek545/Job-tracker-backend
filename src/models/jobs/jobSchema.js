import mongoose from "mongoose";

const jobScehma = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    companyName: {
      type: String,
      required: true,
    },

    jobTitle: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      // required: true,
    },
    status: {
      type: String,
      enum: ["Applied", "Interview", "Offer", "Rejected"],
      default: "Applied",
      required: true,
    },
    jobType: {
      type: String,
    },
    salary: {
      type: String,
    },
    appliedDate: {
      type: Date,
    },
    jobLink: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Job", jobScehma);
