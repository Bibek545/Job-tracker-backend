import { verifyToken } from "../../config/jwt.js";

export const authValidation = (req, res, next) => {
  try {
    //1. Receving header and bearer using req.headers.authorisation
    // const { authorization } = req.headers;
    const authHeader = req.headers.authorization;
    // console.log(authHeader)

    //2. checking header is preseent
    if (!authHeader) {
      //   const token = authorization.split("")
      return res.status(401).json({
          status: "error",
          message: "Missig authorisation header",
      })
    }
    // 3. check Bearer format
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "error",
        message: "Missiing Bearer"
      });
    }

    //4. Extracting token
    const token = authHeader.split(" ")[1];
    // console.log(token)

    //5. verifying token
    const decoded = verifyToken(token);

    //6. attaching user
    req.user = decoded;

    //7.continue
    return next();
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: "Invalid or expired token",
    })
  }
};
