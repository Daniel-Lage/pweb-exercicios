import type { ProductPayload } from "../models/products.model.js";
import type { ProductsRepository } from "../repositories/products.repository.js";
import { AppError } from "../utils/AppError.js";

export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async listProducts() {
    return this.productsRepository.listProducts();
  }

  async findProductById(id: number) {
    const product = this.productsRepository.findProductById(id);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    return product;
  }

  async createProduct(payload: ProductPayload) {
    if (payload.price < 0) {
      throw new AppError("Product price cannot be negative", 400);
    }

    const existingProduct = await this.productsRepository.findProductByName(
      payload.name,
    );

    if (existingProduct) {
      throw new AppError("Product already exists", 409);
    }

    return await this.productsRepository.createProduct(payload);
  }

  async updateProduct(id: number, changes: Partial<ProductPayload>) {
    await this.findProductById(id);
    return this.productsRepository.updateProduct(id, changes);
  }

  async deleteProduct(id: number) {
    await this.findProductById(id);
    return await this.productsRepository.deleteProduct(id);
  }
}
