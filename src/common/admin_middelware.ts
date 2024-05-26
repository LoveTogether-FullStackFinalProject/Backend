import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/admin_model';

export interface AuthRequest extends Request {
  user?: { _id: string};
}

const adminMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
  return res.sendStatus(401).send("missing authorization header");
  }
  
    const decoded = jwt.decode(token) as { _id: string } | null;
    if (!decoded) {
      return res.status(401).send("invalid token");
    }
    const userId = decoded._id;
    
    const user = await User.findOne({_id : userId})
    if(user?.isAdmin == true)
    {
      next();
    }
  

    else {
      return res.status(403).send("Not admin");
    }
};

export default adminMiddleware;