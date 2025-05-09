import {prisma} from '../config/config.js';
import { apiErrorResponse } from '../utils/apiResponse.js';
const districtClient = prisma.district;


const LIMIT = 100;
const ORDER ="desc";
const SORT_BY = "createdAt"

/**
 * Create a district
 * @param body 
 * @returns 
 */
export const createDistrictService = async (body)=>{
    try {
        let {countryId, name} = body
        let countryExist = await prisma.country.findFirst({
            where:{id:countryId, isActive:true}
        });

        if(!countryExist) return apiErrorResponse([{message:'invalid country id', field:'countryId'}]);

        // Check constraint
        let associationExist = await districtClient.findFirst({
            where:{
                AND:{
                    countryId,
                    name
                }
            }
        });

        if(associationExist) return apiErrorResponse([{message:'country and district association already exist', field:"countryId, name"}])
        let district = await districtClient.create({
            data:body
        });

        return district;
    } catch (error) {
        console.log(error);
        return apiErrorResponse([{message:`${error}`, field:"server"}]);
    }
}


/**
 * 
 * @returns 
 */
export const getAllDistrictsService = async(body) =>{
    const page = 1;
    const skip = (page - 1) * LIMIT;

    try {
        let districts = await districtClient.findMany({
            where:{isActive:true},
            skip: parseInt(skip),
            take: parseInt(LIMIT),
            orderBy:{
                createdAt:'desc'
            },
            include:{
                country:true
            }
        });
        const total = await districtClient.count({
            where:{isActive:true}
        });;
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / LIMIT),
            total,
            data: districts,
        };
    } catch (error) {
        console.log(error);
        return apiErrorResponse([{message:`${error}`, field:"server"}]);
    }
}

/**
 * 
 * @param id 
 * @returns 
 */
export const getDistrictByIdService = async(id) =>{
    try {
        let district = await districtClient.findFirst({
            where:{id, isActive: true},
            include:{
                country:true
            }
        });
        if (!district) return apiErrorResponse([{message:`district not found`, field:"server"}]);
        return district;
    } catch (error) {
        console.log(error);
        return apiErrorResponse([{message:`${error}`, field:"server"}]);
    }
}

/**
 * Get district by params
 * @param request 
 * @returns 
 */
export const getDistrictsByParams = async (request) =>{
    const { page = 1, limit = LIMIT, sortBy = SORT_BY, order=ORDER, ...queries } = request; 
    const skip = (page - 1) * limit;
    try {
        let districts = await districtClient.findMany({
            where:queries,
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy:{
                createdAt:'desc'
            },
            include:{
                country:true
            }
        });
        const total = await districtClient.count({
            where:{isActive:true}
        });
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            total,
            data: districts,
        };
    } catch (error) {
        console.log(error);
        return apiErrorResponse([{message:`${error}`, field:"server"}]);
    }
}

/**
 * Update district
 * @param id 
 * @param body 
 * @returns 
 */
export const updateDistrictService = async (id, body) =>{
    try {
        let {countryId, name} = body
        if(countryId){
            let countryExist = await prisma.country.findFirst({
                where:{id:countryId, isActive:true}
            });
    
            if(!countryExist) return apiErrorResponse([{message:'invalid country id', field:'countryId'}]);
        }

        // Check constraint
        if(name || countryId){
            let associationExist = await districtClient.findFirst({
                where:{
                    AND:{
                        countryId,
                        name
                    }
                }
            });
    
            if(associationExist) return apiErrorResponse([{message:'country and district association already exist', field:"countryId, name"}]);
        }
        
        let district = await districtClient.update({
            where:{id},
            data:body
        });
        return district;
    } catch (error) {
        console.log(error)
        return apiErrorResponse([{message:`${error}`, field:"server"}]);
    }
}

/**
 * delete district
 * @param id 
 * @returns 
 */
export const deleteDistrictService = async (id) =>{
    try {
        let selectedDistrict = await districtClient.findUnique({
            where:{id, isActive:true}
        });

        if(!selectedDistrict) return apiErrorResponse([{message:'country not found', field:'id'}]);

        let district = await districtClient.update({
            where: {id},
            data:{
                isActive:false,
                name: `deleted_${selectedDistrict.name}_${new Date().toTimeString()}`
            }
        });
        return district
    } catch (error) {
        console.log(error);
        return apiErrorResponse([{message:`${error}`, field:"server"}]);
    }
}