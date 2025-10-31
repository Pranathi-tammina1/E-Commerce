//Manage routes/paths to productController

//Import express from express
import express from "express";
import ProductController from "./product.controller.js";
import { upload } from "../../middlewares/fileUpload.middleware.js";

//Initialize express router
const ProductRouter = express.Router();

const productController = new ProductController();

//All the paths to controller methods
ProductRouter.get("/", productController.getAllProducts);
ProductRouter.post(
  "/",
  upload.single("imageUrl"),
  productController.addproduct
);
ProductRouter.get("/:id", productController.getOneProduct);

ProductRouter.post("/rate", productController.rateProduct);

//localhost:4100/api/products/filter?minPrice=10&maxPrice=50&category=category1
ProductRouter.get("/filter", productController.filterProducts);

export default ProductRouter;
