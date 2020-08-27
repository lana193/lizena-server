import express from 'express';
import { registerController, loginController } from './../controllers/authController';

const router = express.Router();

// @route   POST api/auth/login
// @desc    Log in if is registereted
// @access  Public
router.post('/auth/login', loginController);

router.post('/auth/admin', loginController);

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/auth/register', registerController);

export const authRouter = router;