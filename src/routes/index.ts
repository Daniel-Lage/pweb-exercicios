import { Router } from "express";

import tasksRouter from "./tasks.routes.js";
import productsRouter from "./products.routes.js";

const router = Router();

router.use("/tasks", tasksRouter);
router.use("/products", productsRouter);

export default router;
