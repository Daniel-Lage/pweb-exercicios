import { Router } from "express";
import { ProductsController } from "../controllers/products.controller.js";
import { ProductsService } from "../services/products.service.js";
import { ProductsRepository } from "../repositories/products.repository.js";

const repository = new ProductsRepository();
const service = new ProductsService(repository);
const controller = new ProductsController(service);

const router = Router();

router.get("/", controller.listProducts);

router.get("/:id", controller.findProductById);

router.post("/", controller.createProduct);

router.patch("/:id", controller.updateProduct);

router.delete("/:id", controller.deleteProduct);

export default router;
