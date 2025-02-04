import {prisma} from '../config/config.js';
const employeeClient = prisma.employee;


const LIMIT = 100;
const ORDER ="desc";
const SORT_BY = "createdAt"

/**
 * Create employee
 * @param body 
 * @returns 
 */
export const createEmployeeService = async (body)=>{
    try {
        let employee = await employeeClient.create({
            data:body
        });
        return employee;
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}


/**
 * 
 * @returns 
 */
export const getAllEmployeesService = async(body) =>{
    const page = 1;
    const skip = (page - 1) * LIMIT;

    try {
        let employees = await employeeClient.findMany({
            where:{isActive:true},
            skip: parseInt(skip),
            take: parseInt(LIMIT),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await employeeClient.count({
            where:{isActive:true}
        });
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / LIMIT),
            total,
            data: employees,
        };
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`)
    }
}

/**
 * 
 * @param id 
 * @returns 
 */
export const getEmployeeByIdService = async(id) =>{
    try {
        let employee = await employeeClient.findFirst({
            where:{id, isActive: true},
        });
        if (!employee) throw new Error(`No employee found.`)
        return employee;
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}

/**
 * 
 * @param request 
 * @returns 
 */
export const getEmployeesByParams = async (request) =>{
    const { page = 1, limit = LIMIT, sortBy = SORT_BY, order=ORDER, search, ...queries } = request; 
    const skip = (page - 1) * limit;

    try {
        let employees = await employeeClient.findMany({
            where:!search ? {...queries, isActive:true} : {
                name:{
                    contains:search
                },
                isActive:true
            },
            include:{
                employeePermissions:{
                    include:{
                        permission:true
                    }
                },
                employeeRoles:true,
                echelon:true,
                function:true,
                entity:true
            },
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await employeeClient.count();
        return search ? {data: employees} :{
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            total,
            data: employees,
        };
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}

/**
 * 
 * @param id 
 * @param body 
 * @returns 
 */
export const updateEmployeeService = async (id, body) =>{
    try {
        let employee = await employeeClient.update({
            where:{id},
            data:body
        });
        return employee;
    } catch (error) {
        console.log(error)
        throw new Error(`${error}`);
    }
}

/**
 * 
 * @param id 
 * @returns 
 */
export const deleteEmployeeServices = async (id) =>{
    try {
        let employee = await employeeClient.update({
            where: {id},
            data:{isActive:false}
        });
        return employee
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}