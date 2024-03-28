import { BinMapper } from "@/model/dataMapper/binMapper";
import { Bin } from "@/model/bin";

describe("BinMapper", () => {
	it("Should create a Bin with a Product from a JSON", async () => {
        const binMapper = new BinMapper();

        const binJson = {
            bin_id: "1",
            level_order: 1,
            column_order: 1,
            bin_height: 1,
            bin_length: 1,
            bin_width: 1,
            product: null
        };
        const bin:Bin = binMapper.toDomain(binJson);
        expect(bin.getId()).toBe(binJson.bin_id);
        expect(bin.getLevel()).toBe(binJson.level_order);
        expect(bin.getColumn()).toBe(binJson.column_order);
        expect(bin.getHeight()).toBe(binJson.bin_height);
        expect(bin.getLength()).toBe(binJson.bin_length);
        expect(bin.getWidth()).toBe(binJson.bin_width);
        expect(bin.getProduct()).toBe(null);
	});
});

describe("BinMapper", () => {
	it("Should create a Bin with a Product from a JSON", async () => {
        const binMapper = new BinMapper();

        const binJson = {
            bin_id: "1",
            level_order: 1,
            column_order: 1,
            bin_height: 1,
            bin_length: 1,
            bin_width: 1,
            product: {
                id: 1,
                name: "prodotto",
                weight: 1,
                length: 1,
                width: 1,
                height: 1,
                categories: ["categoria"]
            }
        };
        const bin:Bin = binMapper.toDomain(binJson);
        expect(bin.getId()).toBe(binJson.bin_id);
        expect(bin.getLevel()).toBe(binJson.level_order);
        expect(bin.getColumn()).toBe(binJson.column_order);
        expect(bin.getHeight()).toBe(binJson.bin_height);
        expect(bin.getLength()).toBe(binJson.bin_length);
        expect(bin.getWidth()).toBe(binJson.bin_width);
        expect(bin.getProduct()).not.toBe(null);
	});
});