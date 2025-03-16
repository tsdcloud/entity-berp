import { USERS_API } from "../config/config.js";
import HTTP_STATUS from "./http.utils.js";

export const getUserData = async (req, res)=>{

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const requestOptions = {
            method: "GET",
            headers:{
                "Content-Type":"application/json",
                "authorization":req.headers.authorization
            },
        };
        let response = await fetch(`${USERS_API}gateway/user_info/`, requestOptions);
        if(response.status === 200){
            let result = await response.json();
            return result;
        }
    } catch (error) {
        console.log(error);
        return res.status(HTTP_STATUS.SERVEUR_ERROR.statusCode).send(HTTP_STATUS.SERVEUR_ERROR.message);
    }
}