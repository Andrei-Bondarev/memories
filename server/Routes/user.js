import express from "express";
import {signin,signup} from "../controllers/user.js";
import { body, validationResult } from 'express-validator'

const router = express.Router();

router.post('/signin',body('email').isEmail(),body('password').isLength({min:5}).isStrongPassword(),signin)
router.post('/signup',body('email').isEmail(),body('password').isLength({min:5}).isStrongPassword(), body('firstName').isString(), body('lastName').isString(),signup);
export default router;