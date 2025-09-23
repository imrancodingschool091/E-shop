import jwt from "jsonwebtoken"


export const authMiddleware=(req,res,next)=>{
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided or invalid format.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    req.user=decoded.userId;

    next();
    
  } catch (error) {
      return res.status(403).json({ message: 'Invalid or expired token.' });

  }
}