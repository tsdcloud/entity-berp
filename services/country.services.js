import {prisma} from '../config/config.js';
import { apiErrorResponse, apiSuccessResponse } from '../utils/apiResponse.js';
const countryClient = prisma.country;


const LIMIT = 100;
const ORDER ="desc";
const SORT_BY = "createdAt"

/**
 * Create a country
 * @param body 
 * @returns 
 */
export const createCountryService = async (body)=>{
    try {
        let {name} = body

        let countryExist = await countryClient.findFirst({
            where:{name, isActive:true}
        });

        if(countryExist) return apiErrorResponse([{message:'country already exist', field:'name'}])
        let country = await countryClient.create({
            data:body
        });
        return apiSuccessResponse(country);
    } catch (error) {
        console.log(error);
        return apiErrorResponse([{
            message:`${error}`,
            field:'server'
        }])
    }
}


/**
 * Get all countries
 * @returns 
 */
export const getAllCountriesService = async() =>{
    const page = 1;
    const skip = (page - 1) * LIMIT;

    try {
        let countries = await countryClient.findMany({
            where:{isActive:true},
            skip: parseInt(skip),
            take: parseInt(LIMIT),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await countryClient.count({
            where:{isActive:true}
        });
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / LIMIT),
            total,
            data: countries,
        };
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`)
    }
}

/**
 * Get country by id
 * @param id 
 * @returns 
 */
export const getCountryByIdService = async(id) =>{
    try {
        let country = await countryClient.findFirst({
            where:{id, isActive: true},
        });
        if (!country) return apiErrorResponse([{message:'country not found', field:'id'}]);
        return country;
    } catch (error) {
        console.log(error);
        return apiErrorResponse([{message:`${error}`, field:'server'}]);
    }
}

/**
 * Get country by params
 * @param request 
 * @returns 
 */
export const getCountryByParams = async (request) =>{
    const { page = 1, limit = LIMIT, sortBy = SORT_BY, order=ORDER, ...queries } = request; 
    const skip = (page - 1) * limit;
    try {
        let country = await countryClient.findMany({
            where:queries,
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await categoryClient.count({
            where:{isActive:true}
        });
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            total,
            data: country,
        };
    } catch (error) {
        console.log(error);
        return apiErrorResponse([{message:`${error}`, fields:'server'}])
    }
}

/**
 * Update country
 * @param id 
 * @param body 
 * @returns 
 */
export const updateCountryService = async (id, body) =>{
    try {
        let country = await countryClient.update({
            where:{id, isActive:true},
            data:body
        });
        
        if(!country) return apiErrorResponse([{messgae:'country not found', field:'id'}]);
        return country;
    } catch (error) {
        console.log(error)
        return apiErrorResponse([{message:`${error}`, field:'server'}]);
    }
}

/**
 * 
 * @param id 
 * @returns 
 */
export const deleteCountryServices = async (id) =>{
    try {
        let countryExist = await countryClient.findUnique({
            where:{id, isActive:true}
        });

        if(!countryExist) return apiErrorResponse([{message:'country not found', field:'server'}]);
        let country = await countryClient.update({
            where: {id}, 
            data:{
                isActive:false,
                name:`deleted_${countryExist.name}_${new Date().toTimeString()}`
            }
        });
        return country
    } catch (error) {
        console.log(error);
        return apiErrorResponse([{message:`${error}`, field:'server'}]);
    }
}