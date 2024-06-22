import express from "express";
const router = express.Router();
import authController from "../controllers/auth_controller";

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
* components:
*   schemas:
*     Donor:
*       type: object
*       required:
*         - firstName
*         - lastName
*         - email
*         - password
*         - mainAddress
*         - image
*       properties:
*         firstName:
*           type: string
*           description: The donor's first name.
*         lastName:
*           type: string
*           description: The donor's last name.
*         _id:
*           type: string
*           description: The donor's unique ID.
*         image:
*           type: string
*           description: The donor's image URL.
*         email:
*           type: string
*           description: The donor's email address.
*         password:
*           type: string
*           description: The donor's password.
*         mainAddress:
*           type: string
*           description: The donor's main address.
*         refreshTokens:
*           type: array
*           items:
*             type: string
*           description: The donor's refresh tokens.
*       example:
*         first Name: "John"
*         last Name: "Doe"
*         _id: "60d725b057d6d8c8c8febe8a"
*         image: "http://example.com/image.jpg"
*         email: "johndoe@example.com"
*         password: "mySecurePassword"
*         mainAddress: "123 Main St, Springfield, IL 62701"
*         refreshTokens: ["token1", "token2"]
*/

/**
* @swagger
* /auth/register:
*   post:
*     summary: Register a new donor
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Donor'
*     responses:
*       201:
*         description: The new donor
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Donor'
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
*                 message: "Invalid input data"
*       401:
*         description: Unauthorized
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message: 
*                   type: string
*               example:
*                 message: "Unauthorized access"
*       406:
*         description: Not Acceptable
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message: 
*                   type: string
*               example:
*                 message: "Request not acceptable"
*/

router.post("/register", authController.register);

/**
* @swagger
* components:
*   schemas:
*      Credential:
*       type: object
*       required:
*         - credential
*       properties:
*         credential:
*           type: string
*           description: The Google token  
*       example: "token"
*/

router.post("/googleSignIn", authController.googleSignin);

/**
* @swagger
* components:
*   schemas:
*     Tokens:
*       type: object
*       required:
*         - accessToken
*         - refreshToken
*       properties:
*         accessToken:
*           type: string
*           description: The access token for the user session.
*         refreshToken:
*           type: string
*           description: The refresh token for the user session.
*       example:
*         accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
*         refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM9MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
*/

/**
* @swagger
* /auth/login:
*   post:
*     summary: Login a donor
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Donor'
*     responses:
*       200:
*         description: Successfully logged in
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Tokens'
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
*                 message: "Invalid input data"
*       401:
*         description: Unauthorized
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message: 
*                   type: string
*               example:
*                 message: "Unauthorized access"
*/

router.post("/login", authController.login);


/**
* @swagger
* /auth/logout:
*   get:
*       summary: logout a donor
*       tags: [Auth]
*       description: need to provide the refresh token in the auth header
*       security:
*         - bearerAuth: []
*       responses:
*         200:
*           description: Successfully logged out
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message: 
*                   type: string
*               example:
*                 message: "Successfully logged out"
*       401:
*         description: Unauthorized
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message: 
*                   type: string
*               example:
*                 message: "Unauthorized access"
*/

router.get("/logout", authController.logout);

/**
* @swagger
* /auth/refreshToken:
*   get:
*     summary: Get a new access token using the refresh token
*     tags: [Auth]
*     description: Need to provide the refresh token in the auth header
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: The access & refresh tokens
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Tokens'
*       401:
*         description: Unauthorized
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message: 
*                   type: string
*               example:
*                 message: "Unauthorized access"
*/

router.get("/refreshToken", authController.refresh);

export default router;

