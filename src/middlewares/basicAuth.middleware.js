import { UserModel } from "../features/user/user.model.js";

const basicAuthorozer = (req, res, next) => {
  //1.Check if authorization header is present

  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).send("No authorization details found");
  }
  console.log(authHeader);
  //2.Exctract credentials.[Basic bdjsdqijwe38yr3ejwsndw]
  const base4Credentials = authHeader.replace("Basic ", "");
  console.log(base4Credentials);

  //3.Decode the credentials
  const decodedCreds = Buffer.from(base4Credentials, "base64").toString("utf8");
  console.log(decodedCreds); //[username : password]

  const creds = decodedCreds.split(":");

  const user = UserModel.getAll().find(
    (u) => u.email === creds[0] && u.password === creds[1]
  );
  if (user) {
    next();
  } else {
    return res.status(401).send("Invalid credentials");
  }
};

export default basicAuthorozer;
