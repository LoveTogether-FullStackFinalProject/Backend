import express from 'express';
import DonationController from '../controllers/donation_controller';
import authMiddleware from "../common/auth_middelware";

const router = express.Router();

router.get('/donations', DonationController.getAllDonations);
router.get('/donation/:id', DonationController.getDonationById);
router.put('/update/:id',authMiddleware,  DonationController.updateDonation);
router.delete('/delete/:id',authMiddleware,  DonationController.deleteDonation);
router.post('/upload',authMiddleware, DonationController.uploadDonation);
router.get('/user/:userId', DonationController.getDonationsByUserId);

export default router;
