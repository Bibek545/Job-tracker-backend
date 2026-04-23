import { createNewJob } from "../models/jobs/jobModel.js";
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
