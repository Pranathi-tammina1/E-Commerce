//Import express
import express from "express";
import ProductRouter from "./src/features/product/product.routes.js";
import bodyParser from "body-parser";
import userRouter from "./src/features/user/user.routes.js";
import cartRouter from "./src/features/cartItems/cartItems.routes.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import swagger from "swagger-ui-express";
import apiDocs from "./swagger.json" with { type: "json" };
import cors from "cors";

//Create server
const server = express();

//CORS policy configuration

var corsOptions = {
  origin: "*",
  allowedHeaders: '*'
}

server.use(cors(corsOptions));


// server.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "*");
//   res.header("Access-Control-Allow-Methods", "*");
//   //return OK for preflight
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// })




//Middleware to parse json data
server.use(bodyParser.json());

server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

//For all requests realtes to product, redirect to product routes.
server.use("/api/products", jwtAuth, ProductRouter);
server.use("/api/users", userRouter);
server.use("/api/cartItems", jwtAuth, cartRouter);

//Response middleware to handle 404 - Resource not found
server.use((req, res) => {
  res.status(404).send("API not found. Please check our documentation for more information at localhost:3200/api-docs");
})

//Create default request handler
server.get("/", (req, res) => {
  res.send("Welcome to E-Commerce API");
});

//Specift port
server.listen(3200, () => {
  //Default message
  console.log("Server is running");
});
