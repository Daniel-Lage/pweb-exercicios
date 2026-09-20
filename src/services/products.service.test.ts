import type { ProductObject } from "../models/products.model.js";
import { ProductsService } from "./products.service.js";
import type { ProductsRepository } from "../repositories/products.repository.js";
import { AppError } from "../utils/AppError.js";

describe("ProductsService", () => {
  it("should throw AppError with status 400 when creating a product with negative price", async () => {
    const fakeRepository = {
      listProducts: (async () => []) as () => Promise<ProductObject[]>,
      findProductById: (async () =>
        null) as () => Promise<ProductObject | null>,
      findProductByName: (async () =>
        null) as () => Promise<ProductObject | null>,
      createProduct: (async () => ({})) as () => Promise<ProductObject>,
      updateProduct: (async () => null) as () => Promise<ProductObject | null>,
      deleteProduct: (async () => false) as () => Promise<boolean>,
    };

    const service = new ProductsService(fakeRepository as ProductsRepository);

    await expect(
      service.createProduct({ name: "Mouse", price: -50 }),
    ).rejects.toEqual(new AppError("Product price cannot be negative", 400));

    expect(fakeRepository.findProductByName).not.toHaveBeenCalled();
    expect(fakeRepository.createProduct).not.toHaveBeenCalled();
  });

  it("should throw AppError with status 409 when creating a product with a duplicate name", async () => {
    const fakeRepository = {
      listProducts: (async () => []) as () => Promise<ProductObject[]>,
      findProductById: (async () =>
        null) as () => Promise<ProductObject | null>,
      findProductByName: (async () => ({
        id: 1,
        name: "Keyboard",
        price: 200,
      })) as () => Promise<ProductObject | null>,
      createProduct: (async () => ({})) as () => Promise<ProductObject>,
      updateProduct: (async () => null) as () => Promise<ProductObject | null>,
      deleteProduct: (async () => false) as () => Promise<boolean>,
    };
    const service = new ProductsService(fakeRepository as ProductsRepository);

    await expect(
      service.createProduct({ name: "Keyboard", price: 200 }),
    ).rejects.toEqual(new AppError("Product already exists", 409));

    expect(fakeRepository.createProduct).not.toHaveBeenCalled();
  });
});
