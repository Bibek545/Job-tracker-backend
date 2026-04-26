import jobSchema from "./jobSchema.js";

export const createNewJob = (jobObj) => {
  return jobSchema(jobObj).save();
};

export const deleteJob = (_id) => {
  return jobSchema.findByIdAndDelete(_id);
};

export const updateJob = (jobId, userId, updatedData) => {
  return jobSchema.findOneAndUpdate({_id: jobId, userId}, updatedData, { new: true });
};
