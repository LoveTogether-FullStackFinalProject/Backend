import express from "express";
import AdminController from "../controllers/admin_controller";
import adminMiddleware from "../common/admin_middelware";
import authMiddleware from "../common/auth_middelware";
const router = express.Router();


router.get("/", authMiddleware,adminMiddleware,AdminController.getAllUsers);
router.get("/:id",authMiddleware,adminMiddleware,AdminController.getUserById);
router.delete("/delete/:id",authMiddleware,adminMiddleware,AdminController.deleteUser);
router.put("/update/:id",authMiddleware,adminMiddleware,AdminController.updateUser);
router.get("/donations",authMiddleware,adminMiddleware,AdminController.getAllDonations);
router.get("/donation/:id",authMiddleware,adminMiddleware,AdminController.getDonationById);
router.put("/donation/update/:id",authMiddleware,adminMiddleware,AdminController.updateDonation);
router.delete("/donation/delete/:id",authMiddleware,adminMiddleware,AdminController.deleteDonation);
router.get("/donation/available",authMiddleware,adminMiddleware,AdminController.StockAvailableDonations);


export default router;