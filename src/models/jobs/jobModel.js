import jobSchema from "./jobSchema.js";

export const createNewJob = (jobObj) => {
    return jobSchema(jobObj).save()
}