import express from 'express';
import { createNewJobController, fetchJobController } from '../controllers/jobController.js';
import { authValidation } from '../middleware/validation/authValidation.js';

const router = express.Router()

//POST for creating a job 
router.post("/create-job",authValidation ,createNewJobController);

//fetching the job
router.get("/jobs", authValidation, fetchJobController)

export default router;