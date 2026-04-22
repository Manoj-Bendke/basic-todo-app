import jwt from "jsonwebtoken";

 function Auth(pass) {
  return async function userAuth(req, res, next) {
  const token = req.headers.authorization;
  try {
    const user = await jwt.verify(token, pass);
    if (user) {
    req.UserId = user.Id;
    res.status(200)
    next()
  }else{
    return res.status(404).json({error:"User not found"})
  }
  } catch (error) {
    console.log(error);
    res.status(400).json({error:"Something went wrong"})
  }
}
}
export{Auth}