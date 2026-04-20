import jwt from "jsonwebtoken";
import { userJWTSecret, adminJWTSecret } from "../config/config";

async function userAuth(req, res, next) {
  const token = req.headers.authorization;
  const user = await jwt.verify(token, userJWTSecret);
  if (user) {
    req.UserId = user.Id;
    res.status(200)
    next()
  }else{
    res.status(404).json({error:"User not found"})
  }
}
async function adminAuth(req, res, next) {
  const token = req.headers.authorization;
  const admin = await jwt.verify(token, adminJWTSecret);
   if (admin) {
    req.AdminId = admin.Id;
    res.status(200)
    next()
  }{
    res.status(404).json({error:"Admin not found"})
  }
}

export{userAuth,adminAuth}