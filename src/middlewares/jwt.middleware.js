import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  //1. Read the token

  const token = req.headers["authorization"];

  //2.If no token, return error

  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  //3.Check if the token is valid
  try {
    const payload = jwt.verify(token, "0hLQGCT3aULMPfv3VlF0CysS26eMbtLA");
    console.log(payload);

    req.userId = payload.userId;
  } catch (err) {
    //4.Call next middleware, else return error
    return res.status(400).send({ message: "Unauthorized" });
  }

  //5.Call the next middleware
  next();
};

export default jwtAuth;
