import { UserModel } from "./user.model.js";
import jwt from "jsonwebtoken";

export default class UserController {
  signUp(req, res) {
    const { namde, email, password, type } = req.body;
    const user = UserModel.signUp(namde, email, password, type);
    res.status(201).send(user);
  }

  signIn(req, res) {
    const { email, password } = req.body;
    const user = UserModel.signIn(email, password);
    if (user) {
      //1. Create Token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        "0hLQGCT3aULMPfv3VlF0CysS26eMbtLA",
        { expiresIn: "1h" }
      );
      return res.status(200).send(token);
    } else {
      return res.status(400).send({ message: "Invalid credentials" });
    }
  }
}
