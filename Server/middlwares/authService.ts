import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface CustomRequest extends Request {
  userId?: string;
}

const userAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string | null = "";

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  
  if (!token) {
    console.log("no token");
  }
  let payload;
  try {
     payload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );
    
    if (!payload) {
        throw new Error("Invalid token");
      }
    next();
  } catch (err) {
    console.log(err)
  }
};

export default userAuthMiddleware;
