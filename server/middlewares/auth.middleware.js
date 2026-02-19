import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            error: 'Unauthorized User',
        });
    }

    try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET);

       if(!decoded) {
           return res.status(401).json({
               message: 'decoded is undefined',
           });
       }

       req.user = decoded;
       next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid or expired token',
        })
    }
}