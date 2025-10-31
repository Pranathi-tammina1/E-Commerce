//Manage routes/paths to productController

//Import express from express
import express from "express";
import { CartItemsController } from "./cartItems.controller.js";

//Initialize express router
const cartRouter = express.Router();

const cartItemsController = new CartItemsController();

cartRouter.post("/", cartItemsController.addToCart);
cartRouter.get("/", cartItemsController.get);
cartRouter.delete("/:id", cartItemsController.deleteFromCart);

export default cartRouter;
