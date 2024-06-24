import express from "express";
import requestedDonationController from "../controllers/requestedDonation_controller";
const router = express.Router();



router.get("/rdonations",requestedDonationController.getAllrequestedDonations);
router.get("/rdonation/:id",requestedDonationController.getRequestedDonationById);
router.post("/rdonation",requestedDonationController.createRequestedDonation);
router.put("/rdonation/update/:id",requestedDonationController.updateRequestedDonation);
router.delete("/rdonation/delete/:id",requestedDonationController.deleteRequestedDonation);


export default router;