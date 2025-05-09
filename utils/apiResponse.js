export const apiErrorResponse = (error_list) =>{
    return {
        error: true,
        error_list
    }
}

export const apiSuccessResponse = (data)=>{
    return {
        error:false,
        data
    }
}