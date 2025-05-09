import { Router } from "express";
import { 
    createApplicationController, 
    deleteApplicationController, 
    getAllApplicationsController, 
    getApplicaitionByIdController, 
    updateApplicationController 
} from "../controllers/application.controllers.js";
import { createApplicationValidation, updateApplicationValidation } from '../validations/application.validations.js'

const routes = Router();

// routes.use('*', verifyToken)
routes.get('/', getAllApplicationsController);
routes.get('/:id', getApplicaitionByIdController);
routes.post('/', createApplicationValidation, createApplicationController);
routes.patch('/:id', updateApplicationValidation,  updateApplicationController);
routes.delete('/:id', deleteApplicationController);


export default routes;
