import {prisma} from '../config/config.js';
import {apiErrorResponse} from '../utils/apiResponse.js'
const applicationClient = prisma.application;


const LIMIT = 100;
const ORDER ="desc";
const SORT_BY = "createdAt"

/**
 * Create application
 * @param body 
 * @returns 
 */
export const createApplicationService = async (body)=>{
    try {
        let { name, displayName } = body
        let nameExist = await applicationClient.findFirst({
            where:{name, isActive:true}
        });

        let displayNameExist = await applicationClient.findFirst({
            where:{
                displayName
            }
        });

        if(!displayNameExist) return apiErrorResponse([{message:'display already attributed', field:'displayName'}])

        if(nameExist) return apiErrorResponse([{message:'name already exist', field:'name'}])
        let application = await applicationClient.create({
            data:body
        });
        return application;
    } catch (error) {
        console.log(error);
        return apiErrorResponse([{message:`${error}`, field:'server'}])
    }
}


/**
 * Get all applications
 * @returns 
 */
export const getAllApplicationsService = async(body) =>{
    const page = 1;
    const skip = (page - 1) * LIMIT;

    try {
        let applications = await applicationClient.findMany({
            where:{isActive:true},
            skip: parseInt(skip),
            take: parseInt(LIMIT),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await applicationClient.count({
            where:{isActive:true}
        });
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / LIMIT),
            total,
            data: applications,
        };
    } catch (error) {
        console.log(error);
        return apiErrorResponse([{message:`${error}`, field:'server'}])
    }
}

/**
 * Get application by id
 * @param id 
 * @returns 
 */
export const getApplicationByIdService = async(id) =>{
    try {
        let application = await applicationClient.findFirst({
            where:{id, isActive: true},
        });
        if (!application) return apiErrorResponse([{message:`applciation does not exist`, field:'id'}]);
        return application;
    } catch (error) {
        console.log(error);
        return apiErrorResponse([{message:`${error}`, field:'server'}])
    }
}

/**
 * Get application by params
 * @param request 
 * @returns 
 */
export const getApplicationsByParams = async (request) =>{
    const { page = 1, limit = LIMIT, sortBy = SORT_BY, order=ORDER, ...queries } = request; 
    const skip = (page - 1) * limit;
    try {
        let applications = await applicationClient.findMany({
            where:queries,
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await applicationClient.count({
            where:{isActive:true}
        });;
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            total,
            data: applications,
        };
    } catch (error) {
        console.log(error);
        return apiErrorResponse([{message:`${error}`, field:'server'}]);
    }
}

/**
 * Update applcation
 * @param id 
 * @param body 
 * @returns 
 */
export const updateApplicationService = async (id, body) =>{
    try {
        let {name, displayName} = body;
        if(name){
            let nameExist = await applicationClient.findFirst({
                where:{name, isActive:true}
            });
            if(nameExist) return apiErrorResponse([{message:`name already exist`, field:'name'}]);
        }
        
        if(displayName){
            let displayNameExist = await applicationClient.findFirst({
                where:{displayName, isActive:true}
            });
            if(displayNameExist) return apiErrorResponse([{message:`display name already exist`, field:'name'}]);
        }
        let application = await applicationClient.update({
            where:{id, isActive:true},
            data:body
        });
        return application;
    } catch (error) {
        console.log(error)
        return apiErrorResponse([{message:`${error}`, field:'server'}]);
    }
}

/**
 * Delete application
 * @param id 
 * @returns 
 */
export const deleteApplicationServices = async (id) =>{
    try {
        let applicationExist = await applicationClient.findFirst({
            where:{id, isActive:true}
        });

        if(!applicationExist) return apiErrorResponse([{message:`application does not exist`, field:'id'}]);
        let application = await applicationClient.update({
            where: {id},
            data:{
                name:`deleted_${applicationExist.name}_${new Date().toTimeString()}`, 
                displayName:`deleted_${applicationExist.displayName}_${new Date().toTimeString()}`, 
                isActive:false
            }
        });
        return application
    } catch (error) {
        console.log(error);
        return apiErrorResponse([{message:`${error}`, field:'server'}])
    }
}