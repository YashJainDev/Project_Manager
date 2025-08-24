import AsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import "dotenv/config";
import UnauthorizedError from '../Error/UnauthorizedError.js'
import ValidationError from '../Error/ValidationError.js';

const authenticateToken = AsyncHandler((req,res,next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token){
        throw new ValidationError("Validation Error", "Authorization Token Not Provided");
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        const userData = decoded.payload;        
        delete userData.password;
        req.user = userData;
        next();
    } catch (err) {
        throw new UnauthorizedError("Unauthorized",err.name);
    }
  
});

export default authenticateToken;