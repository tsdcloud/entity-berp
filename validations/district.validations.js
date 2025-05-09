import { body, validationResult } from 'express-validator';
import HTTP_STATUS from '../utils/http.utils.js';
import {apiErrorResponse} from '../utils/apiResponse.js'

export const createDistrict = [
  body('name').notEmpty().withMessage('name is required'),
  body('countryId').notEmpty().withMessage('countryId is required'),
  body('createdBy').notEmpty().withMessage('createdBy is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HTTP_STATUS.BAD_REQUEST.statusCode).send(apiErrorResponse(errors.array()));
    }
    next();
  }
];

export const updateDistrict = [
    body('name').optional().notEmpty().withMessage('Name should not be left empty'),
    body('countryId').notEmpty().optional().withMessage('countryId is required'),
    body('createdBy').notEmpty().optional().withMessage('createdBy is required'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(HTTP_STATUS.BAD_REQUEST.statusCode).send(apiErrorResponse(errors.array()));
      }
      next();
    }
  ];