import express from "express";
import multer from "multer";

const router = express.Router();

//const base = "https://NeedToFill.cs.colman.ac.il/";
const base = "https://node12.cs.colman.ac.il/";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.').slice(1).join('.');
        cb(null, Date.now() + "." + ext);
    }
});

const upload = multer({ storage: storage });

/**
* @swagger
* tags:
*   name: Files
*   description: The Files API
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
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     FileUploadResponse:
 *       type: object
 *       required:
 *         - url
 *       properties:
 *         url:
 *           type: string
 *           description: The URL of the uploaded file
 *       example:
 *        url: "http://localhost:3000/public/1625760000000.jpg"
 * */

 /**
 * @swagger
 * /file:
 *   post:
 *     summary: Upload a file
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: The URL of the uploaded file
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FileUploadResponse'
 *       400:
 *         description: No file uploaded
 */

router.post('/upload', upload.single("file"), function (req, res) { 
    if (req.file) {
        console.log("router.post(/file: " + base + req.file.path);
        res.status(200).send({ url: base + req.file.path });
    } else {
        res.status(400).send("No file uploaded");
    }
});

export default router;
