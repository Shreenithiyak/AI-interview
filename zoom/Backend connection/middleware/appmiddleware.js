import jwt from 'jsonwebtoken'

export const checktoken =async(req,res,next)=>{
try {
    const token = req.headers.authorization
    if(!token){
        return res.status(401).json({msg:"token not found"})
    }
    const verify = await jwt.verify(token,process.env.JWT_SECURE)
    req.users=verify
    next()
} catch (error) {
    console.log('error',error);
  res.status(401).json({msg:"token not found"})
    
}

}