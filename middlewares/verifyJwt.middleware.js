import { USERS_API } from "../config/config.js";
import HTTP_STATUS from '../utils/http.utils.js'

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    let result = fetch(`${USERS_API}/verify`);
    if((await result).status != 200){
      throw new Error("Invalid user token")
    }
    next();
  } catch (error) {
    console.error(error);
    return res
    .status(HTTP_STATUS.BAD_REQUEST.statusCode)
    .send(HTTP_STATUS.BAD_REQUEST.message);
  }
};
