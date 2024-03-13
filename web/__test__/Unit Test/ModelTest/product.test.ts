import { Product } from "@/model/product";

describe("Product", () => {
  let product: Product;
  let categories: string[];

  beforeEach(() => {
    categories = ["Categoria 1", "Categoria 2"];
    product = new Product(1, "Prodotto", 1, 1, 1, 1, categories);
  });

  it("returns the correct id", () => {
    expect(product.getId()).toBe(1);
  });

  it("returns the correct name", () => {
    expect(product.getName()).toBe("Prodotto");
  });

  it("returns the correct weight", () => {
    expect(product.getWeight()).toBe(1);
  });

  it("returns the correct length", () => {
    expect(product.getLength()).toBe(1);
  });

  it("returns the correct width", () => {
    expect(product.getWidth()).toBe(1);
  });

  it("returns the correct height", () => {
    expect(product.getHeight()).toBe(1);
  });

  it("returns the correct categories", () => {
    expect(product.getCategories()).toEqual(categories);
  });
});
