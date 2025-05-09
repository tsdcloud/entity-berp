import { 
    createApplicationService, 
    deleteApplicationServices, 
    getAllApplicationsService, 
    getApplicationByIdService, 
    getApplicationsByParams, 
    updateApplicationService } from "../services/application.services.js";
import HTTP_STATUS from "../utils/http.utils.js";
import {apiErrorResponse} from '../utils/apiResponse.js'

/**
 * Create application controller
 * @param req 
 * @param res 
 * @returns 
 */
export const createApplicationController = async (req, res) => {
    try {
        let application = await createApplicationService(req.body);
        res
        .status(application.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.CREATED.statusCode)
        .send(application);
        return;
    } catch (error) {
        console.log(error);
        res.sendStatus(HTTP_STATUS.BAD_REQUEST.statusCode);
        return
    }
}

/**
 * Get application by id controller
 * @param req
 * @param res 
 * @returns 
 */
export const getApplicaitionByIdController = async (req, res) => {
    let { id } = req.params;

    if(!id){
        res
        .status(HTTP_STATUS.NOT_FOUND.statusCode)
        .send(apiErrorResponse([{message:`id not provided`, field:'id'}]));
        return;
    }

    try {
        let application = await getApplicationByIdService(id);
        res
        .status(application.error ? HTTP_STATUS.NOT_FOUND.statusCode :HTTP_STATUS.OK.statusCode)
        .send(application)
        return;
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiErrorResponse([{message:`${error}`, field:'server'}]))
        return;
    }
}


/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const getAllApplicationsController = async(req, res) => {
    
    if(Object.keys(req.query).length !== 0 && req.query.constructor === Object){
        try {
            let  applications = await getApplicationsByParams(req.query);
            res
            .status(applications.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.OK.statusCode)
            .send(applications)
            return;
        } catch (error) {
          console.log(error);
          res
          .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
          .send(apiErrorResponse([{message:`${error}`, field:'server'}]));
          return;
        }
    }

    try {
        let applications = await getAllApplicationsService(req.body);
        res
        .status(applications.error ? HTTP_STATUS.BAD_REQUEST.statusCode :HTTP_STATUS.OK.statusCode)
        .send(applications)
        return
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.BAD_REQUEST.statusCode)
        .send(apiErrorResponse([{message:`${error}`, field:'server'}]));
        return;
    }
}


/**
 * 
 * @param req 
 * @param res 
 */
export const updateApplicationController = async (req, res) => {
    try {
        let application = await updateApplicationService(req.params.id, req.body);
        res
        .status(application.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.OK.statusCode)
        .send(application);
        return;
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.BAD_REQUEST.statusCode)
        .send(apiErrorResponse([{message:`${error}`, field:'server'}]))
        return;
    }
}


/**
 * 
 * @param req 
 * @param res 
 */
export const deleteApplicationController = async (req, res) => {
    try {
        let application = await deleteApplicationServices(req.params.id);
        res
        .status(application.error ? HTTP_STATUS.NOT_FOUND.statusCode : HTTP_STATUS.NO_CONTENT.statusCode)
        .send(application)
        return;
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.BAD_REQUEST.statusCode)
        .send(apiErrorResponse([{message:`${error}`, field:'server'}]));
        return;
    }
}
