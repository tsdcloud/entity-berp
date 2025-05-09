import { body, validationResult } from 'express-validator';

export const createApplicationValidation = [
  body('name').notEmpty().withMessage('name is required'),
  body('url').notEmpty().isURL().withMessage('invalid url'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const updateApplicationValidation = [
    body('name').notEmpty().optional().withMessage('name is required'),
    body('url').notEmpty().optional().isURL().withMessage('url is required'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];