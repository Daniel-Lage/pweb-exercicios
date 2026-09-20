import type {
  ProductObject,
  ProductPayload,
} from "../models/products.model.js";

const products: ProductObject[] = [];

export class ProductsRepository {
  async listProducts() {
    return products;
  }

  async findProductById(id: number) {
    const product = products.find((product) => product.id === id);

    if (!product) {
      return null;
    }

    return product;
  }

  async findProductByName(name: string) {
    const product = products.find((product) => product.name === name);

    if (!product) {
      return null;
    }

    return product;
  }

  async createProduct(payload: ProductPayload) {
    const newProduct = { id: products.length, ...payload };

    products.push(newProduct);

    return newProduct as ProductObject;
  }

  async updateProduct(id: number, changes: Partial<ProductPayload>) {
    const index = products.findIndex((product) => product.id === id);

    if (index === -1) {
      return null;
    }

    const product = products[index]!;

    const definedChanges = Object.fromEntries(
      Object.entries(changes).filter((entry) => {
        const value = entry[1];
        return value !== undefined;
      }),
    ) as Partial<ProductPayload>;

    const newProduct = {
      ...product,
      ...definedChanges,
    };

    products[index] = newProduct;

    return newProduct;
  }

  async deleteProduct(id: number) {
    const index = products.findIndex((product) => product.id === id);

    if (index === -1) {
      return false;
    }

    products.splice(index, 1);

    return true;
  }
}
