import { Router } from "express";
import { 
    createEmployeeController, 
    deleteEmployeeController, 
    getAllEmployeesController, 
    getEmployeeByIdController, 
    updateEmployeeController 
} from "../controllers/employee.controllers.js";
import {createRole, updateRole} from '../validations/employee.validations.js'

const routes = Router();

// routes.use('*', verifyToken)
routes.get('/', getAllEmployeesController);
routes.get('/:id', getEmployeeByIdController);
routes.post('/', createRole, createEmployeeController);
routes.patch('/:id', updateRole, updateEmployeeController);
routes.delete('/:id', deleteEmployeeController);

export default routes;