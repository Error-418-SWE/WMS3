import { Bin } from "@/model/bin";
import { BinMapper } from "@/dataMapper/binMapper";
import { ProductMapper } from "@/dataMapper/productMapper";
import { getAllBins } from "@/ServerActions/Bins/getAllBins";
import { getBinsByZoneId } from "@/ServerActions/Zones/getBinsByZoneId";
import { getBinById } from "@/ServerActions/Bins/getBinById";
import { BinRepository } from "@/dataRepository/binRepository";

jest.mock("@/ServerActions/Bins/getAllBins");
jest.mock("@/ServerActions/Zones/getBinsByZoneId");
jest.mock("@/ServerActions/Bins/getBinById");
jest.mock("@/dataMapper/binMapper");
jest.mock("@/dataMapper/productMapper");

describe("BinRepository", () => {
    let binRepository: BinRepository;

    beforeEach(() => {
        (getAllBins as jest.Mock).mockClear();
        (getBinById as jest.Mock).mockClear();
        (getBinsByZoneId as jest.Mock).mockClear();
        (BinMapper.prototype.toDomain as jest.Mock).mockClear();
        (ProductMapper.prototype.toDomain as jest.Mock).mockClear();

        binRepository = new BinRepository();
    });

    it("should get all bins", async () => {
        const mockBinJson = {
            bin_id: "1",
            level_order: 1,
            column_order: 1,
            bin_height: 1,
            bin_length: 1,
            bin_width: 1,
            product: null
        };
        const mockBin = new Bin("1", 1, 1, 1, 1, 1, null);
        (getAllBins as jest.Mock).mockResolvedValue([mockBinJson]);
        (BinMapper.prototype.toDomain as jest.Mock).mockReturnValue(mockBin);

        const result = await binRepository.getAll();

        expect(result).toEqual([mockBin]);
        expect(getAllBins).toHaveBeenCalled();
    });

    it("should get bin by id", async () => {
        const mockBinJson = {
            bin_id: "1",
            level_order: 1,
            column_order: 1,
            bin_height: 1,
            bin_length: 1,
            bin_width: 1,
            product: null
        };
        const mockBin = new Bin("1", 1, 1, 1, 1, 1, null);
        (getBinById as jest.Mock).mockResolvedValue(mockBinJson);
        (BinMapper.prototype.toDomain as jest.Mock).mockReturnValue(mockBin);

        const result = await binRepository.getById("1");

        expect(result).toEqual(mockBin);
        expect(getBinById).toHaveBeenCalledWith("1");
    });

    it("should get bins by zone id", async () => {
        const mockBinJson = {
            bin_id: "1",
            level_order: 1,
            column_order: 1,
            bin_height: 1,
            bin_length: 1,
            bin_width: 1,
            product: null
        };
        const mockBin = new Bin("1", 1, 1, 1, 1, 1, null);
        (getBinsByZoneId as jest.Mock).mockResolvedValue([mockBinJson]);
        (BinMapper.prototype.toDomain as jest.Mock).mockReturnValue(mockBin);

        const result = await binRepository.getBinsByZone(1);

        expect(result).toEqual([mockBin]);
        expect(getBinsByZoneId).toHaveBeenCalledWith(1);
    });

    it("should handle errors when getting all bins", async () => {
        (getAllBins as jest.Mock).mockRejectedValue(new Error("Network error"));

        await expect(binRepository.getAll()).rejects.toThrow("Network error");
    });

    it("should handle errors when getting bin by id", async () => {
        (getBinById as jest.Mock).mockRejectedValue(new Error("Network error"));

        await expect(binRepository.getById("1")).rejects.toThrow("Network error");
    });

    it("should handle errors when getting bins by zone id", async () => {
        (getBinsByZoneId as jest.Mock).mockRejectedValue(new Error("Network error"));

        await expect(binRepository.getBinsByZone(1)).rejects.toThrow("Network error");
    });

    it("should return empty array when no bins are found", async () => {
        (getAllBins as jest.Mock).mockResolvedValue([]);
        (BinMapper.prototype.toDomain as jest.Mock).mockReturnValue(null);

        const result = await binRepository.getAll();

        expect(result).toEqual([]);
    });

    it("should return null when no bin is found by id", async () => {
        (getBinById as jest.Mock).mockResolvedValue(null);
        (BinMapper.prototype.toDomain as jest.Mock).mockReturnValue(null);

        const result = await binRepository.getById("1");

        expect(result).toBeNull();
    });

    it("should return empty array when no bins are found by zone id", async () => {
        (getBinsByZoneId as jest.Mock).mockResolvedValue([]);
        (BinMapper.prototype.toDomain as jest.Mock).mockReturnValue(null);

        const result = await binRepository.getBinsByZone(1);

        expect(result).toEqual([]);
    });
});
