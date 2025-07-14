import jwt from 'jsonwebtoken'
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 * @returns 
 */
export function checkUser(req,res,next){
    const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized',status:false }); 
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using JWT secret key in .env
        req.user = decoded; 
        next(); 
    } catch (error) {
        console.error(error)
        return res.status(401).json({ message: 'Invalid Login Details!',status:false });
    }
}