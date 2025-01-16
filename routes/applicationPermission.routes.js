import { Router } from "express";
import { 
    createApplicationPermissionController, 
    deleteApplicationPermissionController, 
    getAllApplicationPermissionsController, 
    getApplicationPermissionByIdController, 
    updateApplicationPermissionController 
} from "../controllers/applicationPermission.controllers.js";
import {createApplication, updateApplication} from '../validations/applicationPermission.validation.js'

const routes = Router();

// routes.use('*', verifyToken)
routes.get('/', getAllApplicationPermissionsController);
routes.get('/:id', getApplicationPermissionByIdController);
routes.post('/', createApplication, createApplicationPermissionController);
routes.patch('/:id', updateApplication, updateApplicationPermissionController);
routes.delete('/:id', deleteApplicationPermissionController);

export default routes;