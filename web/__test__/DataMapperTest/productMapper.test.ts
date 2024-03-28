import { ProductMapper } from "@/model/dataMapper/productMapper";
import { Product } from "@/model/product";

describe("ProductMapper", () => {
	let productMapper: ProductMapper;
	let productJson: any;

	beforeEach(() => {
		productMapper = new ProductMapper();
		productJson = {
			id: "1",
			name: "Test Product",
			weight: 1,
			length: 1,
			width: 1,
			height: 1,
			categories: ["Category1", "Category2"],
		};
	});

	it("creates a Product with the correct properties", () => {
		const product: Product = productMapper.toDomain(productJson);

		expect(product.getId()).toBe(productJson.id);
		expect(product.getName()).toBe(productJson.name);
		expect(product.getWeight()).toBe(productJson.weight);
		expect(product.getLength()).toBe(productJson.length);
		expect(product.getWidth()).toBe(productJson.width);
		expect(product.getHeight()).toBe(productJson.height);
		expect(product.getCategories()).toEqual(productJson.categories);
	});
});
