import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);
    if(!token){
        return res.status(401).json({
            message:"No token found"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({
                message:"decoded undefined."
            })
        }
        req.user = decoded;
        next();
    } catch(error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        })
    }
}