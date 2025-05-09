import { body, validationResult } from 'express-validator';

export const createApplicationPermission = [
  body('applicationId').notEmpty().isUUID().withMessage('invalid applicationId'),
  body('permissionId').notEmpty().isUUID().withMessage('invalid permissionId'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const updateApplicationPermission = [
    body('applicationId').optional().isUUID().notEmpty().withMessage('invalid applicationId'),
    body('permissionId').optional().isUUID().notEmpty().withMessage('invalid permissionId'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];