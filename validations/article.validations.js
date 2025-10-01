// import { body, validationResult } from 'express-validator';

// export const createArticle = [
//   body('name').notEmpty().withMessage('name is required'),
//   body('price').notEmpty().withMessage('price is required'),
//   body('hasTVA').notEmpty().optional().withMessage('hasTVA is required'),
//   body('type').notEmpty().withMessage('hasTVA is required'),
//   body('idEntity').notEmpty().withMessage('hasTVA is required'),
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     next();
//   }
// ];

// export const updateArticle = [
//     body('name').optional().notEmpty().withMessage('name is required'),
//     body('price').optional().notEmpty().withMessage('price is required'),
//     body('hasTVA').optional().notEmpty().withMessage('hasTVA is required'),
//     body('type').optional().notEmpty().withMessage('hasTVA is required'),
//     body('idEntity').optional().notEmpty().withMessage('hasTVA is required'),
//     (req, res, next) => {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
//       next();
//     }
//   ];

import { body, validationResult } from 'express-validator';
const ARTICLE_TYPE = [
  'PRODUCT',
  'EQUIPEMENT'
];

export const createArticle = [
  body('name').notEmpty().withMessage('name is required'),
  body('code').optional().isString().withMessage('code must be a string'),
  body('idArticleFamily').optional().isString().withMessage('idArticleFamily must be a string'),
  body('idEntity').notEmpty().withMessage('idEntity is required'),
  body('price').notEmpty().isFloat({ min: 0 }).withMessage('price must be a number greater than or equal to 0'),
  body('hasTVA').optional().isBoolean().withMessage('hasTVA must be a boolean'),
  // body('type').notEmpty().withMessage('type is required'),
  body('type')
    .notEmpty().withMessage('type is required')
    .isIn(ARTICLE_TYPE)
    .withMessage(`type must be one of: ${ARTICLE_TYPE.join(', ')}`),
  // body('quantity').optional().isFloat().withMessage('quantity must be a number'),
  body('quantity')
  .optional()
  .isFloat({ min: 0 })
  .withMessage('quantity must be a number greater than or equal to 0'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const updateArticle = [
  body('name').optional().notEmpty().withMessage('name cannot be empty'),
  body('code').optional().isString().withMessage('code must be a string'),
  body('idArticleFamily').optional().isString().withMessage('idArticleFamily must be a string'),
  body('idEntity').optional().notEmpty().withMessage('idEntity cannot be empty'),
  body('price').optional().isFloat({ min: 0 }).withMessage('price must be a number greater than or equal to 0'),
  body('hasTVA').optional().isBoolean().withMessage('hasTVA must be a boolean'),
  body('type')
    .optional()
    .isIn(ARTICLE_TYPE)
    .withMessage(`type must be one of: ${ARTICLE_TYPE.join(', ')}`),
  body('quantity')
  .optional()
  .isFloat({ min: 0 })
  .withMessage('quantity must be a number greater than or equal to 0'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
