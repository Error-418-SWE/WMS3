import { Bin } from "@/model/bin";
import { Product } from "@/model/product";

describe("Bin", () => {
	let bin: Bin;
	let bin2: Bin;
	let product: Product | null;

	beforeEach(() => {
		product = new Product(1, "prodotto", 1, 1, 1, 1, ["categoria"]);
		bin = new Bin("1", 1, 1, 1, 1, 1, product);
		bin2 = new Bin("2", 2, 2, 2, 2, 2, null);
	});

	it("returns the correct id", () => {
		expect(bin.getId()).toBe("1");
		expect(bin2.getId()).toBe("2");
	});

	it("returns the correct level", () => {
		expect(bin.getLevel()).toBe(1);
		expect(bin2.getLevel()).toBe(2);
	});

	it("returns the correct column", () => {
		expect(bin.getColumn()).toBe(1);
		expect(bin2.getColumn()).toBe(2);
	});

	it("returns the correct height", () => {
		expect(bin.getHeight()).toBe(1);
		expect(bin2.getHeight()).toBe(2);
	});

	it("returns the correct length", () => {
		expect(bin.getLength()).toBe(1);
		expect(bin2.getLength()).toBe(2);
	});

	it("returns the correct width", () => {
		expect(bin.getWidth()).toBe(1);
		expect(bin2.getWidth()).toBe(2);
	});

	it("returns the correct product", () => {
		expect(bin.getProduct()).toBe(product);
		expect(bin2.getProduct()).toBe(null);
	});

	it("sets the id correctly", () => {
		bin.setId("2");
		expect(bin.getId()).toBe("2");
	});

	it("sets the product correctly", () => {
		bin.setProduct(product);
		expect(bin.getProduct()).toBe(product);
	});

	it("sets the product correctly", () => {
		bin.setProduct(null);
		expect(bin.getProduct()).toBe(null);
	});

	it("clears the product correctly", () => {
		bin.clearProduct();
		expect(bin.getProduct()).toBe(null);
	});

	it("clears the product even if null", () => {
		bin2.clearProduct();
		expect(bin2.getProduct()).toBe(null);
	});
});
