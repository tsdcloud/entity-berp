import { body, validationResult } from 'express-validator';

export const createCountry = [
  body('name').notEmpty().withMessage('name is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status().json({ error:true, errors: errors.array() });
    }
    next();
  }
];

export const updateCountry = [
    body('name').optional().notEmpty().withMessage('Name should not be left empty'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];