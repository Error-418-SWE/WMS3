import { Product } from "@/model/product";
import { ProductMapper } from "@/model/dataMapper/productMapper";
import getAllProducts from "@/ServerActions/Products/getAllProducts";
import getProductById from "@/ServerActions/Products/getProductById";
import { ProductRepository } from "@/model/dataRepository/productRepository";

jest.mock("@/ServerActions/Products/getAllProducts");
jest.mock("@/ServerActions/Products/getProductById");
jest.mock("@/model/dataMapper/productMapper");

describe("ProductRepository", () => {
    let productRepository: ProductRepository;

    beforeEach(() => {
        (getAllProducts as jest.Mock).mockClear();
        (getProductById as jest.Mock).mockClear();
        (ProductMapper.prototype.toDomain as jest.Mock).mockClear();

        productRepository = new ProductRepository();
    });

    it("should get all products", async () => {
        const mockProductJson = {
            id: 1,
            name: "Product 1",
            weight: 1,
            length: 1,
            width: 1,
            height: 1,
            categories: ["Category 1"]
        };
        const mockProduct = new Product(1, "Product 1", 1, 1, 1, 1, ["Category 1"]);
        (getAllProducts as jest.Mock).mockResolvedValue([mockProductJson]);
        (ProductMapper.prototype.toDomain as jest.Mock).mockReturnValue(mockProduct);

        const result = await productRepository.getAll();

        expect(result).toEqual([mockProduct]);
        expect(getAllProducts).toHaveBeenCalled();
    });

    it("should get product by id", async () => {
        const mockProductJson = {
            id: 1,
            name: "Product 1",
            weight: 1,
            length: 1,
            width: 1,
            height: 1,
            categories: ["Category 1"]
        };
        const mockProduct = new Product(1, "Product 1", 1, 1, 1, 1, ["Category 1"]);
        (getProductById as jest.Mock).mockResolvedValue(mockProductJson);
        (ProductMapper.prototype.toDomain as jest.Mock).mockReturnValue(mockProduct);

        const result = await productRepository.getById("1");

        expect(result).toEqual(mockProduct);
        expect(getProductById).toHaveBeenCalledWith("1");
    });

    it("should handle errors when getting all products", async () => {
        (getAllProducts as jest.Mock).mockRejectedValue(new Error("Network error"));

        await expect(productRepository.getAll()).rejects.toThrow("Network error");
    });

    it("should handle errors when getting product by id", async () => {
        (getProductById as jest.Mock).mockRejectedValue(new Error("Network error"));

        await expect(productRepository.getById("1")).rejects.toThrow("Network error");
    });

    it("should return empty array when no products are found", async () => {
        (getAllProducts as jest.Mock).mockResolvedValue([]);
        (ProductMapper.prototype.toDomain as jest.Mock).mockReturnValue(null);

        const result = await productRepository.getAll();

        expect(result).toEqual([]);
    });

    it("should return null when no product is found by id", async () => {
        (getProductById as jest.Mock).mockResolvedValue(null);
        (ProductMapper.prototype.toDomain as jest.Mock).mockReturnValue(null);

        const result = await productRepository.getById("1");

        expect(result).toBeNull();
    });
});
