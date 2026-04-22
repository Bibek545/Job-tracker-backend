import { verifyToken } from "../../config/jwt";

export const authValidation = (req, res, next) => {
   try {
    // const { authorization } = req.headers;
     const authHeader = req.headers.authorization;


    if(!authHeader) {
    //   const token = authorization.split("")
        return res.send("Missig authorisation header")
    };

     if(!authHeader.startsWith("Bearer ")) {
        return res.send("Missiing Bearer")
     };

     const token = authorization.split(" ")[1];
  const decoded = verifyToken(token);

  req.user = decoded;

  next();
    } catch (error) {
        return res.send("Invalid or expired token")
    }

}