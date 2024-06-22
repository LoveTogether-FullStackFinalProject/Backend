import express from "express";
import requestedDonationController from "../controllers/requestedDonation_controller";
const router = express.Router();
import authMiddleware from "../common/auth_middelware";

/**
* @swagger
* tags:
*   name: Auth
*   description: The Authentication API
*/

/**
* @swagger
* components:
*   securitySchemes:
*     bearerAuth:
*       type: http
*       scheme: bearer
*       bearerFormat: JWT
*/

/**
* @swagger
* tags:
*   name: Requested Donation
*   description: The Requested Donation API
*/

/**
* @swagger
* components:
*   schemas:
*     Requested Donation:
*       type: object
*       required:
*         - category
*         - productType
*         - amount
*         - itemCondition
*         - description
*         - image
*       properties:
*         category:
*           type: string
*           description: The donation's category.
*         productType:
*           type: string
*           description: The donation's product type.
*         amount:
*           type: number
*           description: The donation's amount.
*         itemCondition:
*           type: string
*           description: The donation's item condition.
*         description:
*           type: string
*           description: The donation's description.
*         image:
*           type: string
*           description: The image URL of the donation.
*       example:
*        category: "Food"
*        productType: "Fruits"
*        amount: 10
*        itemCondition: "Fresh"
*        description: "This is a description of the donation."
*        image: "http://example.com/image.jpg"
*/ 

/**
* @swagger
* /rdonations:
*   get:
*     summary: Get all requested donations
*     tags: [Requested Donation]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: List of all requested donations
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Requested Donation'
*       500:
*         description: Server error
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*               example:
*                 message: "Server error"
*/
router.get("/rdonations",requestedDonationController.getAllrequestedDonations);
/**
* @swagger
* /rdonation/{id}:
*   get:
*     summary: Get a requested donation by ID
*     tags: [Requested Donation]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: Requested Donation object
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Requested Donation'
*       500:
*         description: Server error
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message: 
*                   type: string
*               example:
*                 message: "Server error"
*       404:
*         description: Requested Donation not found
*         content:
*           application/json:
*             schema:
*               type: string
*               properties:
*                 message: 
*                   type: string
*               example:
*                 message: "Requested Donation not found"
*/
router.get("/rdonation/:id",requestedDonationController.getRequestedDonationById);

/**
* @swagger
* /rdonation:
*   post:
*     summary: Create a new requested donation
*     tags: [Requested Donation]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Requested Donation'
*     responses:
*       200:
*         description: Requested Donation created
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Requested Donation'
*       500:
*         description: Server error
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message: 
*                   type: string
*               example:
*                 message: "Server error"
*       404:
*         description: Requested Donation not found
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*               example:
*                 message: "Requested Donation not found"
*/
router.post("/rdonation",authMiddleware,requestedDonationController.createRequestedDonation);
/**
* @swagger
* /rdonation/update/{id}:
*   put:
*     summary: Update a requested donation by ID
*     tags: [Requested Donation]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Requested Donation'
*     responses:
*       200:
*         description: requested donation updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Requested Donation'
*       500:
*         description: Server error
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message: 
*                   type: string
*               example:
*                 message: "Server error"
*       404:
*         description: Requested Donation not found
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*               example:
*                 message: "Requested Donation not found"
*/
router.put("/rdonation/update/:id",authMiddleware,requestedDonationController.updateRequestedDonation);

/**
* @swagger
* /rdonation/delete/{id}:
*   delete:
*     summary: Delete a requested donation by ID
*     tags: [Requested Donation]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*     security:
*       - bearerAuth: []
*     responses:
*        204:
*         description: requested donation deleted
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message: 
*                   type: string
*               example:
*                 message: "requested donation deleted"
*        500:
*         description: Server error
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message: 
*                   type: string
*               example:
*                 message: "Server error"
*        404:
*          description: Requested Donation not found
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  message:
*                    type: string
*                  example:
*                    message: "Requested Donation not found"
*/
router.delete("/rdonation/delete/:id", authMiddleware,requestedDonationController.deleteRequestedDonation);


export default router;