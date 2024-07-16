import express from 'express';
import DonorController from '../controllers/donor_controller';
import authMiddleware from '../common/auth_middelware';

const router = express.Router();

/**
 * @swagger
 * /donor:
 *   get:
 *     summary: Retrieve all donors
 *     tags: [Donor]
 *     responses:
 *       200:
 *         description: List of all donors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Donor'
 */
router.get('/', DonorController.get);

/**
 * @swagger
 * /donor/{id}:
 *   get:
 *     summary: Get a donor by ID
 *     tags: [Donor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Donor details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Donor'
 *       404:
 *         description: Donor not found
 */
router.get('/:id', DonorController.getById);

/**
 * @swagger
 * /donor:
 *   post:
 *     summary: Create a new donor
 *     tags: [Donor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DonorInput'
 *     responses:
 *       201:
 *         description: Created donor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Donor'
 */
router.post('/', DonorController.post);

/**
 * @swagger
 * /donor/{id}:
 *   put:
 *     summary: Update a donor by ID
 *     tags: [Donor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DonorInput'
 *     responses:
 *       200:
 *         description: Updated donor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Donor'
 *       404:
 *         description: Donor not found
 */
router.put('/:id',authMiddleware,  DonorController.putById);

/**
 * @swagger
 * /donor/{id}:
 *   delete:
 *     summary: Delete a donor by ID
 *     tags: [Donor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Donor deleted successfully
 *       404:
 *         description: Donor not found
 */
router.delete('/:id',authMiddleware, DonorController.deleteById);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Donor:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *     DonorInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 */