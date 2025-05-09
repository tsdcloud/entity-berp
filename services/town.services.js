import {prisma} from '../config/config.js';
import {apiErrorResponse} from '../utils/apiResponse.js'
const townClient = prisma.town;


const LIMIT = 100;
const ORDER ="desc";
const SORT_BY = "createdAt"

/**
 * Create a town
 * @param body 
 * @returns 
 */
export const createTownService = async (body)=>{
    let {name, districtId} = body;
    
     // check if district exist
    let districtExist = await prisma.district.findFirst({
        where:{id:districtId, isActive:true}
    });
    if(!districtExist) return apiErrorResponse([{message:'district not found', field:'districtId'}])
    
        // Check association
    let associationExist = await townClient.findFirst({
        where:{
            AND:{
                name,
                districtId
            }
        }
    });
    if(associationExist) return apiErrorResponse([{message:'town already belongs to district', field:'name, districtId'}])

    try {
        let town = await townClient.create({
            data:body
        });
        return town;
    } catch (error) {
        console.log(error);
        return apiErrorResponse([{message:`${error}`, field:'server'}])
    }
}


/**
 * 
 * @returns 
 */
export const getAllTownsService = async(body) =>{
    const page = 1;
    const skip = (page - 1) * LIMIT;

    try {
        let towns = await townClient.findMany({
            where:{isActive:true},
            include:{
                district:true
            },
            skip: parseInt(skip),
            take: parseInt(LIMIT),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await townClient.count({
            where:{isActive:true}
        });;
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / LIMIT),
            total,
            data: towns,
        };
    } catch (error) {
        console.log(error);
        return apiErrorResponse([{message:`${error}`, field:'name'}])
    }
}

/**
 * 
 * @param id 
 * @returns 
 */
export const getTownByIdService = async(id) =>{
    try {
        let town = await townClient.findFirst({
            where:{id, isActive: true},
        });
        if (!town) throw new Error(`No town found.`)
        return town;
    } catch (error) {
        console.log(error);
        return apiErrorResponse([{message:`${error}`, field:'name'}])
    }
}

/**
 * 
 * @param request 
 * @returns 
 */
export const getTownsByParams = async (request) =>{
    const { page = 1, limit = LIMIT, sortBy = SORT_BY, order=ORDER, ...queries } = request; 
    const skip = (page - 1) * limit;
    try {
        let town = await townClient.findMany({
            where:{...queries, isActive:true},
            include:{
                district:true
            },
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await townClient.count({
            where:{isActive:true}
        });;
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            total,
            data: town,
        };
    } catch (error) {
        console.log(error);
        return apiErrorResponse([{message:`${error}`, field:'name'}])
    }
}

/**
 * 
 * @param id 
 * @param body 
 * @returns 
 */
export const updateTownService = async (id, body) =>{
    try {
        let {name, districtId} = body;
    
        // check if district exist
        let districtExist = await prisma.district.findFirst({
            where:{id:districtId, isActive:true}
        });
        if(!districtExist) return apiErrorResponse([{message:'district not found', field:'districtId'}])
        
        if(name && districtId){
            // Check association
            let associationExist = await townClient.findFirst({
                where:{
                    AND:{
                        name,
                        districtId
                    }
                }
            });
            if(associationExist) return apiErrorResponse([{message:'town already belongs to district', field:'name, districtId'}]);
        }

        let town = await townClient.update({
            where:{id},
            data:body
        });
        return town;
    } catch (error) {
        console.log(error)
        return apiErrorResponse([{message:`${error}`, field:'name'}])
    }
}

/**
 * Delete town
 * @param id 
 * @returns 
 */
export const deleteTownService = async (id) =>{
    try {
        let townExist = await townClient.findFirst({
            where:{
                id, 
                isActive:true
            }
        });

        if(!townExist) return apiErrorResponse([{message:`town does not exist`, field:'name'}])
        let town = await townClient.update({
            where: {id},
            data:{
                isActive:false, 
                name: `deleted_${townExist.name}_${new Date().toTimeString()}`
            }
        });
        return town
    } catch (error) {
        console.log(error);
        return apiErrorResponse([{message:`${error}`, field:'name'}])
    }
}