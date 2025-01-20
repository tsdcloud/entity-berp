import { USERS_API } from "../config/config.js";
import HTTP_STATUS from '../utils/http.utils.js';
import { jwtDecode } from "jwt-decode";

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const raw = JSON.stringify({token:token});
      const requestOptions = {
          method: "POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: raw,
      };
    let result = fetch(`${USERS_API}token/verify/`, requestOptions);
    if((await result).status != 200){
      throw new Error("Invalid user token")
    }
    // req.body.userId = jwtDecode(token)?.user_id
    next();
  } catch (error) {
    console.error(error);
    return res
    .status(HTTP_STATUS.BAD_REQUEST.statusCode)
    .send(HTTP_STATUS.BAD_REQUEST.message);
  }
};
