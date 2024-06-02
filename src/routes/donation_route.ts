import express from "express";
import DonationController from "../controllers/donation_controller";
const router = express.Router();



router.get("/donations",DonationController.getAllDonations);
router.get("/donation/:id",DonationController.getDonationById);
router.post("/donation",DonationController.createDonation);
router.put("/donation/update/:id",DonationController.updateDonation);
router.delete("/donation/:id", DonationController.deleteDonation);

export default router;