import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

const signupValidation = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be 6+ chars'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Middleware to check validation errors
function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
}

router.post('/signup', signupValidation, validate, signup);
router.post('/login', loginValidation, validate, login);

export default router;
