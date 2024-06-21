import express from "express";
import requestedDonationController from "../controllers/requestedDonation_controller";
const router = express.Router();
import authMiddleware from "../common/auth_middelware";



router.get("/rdonations",requestedDonationController.getAllrequestedDonations);
router.get("/rdonation/:id",requestedDonationController.getRequestedDonationById);
router.post("/rdonation",authMiddleware,requestedDonationController.createRequestedDonation);
router.put("/rdonation/update/:id",authMiddleware,requestedDonationController.updateRequestedDonation);
router.delete("/rdonation/delete/:id", authMiddleware,requestedDonationController.deleteRequestedDonation);


export default router;