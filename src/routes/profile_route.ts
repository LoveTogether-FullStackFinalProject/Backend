import express from 'express';
import ProfileController from '../controllers/profile_controller';
import authMiddleware from '../common/auth_middelware';

const router = express.Router();

router.get('/:id', authMiddleware, ProfileController.getProfile);
router.get('/donations/:id', authMiddleware, ProfileController.getUserDonations);
router.get('/approval-status/:id', authMiddleware, ProfileController.getApprovalStatus)

export default router;
