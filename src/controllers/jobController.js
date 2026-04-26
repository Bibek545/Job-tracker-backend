import { createNewJob, deleteJob, updateJob } from "../models/jobs/jobModel.js";
import Job from "../models/jobs/jobSchema.js";

export const createNewJobController = async (req, res) => {
  try {
    const { companyName, jobTitle, status, ...rest } = req.body;
    const userId = req.user.id;
    if (!companyName || !jobTitle || !status) {
      return res.send("Error missing fields");
    }

    const jobObj = {
      companyName,
      jobTitle,
      status,
      ...rest,
      userId,
    };

    await createNewJob(jobObj);
    return res.send("Job has been created successfully");
  } catch (error) {
    return res.send("Unable to create the job");
  }
};

export const fetchJobController = async (req, res) => {
  try {
    const userId = req.user.id;
    const jobs = await Job.find({ userId });
    if (!jobs.length) {
      return res.send("No Jobs found");
    }

    return res.send(jobs);
  } catch (error) {
    return res.send("Error fetching jobs");
  }
};

export const deleteJobController = async (req, res) => {
  try {
    const { _id } = req.params;
    //const userId = req.user.id
    console.log(_id);
    console.log(req.params);

    const deletedJob = await deleteJob(_id);
    if (!deletedJob) {
      return res.send("Error finding the job");
    }
    return res.send("Job deleted successfully");
  } catch (error) {
    return res.send("Error deleting the job");
  }
};

export const updateJobController = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user.id;
    const updatedData = { ...req.body };
    delete updatedData.userId;
    console.log("params:", req.params);
console.log("jobId:", jobId);
console.log("userId:", userId);
console.log("updatedData:", updatedData);
    const updatedJob = await updateJob(jobId, userId,  updatedData);
    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res
      .status(200)
      .json({ message: " Job updated successfully", job: updatedJob });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating the job", error: error.message });
  }
};
