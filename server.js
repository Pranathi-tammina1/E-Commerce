//Import express
import express from "express";
import ProductRouter from "./src/features/product/product.routes.js";
import bodyParser from "body-parser";
import userRouter from "./src/features/user/user.routes.js";
import cartRouter from "./src/features/cartItems/cartItems.routes.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import swagger from "swagger-ui-express";
import apiDocs from "./swagger.json" with { type: "json" };

//Create server
const server = express();

//Middleware to parse json data
server.use(bodyParser.json());

server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

//For all requests realtes to product, redirect to product routes.
server.use("/api/products", jwtAuth, ProductRouter);
server.use("/api/users", userRouter);
server.use("/api/cartItems", jwtAuth, cartRouter);

//Create default request handler
server.get("/", (req, res) => {
  res.send("Welcome to E-Commerce API");
});

//Specift port
server.listen(3200, () => {
  //Default message
  console.log("Server is running");
});
