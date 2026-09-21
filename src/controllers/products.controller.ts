import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import type { ProductsService } from "../services/products.service.js";
import { AppError } from "../utils/AppError.js";

export class ProductsController {
  constructor(private productsService: ProductsService) {}

  listProducts = asyncHandler(async (req: Request, res: Response) => {
    const products = await this.productsService.listProducts();
    res.json(products);
  });

  findProductById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!(typeof id === "string")) {
      throw new AppError("Product ID is required", 400);
    }

    const product = await this.productsService.findProductById(Number(id));

    res.json(product);
  });

  createProduct = asyncHandler(async (req: Request, res: Response) => {
    const { name, price } = req.body;

    const newProduct = await this.productsService.createProduct({
      name,
      price,
    });

    res.status(201).json(newProduct);
  });

  updateProduct = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!(typeof id === "string")) {
      throw new AppError("Product ID is required", 400);
    }

    const { name, price } = req.body;

    const updatedProduct = await this.productsService.updateProduct(
      Number(id),
      {
        name,
        price,
      },
    );

    res.json(updatedProduct);
  });

  deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!(typeof id === "string")) {
      throw new AppError("Product ID is required", 400);
    }

    await this.productsService.deleteProduct(Number(id));

    res.status(204).send();
  });
}
