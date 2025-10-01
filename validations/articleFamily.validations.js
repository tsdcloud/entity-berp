// import { body, validationResult } from 'express-validator';
// import { errors } from '../utils/errors.utils.js';

// export const createArticleFamily = [
//   body('name').notEmpty().withMessage('name is required'),
//   body('code').notEmpty().withMessage('code is required'),
//   body('description').optional().notEmpty().withMessage('hasTVA is required'),
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).send(errors(errors.array()));
//     }
//     next();
//   }
// ];

// export const updateArticleFamily = [
//   body('name').optional().notEmpty().withMessage('name is required'),
//   body('code').optional().notEmpty().withMessage('code is required'),
//   body('description').optional().notEmpty().withMessage('hasTVA is required'),
//     (req, res, next) => {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).send(errors(errors.array()));
//       }
//       next();
//     }
//   ];
// articleFamily.validations.js
// Dans votre fichier de validation
import { body, validationResult } from 'express-validator';

export const createArticleFamily = [
  body('name').notEmpty().withMessage('name is required'),
  body('code').notEmpty().withMessage('code is required'),
  body('description')
    .optional()
    .custom((value) => {
      // Permettre les chaînes vides, null, ou undefined
      if (value === '' || value === null || value === undefined) {
        return true;
      }
      // Si une valeur est fournie, elle ne doit pas être une chaîne vide
      if (typeof value === 'string' && value.trim() === '') {
        throw new Error('description cannot be empty');
      }
      return true;
    }),

  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    next();
  }
];

export const updateArticleFamily = [
  body('name').optional().notEmpty().withMessage('name is required'),
  body('code').optional().notEmpty().withMessage('code is required'),
  body('description')
    .optional()
    .custom((value) => {
      if (value === '' || value === null || value === undefined) {
        return true;
      }
      if (typeof value === 'string' && value.trim() === '') {
        throw new Error('description cannot be empty');
      }
      return true;
    }),

  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    next();
  }
];