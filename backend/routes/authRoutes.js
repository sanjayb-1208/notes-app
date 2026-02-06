import express from 'express';
import { register, login, verifyOtp, logout } from '../controllers/authControllers.js';
import userAuth from "../middlewares/userAuthMiddleware.js";
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify-otp', verifyOtp);
router.post('/logout', logout);
router.get('/is-auth', userAuth, (req, res) => {
    return res.json({ success: true });
});

export default router;