import express from 'express';
import { createNewJobController, deleteJobController, fetchJobController, updateJobController } from '../controllers/jobController.js';
import { authValidation } from '../middleware/validation/authValidation.js';

const router = express.Router()

//POST for creating a job 
router.post("/",authValidation ,createNewJobController);

//fetching the job
router.get("/", authValidation, fetchJobController)

//deleteing the job
router.delete("/:id", authValidation, deleteJobController)

//updating the job
router.patch("/:id", authValidation, updateJobController)



export default router;