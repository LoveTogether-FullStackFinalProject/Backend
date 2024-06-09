import express from "express";
import DonationController from "../controllers/donation_controller";
const router = express.Router();



router.get("/donations",DonationController.getAllDonations);
router.get("/donation/:id",DonationController.getDonationById);
// router.post("/donation",DonationController.createDonation);
router.put("/donation/update/:id",DonationController.updateDonation);
router.delete("/donation/delete/:id",DonationController.deleteDonation);
router.post('/upload', DonationController.uploadDonation);

export default router;