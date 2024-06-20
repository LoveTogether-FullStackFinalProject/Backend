import express from 'express';
import DonationController from '../controllers/donation_controller';

const router = express.Router();

router.get('/donations', DonationController.getAllDonations);
router.get('/donation/:id', DonationController.getDonationById);
router.put('/update/:id', DonationController.updateDonation);
router.delete('/delete/:id', DonationController.deleteDonation);
router.post('/upload', DonationController.uploadDonation);
router.get('/user/:userId', DonationController.getDonationsByUserId);

export default router;
