const express = require("express");
const router = express.Router();
const { register, login,getAllUsers } = require("../controllers/authController");

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - age
 *               - currentStudies
 *               - state
 *               - district
 *               - email
 *               - mobile
 *               - password
 *               - confirmPassword
 *               - howYouGotToKnow
 *             properties:
 *               fullName:
 *                 type: string
 *               age:
 *                 type: integer
 *               currentStudies:
 *                 type: string
 *               subOption:
 *                 type: string
 *               state:
 *                 type: string
 *               district:
 *                 type: string
 *               email:
 *                 type: string
 *               mobile:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *               howYouGotToKnow:
 *                 type: string
 *                 enum: [social media, word of mouth, other]
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/signup", register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - emailOrMobile
 *               - password
 *             properties:
 *               emailOrMobile:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", login);

/**
 * @swagger
 * /api/auth/users:
 *   get:
 *     summary: Get all registered users
 *     responses:
 *       200:
 *         description: List of all users
 */
router.get("/users", getAllUsers);


module.exports = router;
