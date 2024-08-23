import express from 'express';
import DonationController from '../controllers/donation_controller';
import authMiddleware from "../common/auth_middelware";

const router = express.Router();

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
*   name: Donation
*   description: The Donation API
*/

/**
* @swagger
* components:
*   schemas:
*     Donation:
*       type: object
*       required:
*         - itemName
*         - category
*         - quantity
*         - condition
*         - description
*         - pickupAddress
*         - donor
*         - status
*         - approvedByAdmin
*         - image
*       properties:
*         itemName:
*           type: string
*           description: The donation's item name.
*         category:
*           type: string
*           description: The donation's category.
*         quantity:
*           type: number
*           description: The donation's amount.
*         condition:
*           type: string
*           description: The donation's item condition.
*         description:
*           type: string
*           description: The donation's description.
*         pickupAddress:
*           type: string
*           description: The donation's pickup address.
*         donor:
*           type: string
*           description: The donation's donor.
*         status:
*           type: string
*           description: The donation's status.
*         approvedByAdmin:
*           type: string
*           description: The donation's approval status.
*         image:
*           type: string
*           description: The image URL of the donation.
*       example:
*         category: "Food"
*         itemName: "Apple"
*         quantity: 10
*         condition: "Fresh"
*         description: "This is a description of the donation."
*         pickupAddress: "1234 Main St, San Francisco, CA 94123"
*         donor: "60f3b4b3b3f3b30015f3b3f3"
*         status: "Available"
*         approvedByAdmin: "true"
*         image: "http://example.com/image.jpg"
*/

/**
* @swagger
* /donation/donations:
*   get:
*     summary: Get all donations
*     tags: [Donation]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: List of all donations
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Donation'
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

router.get('/donations', DonationController.getAllDonations);

/**
* @swagger
* /donation/donation/{id}:
*   get:
*     summary: Get a donation by ID
*     tags: [Donation]
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
*         description: Donation object
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Donation'
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
*         description: Donation not found
*         content:
*           application/json:
*             schema:
*               type: string
*               properties:
*                 message: 
*                   type: string
*               example:
*                 message: "Donation not found"
*/
router.get('/donation/:id', DonationController.getDonationById);

/**
* @swagger
* /donation/update/{id}:
*   put:
*     summary: Update a donation by ID
*     tags: [Donation]
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
*             $ref: '#/components/schemas/Donation'
*     responses:
*       200:
*         description: requested updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Donation'
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
*         description: Donation not found
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*               example:
*                 message: "Donation not found"
*/
router.put('/update/:id',authMiddleware,  DonationController.updateDonation);

/**
* @swagger
* /donation/delete/{id}:
*   delete:
*     summary: Delete a donation by ID
*     tags: [Donation]
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
*         description: requested deleted
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message: 
*                   type: string
*               example:
*                 message: "donation deleted"
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
*/
router.delete('/delete/:id',authMiddleware,  DonationController.deleteDonation);

/**
* @swagger
* /donation/upload:
*   post:
*     summary: Create a new donation
*     tags: [Donation]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Donation'
*     responses:
*       201:
*         description: Requested created
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Donation'
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
router.post('/upload',authMiddleware, DonationController.uploadDonation);

router.post('/upload-anonymously', DonationController.uploadDonation);

/**
* @swagger
* /donation/user/{id}:
*   get:
*     summary: Get a donation by user ID
*     tags: [Donation]
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
*         description: Donation object
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Donation'
*       400:
*         description: Bad Request
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message: 
*                   type: string
*               example:
*                 message: "Bad request, check the request parameters"
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
*         description: Donation not found
*         content:
*           application/json:
*             schema:
*               type: string
*               properties:
*                 message: 
*                   type: string
*               example:
*                 message: "Donation not found"
*/
router.get('/user/:userId', DonationController.getDonationsByUserId);



export default router;
