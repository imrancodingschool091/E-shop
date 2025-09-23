import express from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/product.controller.js";
import { upload } from "../middlewares/upload.js";
const router = express.Router();

// Upload single product image + create product
router.post("/", upload.single("image"), createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", upload.single("image") ,updateProduct);
router.delete("/:id", deleteProduct);


export default router;
