import express from "express";
import AdminController from "../controllers/admin_controller";
import adminMiddleware from "../common/admin_middelware";
import authMiddleware from "../common/auth_middelware";
const router = express.Router();


router.get("/",AdminController.getAllUsers);
router.get("/admin",AdminController.getAdmin);
router.get("/:id",AdminController.getUserById);
router.delete("/delete/:id",AdminController.deleteUser);
router.put("/update/:id",AdminController.updateUser);
router.get("/donations",AdminController.getAllDonations);
router.get("/donation/:id",AdminController.getDonationById);
router.put("/donation/update/:id",AdminController.updateDonation);
router.delete("/donation/delete/:id",AdminController.deleteDonation);
router.get("/donation/available",AdminController.StockAvailableDonations);


export default router;