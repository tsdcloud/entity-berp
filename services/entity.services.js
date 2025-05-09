import {prisma} from '../config/config.js';
import {apiErrorResponse} from '../utils/apiResponse.js'
const entityClient = prisma.entity;


const LIMIT = 100;
const ORDER ="desc";
const SORT_BY = "createdAt"

/**
 * Create a entity
 * @param body 
 * @returns 
 */
export const createEntityService = async (body)=>{
    try {
        let {townId, name} = body;
        // Check if the name already exist
        let nameExist = await entityClient.findUnique({
            where:{name}
        });

        if(nameExist) return apiErrorResponse([{message:'name already exist', field:'name'}]);
        // Check if the town exist
        let townExist = await prisma.town.findFirst({
            where:{id:townId}
        })
        if(!townExist) return apiErrorResponse([{message:'town does not exist', field:'townId'}]);

        let entity = await entityClient.create({
            data:body
        });
        return entity;
    } catch (error) {
        console.log(error);
        return apiErrorResponse([{message:`${error}`, field:'server'}]);
    }
}


/**
 * 
 * @returns 
 */
export const getAllEntitiesService = async(body) =>{
    const page = 1;
    const skip = (page - 1) * LIMIT;

    try {
        let entities = await entityClient.findMany({
            where:{isActive:true},
            skip: parseInt(skip),
            take: parseInt(LIMIT),
            include:{
                towns:true,
            },
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await entityClient.count({
            where:{isActive:true}
        });;
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / LIMIT),
            total,
            data: entities,
        };
    } catch (error) {
        console.log(error);
        return apiErrorResponse([{message:`${error}`, field:'server'}]);
    }
}

/**
 * 
 * @param id 
 * @returns 
 */
export const getEntityByIdService = async(id) =>{
    try {
        let entity = await entityClient.findFirst({
            where:{id, isActive: true},
        });
        if (!entity) return apiErrorResponse([{message:`entity not found`, field:'id'}]);
        return entity;
    } catch (error) {
        console.log(error);
        return apiErrorResponse([{message:`${error}`, field:'server'}]);
    }
}

/**
 * 
 * @param request 
 * @returns 
 */
export const getEntitiesByParams = async (request) =>{
    const { page = 1, limit = LIMIT, sortBy = SORT_BY, order=ORDER, ...queries } = request; 
    const skip = (page - 1) * limit;
    try {
        let entities = await entityClient.findMany({
            where:queries,
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await entityClient.count({
            where:{isActive:true}
        });;
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            total,
            data: entities,
        };
    } catch (error) {
        console.log(error);
        return apiErrorResponse([{message:`${error}`, field:'server'}]);
    }
}

/**
 * Update an entity
 * @param id 
 * @param body 
 * @returns 
 */
export const updateEntityService = async (id, body) =>{
    let  {name, townId} = body;
    try {
        let nameExist = await entityClient.findFirst({
            where:{name, isActive:true}
        });
        if(nameExist) return apiErrorResponse([{message:'name already exist', field:'name'}]);

        let townExist = await prisma.town.findFirst({
            where:{id:townId, isActive:true}
        });

        if(!townExist) return apiErrorResponse([{message:'town does not exist', field:'townId'}]);

        let entity = await entityClient.update({
            where:{id},
            data:body
        });
        return entity;
    } catch (error) {
        console.log(error)
        return apiErrorResponse([{message:`${error}`, field:'server'}]);
    }
}

/**
 * Delete entity
 * @param id 
 * @returns 
 */
export const deleteEntityServices = async (id) =>{
    try {
        let selectedEntity = await entityClient.findFirst({
            where:{
                id, isActive:true
            }
        });
        if(!selectedEntity) return apiErrorResponse([{message:`entity does not exist`, field:'id'}]);
        let entity = await entityClient.update({
            where: {id},
            data:{isActive:false, name:`deleted_${selectedEntity.name}_${new Date().toTimeString()}`}
        });
        return entity
    } catch (error) {
        console.log(error);
        return apiErrorResponse([{message:`${error}`, field:'server'}]);
    }
}