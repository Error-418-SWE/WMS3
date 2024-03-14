import { Zone } from "@/model/zone";
import { ZoneMapper } from "@/dataMapper/zoneMapper";
import { BinMapper } from "@/dataMapper/binMapper";
import { getAllZones } from "@/ServerActions/Zones/getAllZones";
import { getZoneById } from "@/ServerActions/Zones/getZoneById";
import { ZoneRepository } from "@/dataRepository/zoneRepository";

jest.mock("@/ServerActions/Zones/getAllZones");
jest.mock("@/ServerActions/Zones/getZoneById");
jest.mock("@/dataMapper/zoneMapper");
jest.mock("@/dataMapper/binMapper");

describe("ZoneRepository", () => {
    let zoneRepository: ZoneRepository;

    beforeEach(() => {
        (getAllZones as jest.Mock).mockClear();
        (getZoneById as jest.Mock).mockClear();
        (ZoneMapper.prototype.toDomain as jest.Mock).mockClear();
        (BinMapper.prototype.toDomain as jest.Mock).mockClear();

        zoneRepository = new ZoneRepository();
    });

    it("should get all zones", async () => {
        const mockZoneJson = {
            id: 1,
            xcoordinate: 1,
            ycoordinate: 1,
            height: 1,
            length: 1,
            width: 1,
            bins: [],
            orientation: true
        };
        const mockZone = new Zone(1, 1, 1, 1, 1, 1, [], true);
        (getAllZones as jest.Mock).mockResolvedValue([mockZoneJson]);
        (ZoneMapper.prototype.toDomain as jest.Mock).mockReturnValue(mockZone);

        const result = await zoneRepository.getAll();

        expect(result).toEqual([mockZone]);
        expect(getAllZones).toHaveBeenCalled();
    });

    it("should get zone by id", async () => {
        const mockZoneJson = {
            id: 1,
            xcoordinate: 1,
            ycoordinate: 1,
            height: 1,
            length: 1,
            width: 1,
            bins: [],
            orientation: true
        };
        const mockZone = new Zone(1, 1, 1, 1, 1, 1, [], true);
        (getZoneById as jest.Mock).mockResolvedValue(mockZoneJson);
        (ZoneMapper.prototype.toDomain as jest.Mock).mockReturnValue(mockZone);

        const result = await zoneRepository.getById("1");

        expect(result).toEqual(mockZone);
        expect(getZoneById).toHaveBeenCalledWith("1");
    });

    it("should handle errors when getting all zones", async () => {
        (getAllZones as jest.Mock).mockRejectedValue(new Error("Network error"));

        await expect(zoneRepository.getAll()).rejects.toThrow("Network error");
    });

    it("should handle errors when getting zone by id", async () => {
        (getZoneById as jest.Mock).mockRejectedValue(new Error("Network error"));

        await expect(zoneRepository.getById("1")).rejects.toThrow("Network error");
    });

    it("should return empty array when no zones are found", async () => {
        (getAllZones as jest.Mock).mockResolvedValue([]);
        (ZoneMapper.prototype.toDomain as jest.Mock).mockReturnValue(null);

        const result = await zoneRepository.getAll();

        expect(result).toEqual([]);
    });

    it("should return null when no zone is found by id", async () => {
        (getZoneById as jest.Mock).mockResolvedValue(null);
        (ZoneMapper.prototype.toDomain as jest.Mock).mockReturnValue(null);

        const result = await zoneRepository.getById("1");

        expect(result).toBeNull();
    });
});
