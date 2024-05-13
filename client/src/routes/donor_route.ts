import express from 'express';
import DonorController from '../controllers/donor_controller'; 
import authMiddleware from '../common/auth_middelware';

const router = express.Router();

// Route for getting all donors
router.get('/',authMiddleware, DonorController.get);

// Route for getting a single donor by ID
router.get('/:id',authMiddleware, DonorController.getById);

// Route for creating a new donor
router.post('/',authMiddleware, DonorController.post);

// Route for updating a donor by ID
router.put('/:id',authMiddleware, DonorController.putById);

// Route for deleting a donor by ID
router.delete('/:id',authMiddleware, DonorController.deleteById);

export default router;
